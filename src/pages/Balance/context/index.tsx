import { createContext, useContext, useState } from "react";

type StateType = {
  balance: number;
  balanceLoading: boolean;
};

export const initialState: StateType = {
  balance: 0,
  balanceLoading: false,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const BalanceContext = createContext<ContextType | null>(null);

const useBalanceContext = (): ContextType => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalanceContext must be used within a BalanceProvider");
  }
  return context;
};

const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);

  return (
    <BalanceContext.Provider value={{ state, setState }}>
      {children}
    </BalanceContext.Provider>
  );
};

export { BalanceProvider, useBalanceContext };
export type { StateType };
