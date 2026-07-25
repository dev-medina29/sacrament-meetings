import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";

export default async function Home() {
  const meetings = await getMeetings();
  const totalMeetings = meetings.length;
  const latestMeeting = meetings[meetings.length - 1] ?? null;

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl text-center mb-10">
          Plan, view, and manage your ward`&rsquo;`s sacrament meetings with
          ease. Browse past meetings, check the current Sunday, and stay
          organized.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/meetings"
            className="inline-block rounded-full bg-yellow-400 text-gray-900 font-bold px-8 py-3 text-lg shadow-lg hover:bg-yellow-300 transition-colors"
          >
            View All Meetings
          </Link>
          <Link
            href="/meetings/current"
            className="inline-block rounded-full border-2 border-white text-white font-bold px-8 py-3 text-lg shadow-lg hover:bg-white hover:text-gray-900 transition-colors"
          >
            This Sunday
          </Link>
        </div>
      </section>

      {/* Stats / Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-16 px-6 w-full">
        <div className="rounded-xl border-4 border-gray-800 bg-white p-6 shadow-[6px_6px_0px_#1f2937]">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {totalMeetings}
          </h2>
          <p className="text-gray-600 text-lg font-semibold">
            Meetings Planned
          </p>
          <p className="text-gray-500 mt-2">
            A growing library of sacrament meetings with full details.
          </p>
        </div>

        <div className="rounded-xl border-4 border-gray-800 bg-white p-6 shadow-[6px_6px_0px_#1f2937]">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Speakers</h2>
          <p className="text-gray-600 text-lg font-semibold">Topics & Music</p>
          <p className="text-gray-500 mt-2">
            Track speakers, musical numbers, hymns, and prayers.
          </p>
        </div>

        <div className="rounded-xl border-4 border-gray-800 bg-white p-6 shadow-[6px_6px_0px_#1f2937]">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quick</h2>
          <p className="text-gray-600 text-lg font-semibold">Navigation</p>
          <p className="text-gray-500 mt-2">
            Jump to the most recent Sunday or browse all meetings.
          </p>
        </div>
      </section>

      {/* Latest Meeting Feature */}
      {latestMeeting && (
        <section className="max-w-3xl mx-auto w-full pb-20 px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Latest Meeting
          </h2>
          <div className="rounded-xl border-4 border-gray-800 bg-white p-6 shadow-[6px_6px_0px_#1f2937]">
            <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              {latestMeeting.date}
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {latestMeeting.meetingType} Meeting
            </h3>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Presiding:</span>{" "}
              {latestMeeting.presiding}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Conducting:</span>{" "}
              {latestMeeting.conducting}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Speakers:</span>{" "}
              {latestMeeting.speakers.map((s) => s.name).join(", ")}
            </p>
            <Link
              href={`/meetings/${latestMeeting.id}`}
              className="inline-block mt-4 rounded-full bg-gray-800 text-white font-bold px-6 py-2 text-sm hover:bg-gray-700 transition-colors"
            >
              View Details →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
