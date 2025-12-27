/**
 * Token data structure
 */
export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  category: "new-pairs" | "final-stretch" | "migrated";
  logoUrl?: string;
  description?: string;
  launchDate?: string;
  migrationInfo?: {
    from: string;
    to: string;
    date: string;
  };
}

/**
 * Sort configuration
 */
export type SortField = "price" | "volume24h" | "marketCap" | "priceChange24h";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

/**
 * WebSocket message types
 */
export interface PriceUpdate {
  tokenId: string;
  price: number;
  timestamp: number;
}

