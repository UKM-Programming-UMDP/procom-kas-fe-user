import { GetResponse } from "@services/payedKas";
import { createContext, useContext, useState } from "react";

type StateType = {
  payedKas: GetResponse[];
  payedKasLoading: boolean;
};

export const initialState: StateType = {
  payedKas: [],
  payedKasLoading: false,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const PayedKasContext = createContext<ContextType | null>(null);

const usePayedKasContext = (): ContextType => {
  const context = useContext(PayedKasContext);
  if (!context) {
    throw new Error(
      "usePayedKasContext must be used within a PayedKasProvider",
    );
  }
  return context;
};

const PayedKasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);

  return (
    <PayedKasContext.Provider value={{ state, setState }}>
      {children}
    </PayedKasContext.Provider>
  );
};

export { PayedKasProvider, usePayedKasContext };
export type { StateType };
