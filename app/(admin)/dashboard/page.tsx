"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then((s) => setSession(s));
  }, []);

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-6 rounded-lg shadow-md bg-white text-center">
          <p className="text-lg font-semibold text-red-700">
            You must be logged in to view this page.{" "}
            <Link href="/login" className="text-lg font-semibold text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {session.user?.name}
        </h1>
        <button
          onClick={() => signOut({ redirectTo: "/" })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors mt-4"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
