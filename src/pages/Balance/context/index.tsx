import { BalanceHistoryType } from "@services/balanceHistory";
import { createContext, useContext, useState } from "react";

type BalanceStateType = {
  balance: number;
  balanceLoading: boolean;
  balanceHistory: BalanceHistoryType[];
  balanceHistoryLoading: boolean;
  totalBalanceHistory: number;
};

export const initialState: BalanceStateType = {
  balance: 0,
  balanceLoading: false,
  balanceHistory: [],
  balanceHistoryLoading: false,
  totalBalanceHistory: 0,
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
