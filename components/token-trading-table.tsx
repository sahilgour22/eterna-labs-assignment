"use client";

import React, { useMemo, useCallback } from "react";
import { useTokens } from "@/hooks/useTokens";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSortConfig, setSelectedToken } from "@/store/tokensSlice";
import { TokenRow } from "@/components/token-row";
import { TokenTableSkeleton } from "@/components/token-table-skeleton";
import { ErrorBoundary } from "@/components/error-boundary";
import { Token, SortField } from "@/lib/types";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Main token trading table component
 * Implements sorting, filtering, and real-time updates
 */
export function TokenTradingTable() {
  const { data: tokens, isLoading, isError, error } = useTokens();
  const dispatch = useAppDispatch();
  const { tokens: storeTokens, sortConfig } = useAppSelector((state) => state.tokens);

  // Use store tokens if available, otherwise use query data
  const displayTokens = useMemo(
    () => (storeTokens.length > 0 ? storeTokens : tokens || []),
    [storeTokens, tokens]
  );

  // Get token IDs for WebSocket updates
  const tokenIds = useMemo(
    () => displayTokens.map((t) => t.id),
    [displayTokens]
  );

  // Initialize WebSocket for real-time updates
  useWebSocket(tokenIds);

  // Sort tokens based on configuration
  const sortedTokens = useMemo(() => {
    if (!sortConfig.field) return displayTokens;

    const sorted = [...displayTokens].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortConfig.field) {
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "volume24h":
          aValue = a.volume24h;
          bValue = b.volume24h;
          break;
        case "marketCap":
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
        case "priceChange24h":
          aValue = a.priceChange24h;
          bValue = b.priceChange24h;
          break;
        default:
          return 0;
      }

      if (sortConfig.direction === "asc") {
        return aValue - bValue;
      }
      return bValue - aValue;
    });

    return sorted;
  }, [displayTokens, sortConfig]);

  // Filter tokens by category
  const [selectedCategory, setSelectedCategory] = React.useState<
    "all" | "new-pairs" | "final-stretch" | "migrated"
  >("all");

  const filteredTokens = useMemo(() => {
    if (selectedCategory === "all") return sortedTokens;
    return sortedTokens.filter((t) => t.category === selectedCategory);
  }, [sortedTokens, selectedCategory]);

  const handleSort = useCallback(
    (field: SortField) => {
      const newDirection =
        sortConfig.field === field && sortConfig.direction === "asc"
          ? "desc"
          : "asc";
      dispatch(
        setSortConfig({
          field,
          direction: newDirection,
        })
      );
    },
    [dispatch, sortConfig]
  );

  const handleTokenClick = useCallback(
    (token: Token) => {
      dispatch(setSelectedToken(token));
    },
    [dispatch]
  );

  const SortButton = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => {
    const isActive = sortConfig.field === field;
    return (
      <button
        onClick={() => handleSort(field)}
        className={cn(
          "flex items-center gap-1 text-left font-medium text-gray-400 transition-colors hover:text-white",
          isActive && "text-white"
        )}
      >
        {children}
        {isActive ? (
          sortConfig.direction === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )
        ) : (
          <ArrowUpDown className="h-4 w-4 opacity-50" />
        )}
      </button>
    );
  };

  if (isError) {
    return (
      <ErrorBoundary>
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-red-500/50 bg-red-500/10 p-8">
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-red-400">
              Failed to load tokens
            </h2>
            <p className="text-gray-400">
              {error instanceof Error ? error.message : "Unknown error occurred"}
            </p>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="w-full">
        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "new-pairs", "final-stretch", "migrated"] as const).map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                )}
              >
                {category === "all"
                  ? "All Tokens"
                  : category === "new-pairs"
                  ? "New Pairs"
                  : category === "final-stretch"
                  ? "Final Stretch"
                  : "Migrated"}
              </button>
            )
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50">
          {isLoading ? (
            <TokenTableSkeleton />
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="px-4 py-3 text-left font-medium text-gray-400">
                    Token
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <SortButton field="price">Price</SortButton>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <SortButton field="priceChange24h">24h Change</SortButton>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <SortButton field="volume24h">Volume (24h)</SortButton>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <SortButton field="marketCap">Market Cap</SortButton>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      No tokens found
                    </td>
                  </tr>
                ) : (
                  filteredTokens.map((token) => (
                    <TokenRow
                      key={token.id}
                      token={token}
                      onTokenClick={handleTokenClick}
                    />
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredTokens.length} of {displayTokens.length} tokens
        </div>
      </div>
    </ErrorBoundary>
  );
}

