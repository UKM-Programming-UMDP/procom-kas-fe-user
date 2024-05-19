import { GetResponse as BalanceHistoryType } from "@services/balanceHistory";
import { createContext, useContext, useState } from "react";

type BalanceStateType = {
  balance: number;
  balanceLoading: boolean;
};

type BalanceHistoryStateType = {
  balanceHistory: BalanceHistoryType;
  balanceHistoryLoading: boolean;
};

export const initialState: BalanceStateType = {
  balance: 0,
  balanceLoading: false,
};

export const initialBalanceHistoryState: BalanceHistoryStateType = {
  balanceHistory: [],
  balanceHistoryLoading: false,
};

type BalanceContextType = {
  state: BalanceStateType;
  setState: React.Dispatch<React.SetStateAction<BalanceStateType>>;
};

type BalanceHistoryContextType = {
  state: BalanceHistoryStateType;
  setState: React.Dispatch<React.SetStateAction<BalanceHistoryStateType>>;
};

const BalanceContext = createContext<BalanceContextType | null>(null);
const BalanceHistoryContext = createContext<BalanceHistoryContextType | null>(
  null,
);

const useBalanceContext = (): BalanceContextType => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalanceContext must be used within a BalanceProvider");
  }
  return context;
};

const useBalanceHistoryContext = (): BalanceHistoryContextType => {
  const context = useContext(BalanceHistoryContext);
  if (!context) {
    throw new Error(
      "useBalanceHistoryContext must be used within a BalanceProvider",
    );
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

const BalanceHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<BalanceHistoryStateType>(
    initialBalanceHistoryState,
  );

  return (
    <BalanceHistoryContext.Provider value={{ state, setState }}>
      {children}
    </BalanceHistoryContext.Provider>
  );
};

export {
  BalanceProvider,
  useBalanceContext,
  BalanceHistoryProvider,
  useBalanceHistoryContext,
};
export type { BalanceStateType, BalanceHistoryStateType };
