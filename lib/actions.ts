"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  addMeeting,
  deleteMeeting as deleteMeetingFromDb,
  updateMeeting as updateMeetingInDb,
} from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

export interface MeetingFormState {
  message: string;
  errors?: Record<string, string[]>;
}

const initialState = {
  message: "",
  errors: {},
} satisfies MeetingFormState;

function isNextRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: string }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

const MeetingFormSchema = z.object({
  date: z.string().trim().min(1, "Date is required"),
  meetingType: z.enum(["testimony", "regular", "stake", "general"]),
  presiding: z.string().trim().min(1, "Presiding leader is required"),
  conducting: z.string().trim().min(1, "Conducting leader is required"),
  announcements: z.string().optional().default(""),
  openingHymnNumber: z.coerce.number().int().positive("Opening hymn number is required"),
  openingHymnTitle: z.string().trim().min(1, "Opening hymn title is required"),
  openingPrayer: z.string().trim().min(1, "Opening prayer is required"),
  wardBusiness: z.string().optional().default(""),
  stakeBusiness: z.string().optional().default("off"),
  sacramentHymnNumber: z.coerce.number().int().positive("Sacrament hymn number is required"),
  sacramentHymnTitle: z.string().trim().min(1, "Sacrament hymn title is required"),
  speakers: z.string().optional().default(""),
  closingHymnNumber: z.coerce.number().int().positive("Closing hymn number is required"),
  closingHymnTitle: z.string().trim().min(1, "Closing hymn title is required"),
  closingPrayer: z.string().trim().min(1, "Closing prayer is required"),
});

function parseList(value: string): string[] {
  return value
    .split(/\n|,/) 
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseWardBusiness(value: string): Array<{ description: string }> {
  return parseList(value).map((item) => ({ description: item }));
}

function parseSpeakers(value: string): Array<{ name: string; topic: string; type: "speaker" | "musical-number" }> {
  if (!value.trim()) {
    return [];
  }

  return parseList(value).map((item) => {
    const [name = "", topic = ""] = item.split("-").map((part) => part.trim());
    return {
      name,
      topic: topic || "General assignment",
      type: "speaker" as const,
    };
  });
}

function buildMeetingPayload(data: z.infer<typeof MeetingFormSchema>): Omit<SacramentMeeting, "id"> {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: parseList(data.announcements || ""),
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: parseWardBusiness(data.wardBusiness || ""),
    stakeBusiness: data.stakeBusiness === "on",
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: parseSpeakers(data.speakers || ""),
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };
}

function getRawValues(formData: FormData) {
  const stakeBusiness = formData.get("stakeBusiness") === "on" ? "on" : "off";

  return {
    date: String(formData.get("date") ?? ""),
    meetingType: String(formData.get("meetingType") ?? "regular"),
    presiding: String(formData.get("presiding") ?? ""),
    conducting: String(formData.get("conducting") ?? ""),
    announcements: String(formData.get("announcements") ?? ""),
    openingHymnNumber: formData.get("openingHymnNumber") ?? "",
    openingHymnTitle: String(formData.get("openingHymnTitle") ?? ""),
    openingPrayer: String(formData.get("openingPrayer") ?? ""),
    wardBusiness: String(formData.get("wardBusiness") ?? ""),
    stakeBusiness,
    sacramentHymnNumber: formData.get("sacramentHymnNumber") ?? "",
    sacramentHymnTitle: String(formData.get("sacramentHymnTitle") ?? ""),
    speakers: String(formData.get("speakers") ?? ""),
    closingHymnNumber: formData.get("closingHymnNumber") ?? "",
    closingHymnTitle: String(formData.get("closingHymnTitle") ?? ""),
    closingPrayer: String(formData.get("closingPrayer") ?? ""),
  };
}

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse(getRawValues(formData));

  if (!parsed.success) {
    return {
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await addMeeting(buildMeetingPayload(parsed.data));
    revalidatePath("/meetings");
    redirect("/meetings");
  } catch (error) {
    if (isNextRedirectError(error)) {
      throw error;
    }

    console.error("Failed to create meeting", error);
    throw new Error("Unable to create the meeting right now. Please try again.");
  }
}

export async function updateMeeting(
  prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const id = Number(formData.get("id"));

  if (!Number.isFinite(id) || id <= 0) {
    return {
      message: "A meeting ID is required to update this item.",
      errors: {},
    };
  }

  const parsed = MeetingFormSchema.safeParse(getRawValues(formData));

  if (!parsed.success) {
    return {
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updateMeetingInDb(id, buildMeetingPayload(parsed.data));
    revalidatePath("/meetings");
    redirect("/meetings");
  } catch (error) {
    if (isNextRedirectError(error)) {
      throw error;
    }

    console.error("Failed to update meeting", error);
    throw new Error("Unable to update the meeting right now. Please try again.");
  }
}

export async function deleteMeeting(
  prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const id = Number(formData.get("id"));

  if (!Number.isFinite(id)) {
    return {
      message: "A meeting ID is required to delete this item.",
      errors: {},
    };
  }

  try {
    await deleteMeetingFromDb(id);
    revalidatePath("/meetings");
    redirect("/meetings");
  } catch (error) {
    if (isNextRedirectError(error)) {
      throw error;
    }

    console.error("Failed to delete meeting", error);
    throw new Error("Unable to delete the meeting right now. Please try again.");
  }
}
