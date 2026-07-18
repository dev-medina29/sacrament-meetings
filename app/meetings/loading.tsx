// app/meetings/loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
        {/* Message */}
        <p className="text-lg font-semibold text-gray-700">
          Loading meetings...
        </p>
      </div>
    </div>
  );
}
