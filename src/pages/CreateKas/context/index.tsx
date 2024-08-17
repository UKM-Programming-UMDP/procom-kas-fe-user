import { KasSubmissionCreateModel, UserModel } from "@api/kasSubmission/model";
import { createContext, useContext, useState } from "react";
import useDialog, { UseDialogReturn } from "@hooks/useDialog";

type StateType = {
  user: UserModel[];
  createKasLoading: boolean;
  userLoading: boolean;
  uploadFileLoading: boolean;
  kassubmissionreqDetails: KasSubmissionCreateModel;
  predefinedNotes: Record<
    "bca" | "mandiri" | "gopay" | "cash" | "ovo" | "dana",
    string
  >;
};

export const initialState: StateType = {
  kassubmissionreqDetails: {} as KasSubmissionCreateModel,
  createKasLoading: false,
  user: [],
  userLoading: false,
  uploadFileLoading: false,
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
