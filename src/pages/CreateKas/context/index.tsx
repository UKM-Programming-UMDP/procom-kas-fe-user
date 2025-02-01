import { KasSubmissionCreateModel, UserModel } from "@api/kasSubmission/model";
import { createContext, useContext, useState } from "react";
import useDialog, { UseDialogReturn } from "@hooks/useDialog";

type StateType = {
  users: UserModel[];
  userLoading: boolean;
  createKasLoading: boolean;
  uploadFileLoading: boolean;
  kassubmissionreqDetails: KasSubmissionCreateModel;

  predefinedNotes: Record<
    "bca" | "mandiri" | "gopay" | "cash" | "ovo" | "dana",
    string
  >;

  filters: {
    npm: string;
    name: string;
  };
};

export const initialState: StateType = {
  user: [],
  userLoading: false,
  kassubmissionreqDetails: {} as KasSubmissionCreateModel,
  createKasLoading: false,
  uploadFileLoading: false,

  predefinedNotes: {
    bca: "Payment via BCA",
    mandiri: "Payment via Mandiri",
    gopay: "Payment via Gopay",
    cash: "Payment via cash",
    ovo: "Payment via OVO",
    dana: "Payment via DANA",
  },

  filters: {
    npm: "",
    name: "",
  },
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
  dialog: {
    userreqDetails: UseDialogReturn;
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
    userreqDetails: useDialog(),
  };

  return (
    <CreateKasContext.Provider value={{ state, setState, dialog }}>
      {children}
    </CreateKasContext.Provider>
  );
};

export { CreateKasProvider, useCreateKasContext };
export type { StateType };
