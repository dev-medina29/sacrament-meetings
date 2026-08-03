import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3000/api/meetings/${id}`,
    { cache: "no-store" },
  );

  if (res.status === 400 || res.status === 404) {
    const err = await res.json();
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold text-red-600">
          {res.status === 400 ? "Invalid ID" : "Meeting Not Found"}
        </h1>
        <p className="text-gray-600">{err.error}</p>
      </div>
    );
  }

  const meeting: SacramentMeeting = await res.json();

  return <MeetingDetail meeting={meeting} />;
}
