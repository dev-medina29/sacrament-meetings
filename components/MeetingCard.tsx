"use client";

import Link from "next/link";
import { SacramentMeeting } from "../lib/types";

export default function MeetingCards({
  meetings,
}: {
  meetings: SacramentMeeting[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {meetings.map((meeting) => (
        <Link
          key={meeting.id}
          href={`/meetings/${meeting.id}`}
          className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {meeting.meetingType} — {meeting.date}
          </h3>

          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Presiding:</span>{" "}
            {meeting.presiding}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Conducting:</span>{" "}
            {meeting.conducting}
          </p>

          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Opening Hymn:</span>{" "}
            {meeting.openingHymn.title}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Sacrament Hymn:</span>{" "}
            {meeting.sacramentHymn.title}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Closing Hymn:</span>{" "}
            {meeting.closingHymn.title}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold">Speakers:</span>{" "}
            {meeting.speakers.map((s) => s.name).join(", ")}
          </p>
        </Link>
      ))}
    </div>
  );
}
