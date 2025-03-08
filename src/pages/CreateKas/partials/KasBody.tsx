import React from "react";
import NoteKas from "./NoteKas";
import glassmorphism from "@utils/glassmorphism";
import UploadImage from "./UploadImage";
import useCreateKasSubmission from "../Create/hooks/useCreateKasSubmission";
import { ActionButton } from "@components/Button";
import { useCreateKasContext } from "../context";
import SearchUserButton from "./SearchUserButton";
import AmountPaid from "./AmountPaid";

const KasBody: React.FC = () => {
  const { state } = useCreateKasContext();
  const { handleSubmitForm } = useCreateKasSubmission();

  return (
    <div
      className={`p-5 text-dark-700 ${glassmorphism({ container: true, border: true })} `}
    >
      <SearchUserButton />
      <AmountPaid />
      <NoteKas />
      <UploadImage />
      <ActionButton
        label="Submit"
        onClick={handleSubmitForm}
        submitLoading={state.createKasLoading}
        variant="contained"
        size="large"
        className={`w-full rounded-lg py-2 px-3 shadow-lg`}
        color="primary"
      />
    </div>
  );
};

export default KasBody;
