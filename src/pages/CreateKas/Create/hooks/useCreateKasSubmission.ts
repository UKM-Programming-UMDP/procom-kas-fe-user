import { useState, useEffect } from "react";
import KasSubmissionService from "@api/kasSubmission/kasSubmission";
import { KasSubmissionCreateModel, UserModel } from "@api/kasSubmission/model";
import { useCreateKasContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import FileServices from "@api/file/file";
import { UploadFileModel } from "@api/file/model";

const useCreateKasSubmission = () => {
  const kasService = new KasSubmissionService();
  const fileService = new FileServices();
  const { setValue, handleSubmit } = useFormContext();

  const handleFile = async (file: File) => {
    const submission: UploadFileModel = { file };

    await fileService.post(submission, {
      onSuccess: (data) => {
        setValue("evidence", data.url_id);
        console.log(data);
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
      },
    });
  };

  const handleSubmitForm = () => {
    return handleSubmit((values) => {
      const submissionData: KasSubmissionCreateModel = {
        user: { npm: values.user.npm },
        payed_amount: values.payed_amount,
        note: values.note,
        evidence: values.evidence,
      };

      kasService.post(JSON.stringify(submissionData), {
        onSuccess: (data) => {
          snackbar.success("Successfully created Kas submission");
          console.log(data);
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
        },
      });
    })();
  };

  return {
    handleSubmitForm,
    handleFile,
  };
};

export default useCreateKasSubmission;
