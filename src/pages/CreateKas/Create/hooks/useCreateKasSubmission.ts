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
  const { setState } = useCreateKasContext();
  const {handleRedirect} = Redirect();

  const handleFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); 
  
    await fileService.post(formData, {
      onSuccess: (data) => {
        setValue("evidence", data.url_id);
        trigger("evidence");
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
      
      setState((prevState) => ({
        ...prevState,   
        submissionKasLoading: true,
      })); 

      kasService.post(JSON.stringify(submissionData), {
        onSuccess: (data) => {
          snackbar.success("Successfully created Kas submission");
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

  return {
    handleSubmitForm,
    handleFile,
  };
};

export default useCreateKasSubmission;
