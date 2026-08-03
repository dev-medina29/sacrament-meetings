import { getMeetingById } from "@/lib/meetings-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idStr } = await params;
  const id = Number(idStr);

  if (Number.isNaN(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }

  const meeting = await getMeetingById(id);

  if (!meeting) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(meeting);
}
