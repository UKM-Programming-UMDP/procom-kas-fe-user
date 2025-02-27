import KasSubmissionService from "@api/kasSubmission/kasSubmission";
import { KasSubmissionCreateModel } from "@api/kasSubmission/model";
import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import FileServices from "@api/file/file";
import { useCreateKasContext } from "@pages/CreateKas/context";
import { Redirect } from "../utils/redirect";

const useCreateKasSubmission = () => {
  const kasService = new KasSubmissionService();
  const fileService = new FileServices();
  const { setValue, trigger, handleSubmit } = useFormContext();
  const { state, setState } = useCreateKasContext();
  const { handleRedirect } = Redirect();

  const handleChangeFile = (file: File[]) => {
    setState((prev) => ({
      ...prev,
      evidenceKas: file,
    }));
    setValue("evidence", file[0]);
  };

  const handleUploadImage = async (files: File[]) => {
    const formData = new FormData();
    formData.append("file", files[0]);

    await fileService.post(formData, {
      onSuccess: (data) => {
        setValue("evidence", data.url_id);
        trigger("evidence");
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
      },
    });
  };

  const handleSubmitForm = async () => {
    return handleSubmit(async (values) => {
      const submissionData: KasSubmissionCreateModel = {
        user: { npm: values.user.npm },
        payed_amount: values.payed_amount,
        note: values.note,
        evidence: values.evidence,
      };

      setState((prevState) => ({
        ...prevState,
        kassubmissionreqDetails: submissionData,
        createKasLoading: true,
      }));

      kasService.post(JSON.stringify(submissionData), {
        onSuccess: () => {
          snackbar.success("Successfully, Wait for Admin Validation");
          setState((prevState) => ({
            ...prevState,
            submissionKasLoading: false,
          }));
          handleRedirect();
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prevState) => ({
            ...prevState,
            submissionKasLoading: false,
          }));
        },
      });
    })();
  };

  const handleUploadAndSubmit = async () => {
    const isValid = await trigger();
    if (!isValid || (state.evidenceKas && state.evidenceKas.length > 0)) {
      return;
    }
    await handleUploadImage(state.evidenceKas);
    await handleSubmit(handleSubmitForm)();
  };

  return {
    handleUploadAndSubmit,
    handleChangeFile,
    handleSubmitForm,
    handleUploadImage,
  };
};

export default useCreateKasSubmission;
