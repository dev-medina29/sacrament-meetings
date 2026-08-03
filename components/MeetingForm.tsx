"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { MeetingFormState } from "@/lib/actions";

interface MeetingFormProps {
  mode: "create" | "edit";
  action: (prevState: MeetingFormState, formData: FormData) => Promise<MeetingFormState>;
  meeting?: {
    id: number;
    date: string;
    meetingType: string;
    presiding: string;
    conducting: string;
    announcements?: string[];
    openingHymn: { number: number; title: string };
    openingPrayer: string;
    wardBusiness?: Array<{ description: string }>;
    stakeBusiness?: boolean;
    sacramentHymn: { number: number; title: string };
    speakers?: Array<{ name: string; topic: string; type: string }>;
    closingHymn: { number: number; title: string };
    closingPrayer: string;
  };
}

export default function MeetingForm({ mode, action, meeting }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, { message: "", errors: {} });

  return (
    <form action={formAction} className="mx-auto max-w-4xl space-y-6 rounded-lg bg-white p-8 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">
          {mode === "create" ? "Create Meeting" : "Edit Meeting"}
        </h1>
        <Link href="/meetings" className="text-sm font-medium text-blue-600 hover:underline">
          Cancel
        </Link>
      </div>

      {mode === "edit" && meeting ? (
        <input type="hidden" name="id" value={meeting.id} />
      ) : null}

      {state.message ? (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1 block font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting?.date ?? ""}
            aria-describedby="date-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="date-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.date?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="meetingType" className="mb-1 block font-medium text-gray-700">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting?.meetingType ?? "regular"}
            aria-describedby="meetingType-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <p id="meetingType-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.meetingType?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="presiding" className="mb-1 block font-medium text-gray-700">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            defaultValue={meeting?.presiding ?? ""}
            aria-describedby="presiding-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="presiding-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.presiding?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="conducting" className="mb-1 block font-medium text-gray-700">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            defaultValue={meeting?.conducting ?? ""}
            aria-describedby="conducting-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="conducting-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.conducting?.join(" ")}
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="announcements" className="mb-1 block font-medium text-gray-700">
            Announcements (one per line)
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={meeting?.announcements?.join("\n") ?? ""}
            aria-describedby="announcements-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="announcements-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.announcements?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="openingHymnNumber" className="mb-1 block font-medium text-gray-700">
            Opening Hymn Number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            defaultValue={meeting?.openingHymn?.number ?? ""}
            aria-describedby="openingHymnNumber-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="openingHymnNumber-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.openingHymnNumber?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="mb-1 block font-medium text-gray-700">
            Opening Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            defaultValue={meeting?.openingHymn?.title ?? ""}
            aria-describedby="openingHymnTitle-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="openingHymnTitle-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.openingHymnTitle?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="openingPrayer" className="mb-1 block font-medium text-gray-700">
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            defaultValue={meeting?.openingPrayer ?? ""}
            aria-describedby="openingPrayer-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="openingPrayer-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.openingPrayer?.join(" ")}
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="wardBusiness" className="mb-1 block font-medium text-gray-700">
            Ward Business (one per line)
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={meeting?.wardBusiness?.map((item) => item.description).join("\n") ?? ""}
            aria-describedby="wardBusiness-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="wardBusiness-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.wardBusiness?.join(" ")}
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="stakeBusiness" className="mb-1 flex items-center gap-2 font-medium text-gray-700">
            <input
              id="stakeBusiness"
              name="stakeBusiness"
              type="checkbox"
              defaultChecked={meeting?.stakeBusiness ?? false}
              aria-describedby="stakeBusiness-error"
            />
            Stake Business Conducted
          </label>
          <p id="stakeBusiness-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.stakeBusiness?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="sacramentHymnNumber" className="mb-1 block font-medium text-gray-700">
            Sacrament Hymn Number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            defaultValue={meeting?.sacramentHymn?.number ?? ""}
            aria-describedby="sacramentHymnNumber-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="sacramentHymnNumber-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.sacramentHymnNumber?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="mb-1 block font-medium text-gray-700">
            Sacrament Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            defaultValue={meeting?.sacramentHymn?.title ?? ""}
            aria-describedby="sacramentHymnTitle-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="sacramentHymnTitle-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.sacramentHymnTitle?.join(" ")}
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="speakers" className="mb-1 block font-medium text-gray-700">
            Speakers (name-topic, one per line)
          </label>
          <textarea
            id="speakers"
            name="speakers"
            rows={3}
            defaultValue={meeting?.speakers?.map((speaker) => `${speaker.name} - ${speaker.topic}`).join("\n") ?? ""}
            aria-describedby="speakers-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="speakers-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.speakers?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="closingHymnNumber" className="mb-1 block font-medium text-gray-700">
            Closing Hymn Number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            defaultValue={meeting?.closingHymn?.number ?? ""}
            aria-describedby="closingHymnNumber-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="closingHymnNumber-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.closingHymnNumber?.join(" ")}
          </p>
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="mb-1 block font-medium text-gray-700">
            Closing Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            defaultValue={meeting?.closingHymn?.title ?? ""}
            aria-describedby="closingHymnTitle-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="closingHymnTitle-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.closingHymnTitle?.join(" ")}
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="closingPrayer" className="mb-1 block font-medium text-gray-700">
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            defaultValue={meeting?.closingPrayer ?? ""}
            aria-describedby="closingPrayer-error"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <p id="closingPrayer-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.closingPrayer?.join(" ")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isPending ? "Saving..." : mode === "create" ? "Create Meeting" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
