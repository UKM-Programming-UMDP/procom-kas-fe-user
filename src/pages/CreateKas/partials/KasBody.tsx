import React from "react";
import NoteKas from "./NoteKas";
import glassmorphism from "@utils/glassmorphism";
import PayedAmount from "./PayedAmount";
import UploadImage from "./UploadImage";
import useCreateKasSubmission from "../Create/hooks/useCreateKasSubmission";
import SearchUser from "./SearchUser";
import { ActionButton } from "@components/Button";
import { useCreateKasContext } from "../context";

const KasBody: React.FC = () => {
  const { state } = useCreateKasContext();
  const { handleUploadAndSubmit } = useCreateKasSubmission();

  return (
    <div
      className={`p-5 text-dark-700 ${glassmorphism({ container: true, border: true })} `}
    >
      <SearchUser />
      <PayedAmount />
      <NoteKas />
      <UploadImage />
      <ActionButton
        label="Submit"
        onClick={handleUploadAndSubmit}
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
