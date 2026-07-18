import { getMeetings } from "@/lib/meetings-db";
import MeetingCards from "@/components/MeetingCard";

export default function meetingPage() {
  const meetings = getMeetings();
  return (
    <main>
      <MeetingCards meetings={meetings} />
    </main>
  );
}
