"use client";

import { SacramentMeeting } from "../lib/types";

export default function MeetingDetail({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {meeting.meetingType.toUpperCase()} Meeting — {meeting.date}
      </h2>

      <section className="mb-4">
        <p>
          <span className="font-semibold">Presiding:</span> {meeting.presiding}
        </p>
        <p>
          <span className="font-semibold">Conducting:</span>{" "}
          {meeting.conducting}
        </p>
      </section>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Announcements</h3>
          <ul className="list-disc list-inside text-gray-700">
            {meeting.announcements.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Opening</h3>
        <p>
          <span className="font-semibold">Opening Hymn:</span>{" "}
          {meeting.openingHymn.number} — {meeting.openingHymn.title}
        </p>
        <p>
          <span className="font-semibold">Opening Prayer:</span>{" "}
          {meeting.openingPrayer}
        </p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Ward Business</h3>
          <ul className="list-disc list-inside text-gray-700">
            {meeting.wardBusiness.map((wb, idx) => (
              <li key={idx}>{wb.description}</li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Stake Business</h3>
          <p>Stake business was conducted in this meeting.</p>
        </section>
      )}

      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Sacrament</h3>
        <p>
          <span className="font-semibold">Sacrament Hymn:</span>{" "}
          {meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Speakers</h3>
        <ul className="list-disc list-inside text-gray-700">
          {meeting.speakers.map((s, idx) => (
            <li key={idx}>
              {s.type === "musical-number" ? (
                <span className="italic">Musical Number:</span>
              ) : (
                <span className="font-semibold">Speaker:</span>
              )}{" "}
              {s.name} — {s.topic}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Closing</h3>
        <p>
          <span className="font-semibold">Closing Hymn:</span>{" "}
          {meeting.closingHymn.number} — {meeting.closingHymn.title}
        </p>
        <p>
          <span className="font-semibold">Closing Prayer:</span>{" "}
          {meeting.closingPrayer}
        </p>
      </section>
    </div>
  );
}
