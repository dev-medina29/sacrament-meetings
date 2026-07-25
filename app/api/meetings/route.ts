import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const dateParam = new URL(request.url).searchParams.get("date");
  const date = dateParam ?? undefined; // normalize null → undefined
  const meetings = await getMeetings(date);
  return Response.json(meetings);
}
