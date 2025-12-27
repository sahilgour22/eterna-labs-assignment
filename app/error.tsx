"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4">
      <div className="max-w-md rounded-lg border border-red-500/50 bg-red-500/10 p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-red-400">
          Something went wrong!
        </h2>
        <p className="mb-6 text-gray-400">
          {error.message || "An unexpected error occurred"}
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}

