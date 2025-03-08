import useCreateKasSubmissionForm from "./Create/hooks/useCreateKasSubmissionForm";
import KasBody from "./partials/KasBody";
import { FormProvider } from "react-hook-form";

const CreateKasLayout = () => {
  const { kassubmissionreqForm } = useCreateKasSubmissionForm();
  return (
    <FormProvider {...kassubmissionreqForm}>
      <KasBody />
    </FormProvider>
  );
};

export default CreateKasLayout;
