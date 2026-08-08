import type { Metadata } from "next";
import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Create a Meeting",
  description:
    "Add a new sacrament meeting entry to the planner and keep your schedule organized.",
};

export default function NewMeetingPage() {
  return <MeetingForm mode="create" action={createMeeting} />;
}
