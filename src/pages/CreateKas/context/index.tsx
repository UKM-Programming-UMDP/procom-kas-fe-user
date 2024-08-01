import { GetResponse, UserType } from "@services/CreateKas";
import { createContext, useContext, useState } from "react";
import useDialog, { UseDialogReturn } from "@hooks/useDialog";
import { UploadImageResponse } from "@services/UploadImage";

type StateType = {
  createKas: GetResponse[];
  uploadFile: UploadImageResponse[];
  user: UserType[];
  createKasLoading: boolean;
  userLoading: boolean;
  userStatus: boolean;
  uploadFileLoading: boolean;
  selectedUsers: UserType[];
  payedAmount: number;
  note: string;
  uriId: string;
  errors: {
    user: string;
    payedAmount: string;
    note: string;
    fileUpload: string;
  };
  predefinedNotes: Record<
    "bca" | "mandiri" | "gopay" | "cash" | "ovo" | "dana",
    string
  >;
};

export const initialState: StateType = {
  createKas: [],

  uploadFile: [],
  createKasLoading: false,
  user: [],
  userStatus: false,
  userLoading: false,
  uploadFileLoading: false,
  selectedUsers: [],
  payedAmount: 0,
  note: "",
  uriId: "",
  errors: {
    user: "",
    payedAmount: "",
    note: "",
    fileUpload: "",
  },
  predefinedNotes: {
    bca: "Payment via BCA",
    mandiri: "Payment via Mandiri",
    gopay: "Payment via Gopay",
    cash: "Payment via cash",
    ovo: "Payment via OVO",
    dana: "Payment via DANA",
  },
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
  dialog: {
    finreqDetails: UseDialogReturn;
  };
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
  const dialog = {
    finreqDetails: useDialog(),
  };

  return (
    <CreateKasContext.Provider value={{ state, setState, dialog }}>
      {children}
    </CreateKasContext.Provider>
  );
};

export { CreateKasProvider, useCreateKasContext };
export type { StateType };
