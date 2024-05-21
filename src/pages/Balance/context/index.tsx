import { GetResponse as BalanceHistoryType } from "@services/balanceHistory";
import { PaginationType } from "@types";
import { createContext, useContext, useState } from "react";

type BalanceStateType = {
  balance: number;
  balanceLoading: boolean;
  balanceHistory: BalanceHistoryType;
  balanceHistoryLoading: boolean;
  mode: "list" | "table" | "chart";
  pagination: PaginationType;
};

export const initialState: BalanceStateType = {
  balance: 0,
  balanceLoading: false,
  balanceHistory: [],
  balanceHistoryLoading: false,
  mode: "list",
  pagination: {
    page: 1,
    limit: 10,
    order_by: "desc",
    sort: "created_at",
    total_items: 0,
    total_pages: 1,
  },
};

type BalanceContextType = {
  state: BalanceStateType;
  setState: React.Dispatch<React.SetStateAction<BalanceStateType>>;
};

const BalanceContext = createContext<BalanceContextType | null>(null);

const useBalanceContext = (): BalanceContextType => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalanceContext must be used within a BalanceProvider");
  }
  return context;
};

const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<BalanceStateType>(initialState);

  return (
    <BalanceContext.Provider value={{ state, setState }}>
      {children}
    </BalanceContext.Provider>
  );
};

export { BalanceProvider, useBalanceContext };
export type { BalanceStateType };
