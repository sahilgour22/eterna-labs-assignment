import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, PriceUpdate } from "@/lib/types";

interface TokensState {
  tokens: Token[];
  sortConfig: {
    field: string | null;
    direction: "asc" | "desc";
  };
  selectedToken: Token | null;
}

const initialState: TokensState = {
  tokens: [],
  sortConfig: {
    field: null,
    direction: "asc",
  },
  selectedToken: null,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
    },
    updateTokenPrice: (state, action: PayloadAction<PriceUpdate>) => {
      const token = state.tokens.find((t) => t.id === action.payload.tokenId);
      if (token) {
        token.price = action.payload.price;
      }
    },
    setSortConfig: (
      state,
      action: PayloadAction<{ field: string | null; direction: "asc" | "desc" }>
    ) => {
      state.sortConfig = action.payload;
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
  },
});

export const { setTokens, updateTokenPrice, setSortConfig, setSelectedToken } =
  tokensSlice.actions;
export default tokensSlice.reducer;

