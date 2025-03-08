import KasSubmissionService from "@api/kasSubmission/kasSubmission";
import { KasSubmissionCreateModel } from "@api/kasSubmission/model";
import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { useCreateKasContext } from "@pages/CreateKas/context";
import { Redirect } from "../utils/redirect";
import useUploadFile from "@hooks/useUploadFile";

const useCreateKasSubmission = () => {
  const kasService = new KasSubmissionService();
  const { getValues, trigger, handleSubmit } = useFormContext();
  const { setState } = useCreateKasContext();
  const { handleRedirect } = Redirect();
  const { handleUploadImage } = useUploadFile();

  const handleKasSubmission = async () => {
    return handleSubmit(async (values) => {
      const submissionData: KasSubmissionCreateModel = {
        user: { npm: values.user.npm },
        payed_amount: values.payed_amount,
        note: values.note,
        evidence: values.evidence,
      };
      console.log(values.evidence + "-1");
      kasService.post(JSON.stringify(submissionData), {
        onSuccess: (data) => {
          snackbar.success("Successfully, Wait for Admin Validation");
          console.log(data);
          handleRedirect();
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
        },
      });
    })();
  };

  const handleSubmitForm = async () => {
    const fileImage = getValues("evidence");
    trigger();
    console.log("fileImage", fileImage);
    const isValid = await trigger();
    if (!isValid || !fileImage) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      createKasLoading: true,
    }));

    console.log(fileImage + "2");
    await handleUploadImage(fileImage);
    await handleSubmit(handleKasSubmission)();

    setState((prevState) => ({
      ...prevState,
      createKasLoading: false,
    }));
  };

  return {
    handleSubmitForm,
  };
};

export default useCreateKasSubmission;
