import { BalanceHistoryType } from "@services/balanceHistory";
import { FilterType, PaginationType } from "@types";
import { createContext, useContext, useState } from "react";

type BalanceHistoryStateType = {
  balance: number;
  balanceLoading: boolean;
  balanceHistory: BalanceHistoryType[];
  balanceHistoryLoading: boolean;
  mode: "list" | "table" | "chart";
  filter?: FilterType;
  pagination?: PaginationType;
};

export const initialState: BalanceHistoryStateType = {
  balance: 0,
  balanceLoading: false,
  balanceHistory: [],
  balanceHistoryLoading: false,
  mode: "list",
  filter: {
    order_by: "desc",
    sort: "created_at",
  },
  pagination: {
    page: 1,
    limit: 10,
    total_pages: 1,
    total_items: 0,
  },
};

type BalanceHistoryContextType = {
  state: BalanceHistoryStateType;
  setState: React.Dispatch<React.SetStateAction<BalanceHistoryStateType>>;
};

const BalanceHistoryContext = createContext<BalanceHistoryContextType | null>(
  null,
);

const useBalanceHistoryContext = (): BalanceHistoryContextType => {
  const context = useContext(BalanceHistoryContext);
  if (!context) {
    throw new Error(
      "useBalanceHistoryContext must be used within a BalanceHistoryProvider",
    );
  }
  return context;
};

const BalanceHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<BalanceHistoryStateType>(initialState);

  return (
    <BalanceHistoryContext.Provider value={{ state, setState }}>
      {children}
    </BalanceHistoryContext.Provider>
  );
};

export { BalanceHistoryProvider, useBalanceHistoryContext };
export type { BalanceHistoryStateType };
