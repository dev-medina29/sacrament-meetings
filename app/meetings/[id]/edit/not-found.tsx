import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow-md text-center">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Meeting not found
      </h2>
      <p className="mb-6 text-gray-600">
        The meeting you are looking for does not exist or may have been removed.
      </p>
      <Link
        href="/meetings"
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Back to Meetings
      </Link>
    </div>
  );
}
