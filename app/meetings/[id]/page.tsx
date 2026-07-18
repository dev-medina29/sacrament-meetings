import React from "react";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (isNaN(meetingId)) {
    return <p className="text-center text-red-600">Invalid meeting ID.</p>;
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold">No meeting found</h1>
        <p className="text-gray-600">No meeting exists for ID: {meetingId}</p>
      </div>
    );
  }

  return <MeetingDetail meeting={meeting} />;
}
