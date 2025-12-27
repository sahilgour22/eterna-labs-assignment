"use client";

import React, { memo, useState, useEffect } from "react";
import { Token } from "@/lib/types";
import { formatNumber, formatPercentage, formatCompactNumber, cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Info, TrendingUp, TrendingDown } from "lucide-react";

interface TokenRowProps {
  token: Token;
  onTokenClick?: (token: Token) => void;
}

/**
 * Individual token row component with price update animations
 * Memoized for performance optimization
 */
export const TokenRow = memo(function TokenRow({
  token,
  onTokenClick,
}: TokenRowProps) {
  const [priceChange, setPriceChange] = useState<"up" | "down" | null>(null);
  const [previousPrice, setPreviousPrice] = useState(token.price);

  useEffect(() => {
    if (token.price !== previousPrice) {
      setPriceChange(token.price > previousPrice ? "up" : "down");
      setPreviousPrice(token.price);
      
      // Reset animation after transition
      const timer = setTimeout(() => setPriceChange(null), 300);
      return () => clearTimeout(timer);
    }
  }, [token.price, previousPrice]);

  const isPositive = token.priceChange24h >= 0;
  const priceClass = cn(
    "price-update transition-colors duration-300",
    priceChange === "up" && "price-up",
    priceChange === "down" && "price-down"
  );

  return (
    <tr
      className="group cursor-pointer border-b border-gray-800 transition-colors hover:bg-gray-900/50"
      onClick={() => onTokenClick?.(token)}
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-xs font-semibold">
            {token.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="font-medium text-white">{token.name}</div>
            <div className="text-sm text-gray-400">{token.symbol}</div>
          </div>
        </div>
      </td>
      
      <td className="px-4 py-4">
        <div className={priceClass}>
          <span className="font-medium">${formatNumber(token.price)}</span>
        </div>
      </td>
      
      <td className="px-4 py-4">
        <div className={cn("flex items-center gap-1", isPositive ? "text-green-400" : "text-red-400")}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{formatPercentage(token.priceChange24h)}</span>
        </div>
      </td>
      
      <td className="px-4 py-4 text-gray-300">
        ${formatCompactNumber(token.volume24h)}
      </td>
      
      <td className="px-4 py-4 text-gray-300">
        ${formatCompactNumber(token.marketCap)}
      </td>
      
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
            {token.category === "new-pairs" && "New"}
            {token.category === "final-stretch" && "Final"}
            {token.category === "migrated" && "Migrated"}
          </span>
          {token.category === "migrated" && token.migrationInfo && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-400 hover:text-white">
                  <Info className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Migration Info</p>
                  <p className="text-xs text-gray-400">
                    From: {token.migrationInfo.from}
                  </p>
                  <p className="text-xs text-gray-400">
                    To: {token.migrationInfo.to}
                  </p>
                  <p className="text-xs text-gray-400">
                    Date: {new Date(token.migrationInfo.date).toLocaleDateString()}
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </td>
      
      <td className="px-4 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="rounded-md bg-gray-800 px-3 py-1.5 text-sm text-white transition-colors hover:bg-gray-700">
                    View Details
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{token.name} ({token.symbol})</DialogTitle>
                    <DialogDescription>{token.description || "Token details"}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Price</p>
                      <p className="text-lg text-white">${formatNumber(token.price)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300">24h Change</p>
                      <p className={cn("text-lg", isPositive ? "text-green-400" : "text-red-400")}>
                        {formatPercentage(token.priceChange24h)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300">Volume (24h)</p>
                      <p className="text-lg text-white">${formatCompactNumber(token.volume24h)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300">Market Cap</p>
                      <p className="text-lg text-white">${formatCompactNumber(token.marketCap)}</p>
                    </div>
                    {token.launchDate && (
                      <div>
                        <p className="text-sm font-medium text-gray-300">Launch Date</p>
                        <p className="text-lg text-white">
                          {new Date(token.launchDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to view full token details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>
    </tr>
  );
});

