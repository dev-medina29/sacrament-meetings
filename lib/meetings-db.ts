import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const ITEMS_PER_PAGE = 5;
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
let useInMemoryStore = !process.env.DATABASE_URL;

function shouldUseInMemoryStore(): boolean {
  return useInMemoryStore || !sql;
}

function activateInMemoryFallback(error: unknown, context: string): void {
  if (!useInMemoryStore) {
    console.warn(`Falling back to in-memory meeting store (${context}).`, error);
    useInMemoryStore = true;
  }
}

const seedMeetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-08-02",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Elder Johnson",
    announcements: ["Ward activity this Saturday"],
    openingHymn: { number: 1, title: "The Morning Breaks" },
    openingPrayer: "Brother Lee",
    wardBusiness: [{ description: "Temple recommend interviews" }],
    stakeBusiness: false,
    sacramentHymn: { number: 100, title: "Nearer, Dear Savior, to Thee" },
    speakers: [{ name: "Sister Martinez", topic: "Faith", type: "speaker" }],
    closingHymn: { number: 3, title: "Now Let Us Rejoice" },
    closingPrayer: "Elder Kim",
  },
];

let inMemoryMeetings: SacramentMeeting[] = seedMeetings.map((meeting) => ({
  ...meeting,
  announcements: [...(meeting.announcements ?? [])],
  wardBusiness: [...(meeting.wardBusiness ?? [])],
  speakers: [...(meeting.speakers ?? [])],
}));

function normalizeMeeting(meeting: SacramentMeeting): SacramentMeeting {
  return {
    ...meeting,
    announcements: meeting.announcements ?? [],
    wardBusiness: meeting.wardBusiness ?? [],
    speakers: meeting.speakers ?? [],
    stakeBusiness: Boolean(meeting.stakeBusiness),
  };
}

function getInMemoryMeetingsSnapshot(): SacramentMeeting[] {
  return inMemoryMeetings.map((meeting) => ({
    ...meeting,
    announcements: [...(meeting.announcements ?? [])],
    wardBusiness: [...(meeting.wardBusiness ?? [])],
    speakers: [...(meeting.speakers ?? [])],
  }));
}

function matchesQuery(meeting: SacramentMeeting, query: string): boolean {
  if (!query) {
    return true;
  }

  const haystack = [
    meeting.presiding,
    meeting.conducting,
    meeting.meetingType,
    meeting.speakers.map((speaker) => speaker.name).join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  if (shouldUseInMemoryStore()) {
    const filteredMeetings = getInMemoryMeetingsSnapshot()
      .filter((meeting) => matchesQuery(meeting, query))
      .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMeetings.slice(offset, offset + ITEMS_PER_PAGE);
  }

  const db = sql;
  if (!db) {
    return getMeetings(query, currentPage);
  }

  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const rows = await db`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      WHERE
        presiding     ILIKE ${searchTerm}
        OR conducting ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows as unknown as SacramentMeeting[];
  } catch (error) {
    activateInMemoryFallback(error, "getMeetings");
    return getMeetings(query, currentPage);
  }
}

export async function getMeetingsTotalPages(
  query: string = "",
): Promise<number> {
  if (shouldUseInMemoryStore()) {
    const filteredMeetings = getInMemoryMeetingsSnapshot().filter((meeting) => matchesQuery(meeting, query));
    return Math.ceil(filteredMeetings.length / ITEMS_PER_PAGE);
  }

  const db = sql;
  if (!db) {
    return getMeetingsTotalPages(query);
  }

  const searchTerm = `%${query}%`;

  try {
    const rows = await db`
      SELECT COUNT(*) FROM meetings
      WHERE
        presiding     ILIKE ${searchTerm}
        OR conducting ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm}
    `;
    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    activateInMemoryFallback(error, "getMeetingsTotalPages");
    return getMeetingsTotalPages(query);
  }
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  if (shouldUseInMemoryStore()) {
    return getInMemoryMeetingsSnapshot().find((meeting) => meeting.id === id) ?? null;
  }

  const db = sql;
  if (!db) {
    return getMeetingById(id);
  }

  try {
    const rows = await db`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings WHERE id = ${id}
    `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
  } catch (error) {
    activateInMemoryFallback(error, "getMeetingById");
    return getMeetingById(id);
  }
}

export async function addMeeting(
  data: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting> {
  if (shouldUseInMemoryStore()) {
    const nextId = Math.max(...inMemoryMeetings.map((meeting) => meeting.id), 0) + 1;
    const meeting = normalizeMeeting({
      id: nextId,
      ...data,
    });
    inMemoryMeetings = [...inMemoryMeetings, meeting];
    return meeting;
  }

  const db = sql;
  if (!db) {
    return addMeeting(data);
  }

  try {
    const rows = await db`
      INSERT INTO meetings (
        date,
        meeting_type,
        presiding,
        conducting,
        announcements,
        opening_hymn,
        opening_prayer,
        ward_business,
        stake_business,
        sacrament_hymn,
        speakers,
        closing_hymn,
        closing_prayer
      ) VALUES (
        ${data.date},
        ${data.meetingType},
        ${data.presiding},
        ${data.conducting},
        ${data.announcements ?? []},
        ${JSON.stringify(data.openingHymn)}::json,
        ${data.openingPrayer},
        ${JSON.stringify(data.wardBusiness ?? [])}::json,
        ${data.stakeBusiness},
        ${JSON.stringify(data.sacramentHymn)}::json,
        ${JSON.stringify(data.speakers ?? [])}::json,
        ${JSON.stringify(data.closingHymn)}::json,
        ${data.closingPrayer}
      ) RETURNING id
    `;

    return {
      ...data,
      id: Number(rows[0].id),
    } as SacramentMeeting;
  } catch (error) {
    activateInMemoryFallback(error, "addMeeting");
    return addMeeting(data);
  }
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  if (shouldUseInMemoryStore()) {
    const targetIndex = inMemoryMeetings.findIndex((meeting) => meeting.id === id);

    if (targetIndex === -1) {
      return null;
    }

    const { id: _ignoredId, ...rest } = updates;
    const updatedMeeting = normalizeMeeting({
      ...inMemoryMeetings[targetIndex],
      ...rest,
      id,
    });

    inMemoryMeetings = inMemoryMeetings.map((meeting) =>
      meeting.id === id ? updatedMeeting : meeting,
    );

    return updatedMeeting;
  }

  const db = sql;
  if (!db) {
    return updateMeeting(id, updates);
  }

  try {
    const { id: _ignoredId, ...rest } = updates;
    const rows = await db`
      UPDATE meetings
      SET
        date = ${rest.date ?? null},
        meeting_type = ${rest.meetingType ?? null},
        presiding = ${rest.presiding ?? null},
        conducting = ${rest.conducting ?? null},
        announcements = ${rest.announcements ?? []},
        opening_hymn = ${rest.openingHymn ? JSON.stringify(rest.openingHymn) : null}::json,
        opening_prayer = ${rest.openingPrayer ?? null},
        ward_business = ${rest.wardBusiness ? JSON.stringify(rest.wardBusiness) : []}::json,
        stake_business = ${rest.stakeBusiness ?? null},
        sacrament_hymn = ${rest.sacramentHymn ? JSON.stringify(rest.sacramentHymn) : null}::json,
        speakers = ${rest.speakers ? JSON.stringify(rest.speakers) : []}::json,
        closing_hymn = ${rest.closingHymn ? JSON.stringify(rest.closingHymn) : null}::json,
        closing_prayer = ${rest.closingPrayer ?? null}
      WHERE id = ${id}
      RETURNING id
    `;

    if (!rows[0]) {
      return null;
    }

    return getMeetingById(id);
  } catch (error) {
    activateInMemoryFallback(error, "updateMeeting");
    return updateMeeting(id, updates);
  }
}

export async function deleteMeeting(id: number): Promise<boolean> {
  if (shouldUseInMemoryStore()) {
    const existingCount = inMemoryMeetings.length;
    inMemoryMeetings = inMemoryMeetings.filter((meeting) => meeting.id !== id);
    return inMemoryMeetings.length !== existingCount;
  }

  const db = sql;
  if (!db) {
    return deleteMeeting(id);
  }

  try {
    await db`DELETE FROM meetings WHERE id = ${id}`;
    return true;
  } catch (error) {
    activateInMemoryFallback(error, "deleteMeeting");
    return deleteMeeting(id);
  }
}
