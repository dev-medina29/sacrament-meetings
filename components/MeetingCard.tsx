"use client";

import Link from "next/link";
import { deleteMeeting } from "@/lib/actions";
import { SacramentMeeting } from "../lib/types";
import { useActionState } from "react";

export default function MeetingCards({
  meetings,
}: {
  meetings: SacramentMeeting[];
}) {
  const deleteAction = async (prevState: Awaited<ReturnType<typeof deleteMeeting>> extends infer T ? T : never, formData: FormData) => {
    return deleteMeeting(prevState, formData);
  };
  const [, formAction] = useActionState(deleteAction, { message: "", errors: {} });
  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-end">
        <Link
          href="/meetings/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create Meeting
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => (
        <div
          key={meeting.id}
          className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
        >
          <Link href={`/meetings/${meeting.id}`} className="block">
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

          <div className="mt-4 flex items-center gap-2">
            <Link
              href={`/meetings/${meeting.id}/edit`}
              className="rounded bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Edit
            </Link>
            <form action={formAction} className="inline">
              <input type="hidden" name="id" value={meeting.id} />
              <button
                type="submit"
                className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
