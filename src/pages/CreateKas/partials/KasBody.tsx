import React from "react";
import NoteKas from "./NoteKas";
import glassmorphism from "@utils/glassmorphism";
import PayedAmount from "./PayedAmount";
import UploadImage from "./UploadImage";
import useCreateKasSubmission from "../Create/hooks/useCreateKasSubmission";
import SearchUser from "./SearchUser";
import { useForm } from "react-hook-form";
import { KasSubmissionCreateModel } from "@api/kasSubmission/model";

const KasBody: React.FC = () => {
  const { handleSubmitForm } = useCreateKasSubmission();
  const { handleSubmit } = useForm<KasSubmissionCreateModel>();
  return (
    <div className={`p-3 text-dark-700`}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className={`p-5 ${glassmorphism({ container: true, border: true })}`}
      >
        {/* <SearchUser /> */}
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
