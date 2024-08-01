import React from "react";
import NoteKas from "./NoteKas";
import glassmorphism from "@utils/glassmorphism";
import { useCreateKasContext } from "@pages/CreateKas/context/index";
import PayedAmount from "./PayedAmount";
import UploadImage from "./UploadImage";
import useCreateKasSubmission from "../hooks/useCreateKasSubmission";
import SearchUser from "./SearchUser";
const KasBody: React.FC = () => {
  const { state } = useCreateKasContext();
  const { payedAmount, note } = state;
  const { handleSubmit } = useCreateKasSubmission();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(payedAmount, note);
  };

  return (
    <div className={`p-3 text-dark-700`}>
      <form
        onSubmit={handleFormSubmit}
        className={`p-5 ${glassmorphism({ container: true, border: true })}`}
      >
        <SearchUser />
        <PayedAmount />
        <NoteKas />
        <UploadImage />
        <div className="mt-3">
          <button
            type="submit"
            className={`w-full rounded-lg py-2 px-3 bg-violet-500 shadow-lg`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default KasBody;
