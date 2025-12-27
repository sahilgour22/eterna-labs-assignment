import { useQuery } from "@tanstack/react-query";
import { Token } from "@/lib/types";
import { useAppDispatch } from "@/store/hooks";
import { setTokens } from "@/store/tokensSlice";
import { useEffect } from "react";

/**
 * Mock token data generator
 */
async function fetchTokens(): Promise<Token[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const categories: Array<"new-pairs" | "final-stretch" | "migrated"> = [
    "new-pairs",
    "final-stretch",
    "migrated",
  ];

  const tokens: Token[] = Array.from({ length: 50 }, (_, i) => {
    const category = categories[i % categories.length];
    const basePrice = Math.random() * 1000 + 0.01;
    const priceChange = (Math.random() - 0.5) * 20; // -10% to +10%

    return {
      id: `token-${i + 1}`,
      name: `Token ${i + 1}`,
      symbol: `TKN${i + 1}`,
      price: basePrice,
      priceChange24h: priceChange,
      volume24h: Math.random() * 10000000 + 100000,
      marketCap: Math.random() * 100000000 + 1000000,
      category,
      description: `Description for Token ${i + 1}`,
      launchDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      ...(category === "migrated" && {
        migrationInfo: {
          from: `OLD${i + 1}`,
          to: `TKN${i + 1}`,
          date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      }),
    };
  });

  return tokens;
}

/**
 * Custom hook to fetch and manage tokens
 */
export function useTokens() {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setTokens(query.data));
    }
  }, [query.data, dispatch]);

  return query;
}

