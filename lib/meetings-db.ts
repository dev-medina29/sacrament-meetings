import type { SacramentMeeting } from "../lib/types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"],
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Sister Martinez",
    openingHymn: { number: 30, title: "We Thank Thee O God for a Prophet" },
    openingPrayer: "Brother Wilson",
    wardBusiness: [{ description: "Missionary farewell service" }],
    stakeBusiness: false,
    sacramentHymn: { number: 194, title: "O My Father" },
    speakers: [
      { name: "Elder Johnson", topic: "Missionary Service", type: "speaker" },
      { name: "Sister Lee", topic: "Family Home Evening", type: "speaker" },
    ],
    closingHymn: { number: 127, title: "Come Follow Me" },
    closingPrayer: "Brother Anderson",
    announcements: [
      "Stake leadership training: May 17",
      "Sacrament meeting canceled May 24",
    ],
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "President Garcia",
    conducting: "Brother Taylor",
    openingHymn: { number: 79, title: "Come Ye Disconsolate" },
    openingPrayer: "Sister Robinson",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 339, title: "O Little Kingdom" },
    speakers: [
      { name: "Brother Thomas", topic: "Testimony", type: "speaker" },
      { name: "Primary Children", topic: "", type: "musical-number" },
      { name: "Sister White", topic: "Gospel Principles", type: "speaker" },
    ],
    closingHymn: { number: 226, title: "Jesus Christ is Risen Today" },
    closingPrayer: "Sister Adams",
    announcements: ["Volleyball tournament signup", "Ward picnic June 7"],
  },
  {
    id: 4,
    date: "2026-05-31",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Miller",
    openingHymn: { number: 1, title: "O God, Our Help in Ages Past" },
    openingPrayer: "Sister Clark",
    wardBusiness: [{ description: "Budget approval for youth activities" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Brother Scott", topic: "Repentance", type: "speaker" },
      { name: "Sister Green", topic: "Charity", type: "speaker" },
    ],
    closingHymn: { number: 292, title: "I Feel My Savior's Love" },
    closingPrayer: "Brother Turner",
    announcements: [
      "Summer youth activities begin",
      "Relief Society luncheon June 12",
    ],
  },
  {
    id: 5,
    date: "2026-06-07",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Sister Hall",
    openingHymn: { number: 140, title: "Come Let Us Anew" },
    openingPrayer: "Brother Harris",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 190, title: "God Loved Us, So He Sent His Son" },
    speakers: [
      { name: "Sister Phillips", topic: "Service", type: "speaker" },
      { name: "Youth Singers", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 19, title: "Praise to the Man" },
    closingPrayer: "Sister Martin",
    announcements: [
      "Ward picnic today after sacrament meeting",
      "Next fast and testimony bearing June 21",
    ],
  },
  {
    id: 6,
    date: "2026-06-14",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Thompson",
    openingHymn: { number: 85, title: "As I Search the Holy Scriptures" },
    openingPrayer: "Sister Jackson",
    wardBusiness: [{ description: "Calling of new Sunday School president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: "Behold the Great Redeemer Die" },
    speakers: [
      { name: "Bishop Smith", topic: "Obedience", type: "speaker" },
      { name: "Brother Peterson", topic: "Priesthood", type: "speaker" },
    ],
    closingHymn: { number: 250, title: "More Holiness Give Me" },
    closingPrayer: "Brother Moore",
    announcements: ["Ward conference June 28", "Nursery supplies needed"],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}
