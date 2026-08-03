import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
  return <MeetingForm mode="create" action={createMeeting} />;
}
