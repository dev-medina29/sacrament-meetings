"use client";

import Link from "next/link";

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Something went wrong
      </h2>
      <p className="mb-6 text-gray-600">
        {error.message || "The meetings page could not be loaded."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
