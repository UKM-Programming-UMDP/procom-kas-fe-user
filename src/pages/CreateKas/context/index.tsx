import { GetResponse, UserType } from "@services/CreateKas";
import { createContext, useContext, useState } from "react";
import { UploadImageResponse } from "@services/UploadImage";
type StateType = {
  createKas: GetResponse[];
  uploadFile: UploadImageResponse[];
  user: UserType[];
  createKasLoading: boolean;
  userLoading: boolean;
  uploadFileLoading: boolean;
};

export const initialState: StateType = {
  createKas: [],
  uploadFile: [],
  createKasLoading: false,
  user: [],
  userLoading: false,
  uploadFileLoading: false,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const CreateKasContext = createContext<ContextType | null>(null);

const useCreateKasContext = (): ContextType => {
  const context = useContext(CreateKasContext);
  if (!context) {
    throw new Error(
      "useCreateKasContext must be used within a CreateKasProvider",
    );
  }
  return context;
};

const CreateKasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <CreateKasContext.Provider value={{ state, setState }}>
      {children}
    </CreateKasContext.Provider>
  );
};

export { CreateKasProvider, useCreateKasContext };
export type { StateType };
