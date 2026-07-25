import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Meetings",
  description: "Editing and Admin Meetings section",
};

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-full flex flex-col">{children}</div>;
}
