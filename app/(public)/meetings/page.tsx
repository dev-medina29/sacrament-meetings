import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { MeetingSearch } from "@/components/MeetingSearch";
import MeetingCards from "@/components/MeetingCard";
import { Pagination } from "@/components/Pagination";
import { SacramentMeeting } from "@/lib/types";
export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div>
      <MeetingSearch />
      <MeetingCards meetings={meetings as SacramentMeeting[]} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
