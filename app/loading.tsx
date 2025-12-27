import { TokenTableSkeleton } from "@/components/token-table-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 h-8 w-64 animate-pulse rounded bg-gray-800" />
        <TokenTableSkeleton />
      </div>
    </div>
  );
}

