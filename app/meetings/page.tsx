import MeetingCards from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export default async function MeetingPage() {
  const res = await fetch("http://localhost:3000/api/meetings", {
    cache: "no-store",
  });
  const meetings: SacramentMeeting[] = await res.json();

  return (
    <main>
      <MeetingCards meetings={meetings} />
    </main>
  );
}
