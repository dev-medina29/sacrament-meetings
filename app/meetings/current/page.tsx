import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default function CurrentMeetingPage() {
  // Find the most recent Sunday (today if it's Sunday)
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  // Format as YYYY-MM-DD
  const yyyy = sunday.getFullYear();
  const mm = String(sunday.getMonth() + 1).padStart(2, "0");
  const dd = String(sunday.getDate()).padStart(2, "0");
  const dateStr = `${yyyy}-${mm}-${dd}`;

  const meetings = getMeetings(dateStr);

  if (meetings.length === 0) {
    redirect("/meetings");
  }


  redirect(`/meetings/${meetings[0].id}`);
}
