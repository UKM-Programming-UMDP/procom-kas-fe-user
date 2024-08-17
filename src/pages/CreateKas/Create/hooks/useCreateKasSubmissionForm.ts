import { useCreateKasContext } from "../../context";
import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { KasSubmissionCreateModel } from "@api/kasSubmission/model";
import {
  kassubmissionreqDefaultValues,
  kassubmissionValidations,
  kassubmissionDetailsFormatter,
} from "../utils/form";

interface HookReturn {
  kassubmissionreqForm: UseFormReturn<KasSubmissionCreateModel>;
}

const useCreateKasSubmissionForm = (): HookReturn => {
  const { state } = useCreateKasContext();

  const kassubmissionreqForm = useForm<KasSubmissionCreateModel>({
    defaultValues: kassubmissionreqDefaultValues,
    values: kassubmissionDetailsFormatter(state.kassubmissionreqDetails),
    resolver: kassubmissionValidations as Resolver<KasSubmissionCreateModel>,
  });

  return {
    kassubmissionreqForm,
  };
};

export default useCreateKasSubmissionForm;
