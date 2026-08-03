import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { getMeetingById } from "@/lib/meetings-db";
import { updateMeeting } from "@/lib/actions";

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return <MeetingForm mode="edit" action={updateMeeting} meeting={meeting} />;
}
