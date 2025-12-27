import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateTokenPrice } from "@/store/tokensSlice";
import { PriceUpdate } from "@/lib/types";

/**
 * Custom hook to mock WebSocket for real-time price updates
 * Simulates price changes every 2-5 seconds
 */
export function useWebSocket(tokenIds: string[]) {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens.tokens);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (tokenIds.length === 0 || tokens.length === 0) return;

    const updatePrices = () => {
      // Randomly update 1-3 tokens at a time
      const numUpdates = Math.floor(Math.random() * 3) + 1;
      const shuffled = [...tokenIds].sort(() => Math.random() - 0.5);
      const tokensToUpdate = shuffled.slice(0, numUpdates);

      tokensToUpdate.forEach((tokenId) => {
        const token = tokens.find((t) => t.id === tokenId);
        if (!token) return;

        // Simulate price change between -5% and +5%
        const priceChange = (Math.random() - 0.5) * 0.1; // -5% to +5%
        const currentPrice = token.price;
        const newPrice = currentPrice * (1 + priceChange);

        const update: PriceUpdate = {
          tokenId,
          price: Math.max(0.0001, newPrice), // Ensure positive price
          timestamp: Date.now(),
        };

        dispatch(updateTokenPrice(update));
      });
    };

    // Initial update after a short delay
    const initialTimeout = setTimeout(() => {
      updatePrices();
    }, 1000);

    // Set up interval for updates (2-5 seconds)
    const interval = setInterval(() => {
      updatePrices();
    }, 2000 + Math.random() * 3000);

    intervalRef.current = interval;

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokenIds, tokens, dispatch]);
}

