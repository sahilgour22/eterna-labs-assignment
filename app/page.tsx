import { TokenTradingTable } from "@/components/token-trading-table";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Token Discovery Table
        </h1>
        <TokenTradingTable />
      </div>
    </main>
  );
}

