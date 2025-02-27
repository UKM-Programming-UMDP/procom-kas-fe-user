import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { KasSubmissionCreateModel } from "@api/kasSubmission/model";

export const kassubmissionreqDefaultValues: KasSubmissionCreateModel = {
  user: {
    npm: "",
  },
  payed_amount: 0,
  note: "",
  evidence: "",
};

export const kassubmissionValidations = yupResolver(
  yup.object().shape({
    user: yup.object().shape({
      npm: yup
        .string()
        .typeError("User is required")
        .max(10, "User is required")
        .required("User is required"),
    }),
    payed_amount: yup
      .number()
      .typeError("Payed Amount is required")
      .moreThan(0, "Payed Amount must be greater than 0")
      .required("Payed Amount is Required"),
    note: yup
      .string()
      .typeError("Payed Amount is required")
      .required("Note is Required"),
    evidence: yup.string().required("Note is Required"),
  }),
);

export const kassubmissionDetailsFormatter = (
  data: KasSubmissionCreateModel,
): KasSubmissionCreateModel => {
  return {
    user: {
      npm: data?.user?.npm,
    },
    payed_amount: data?.payed_amount,
    note: data?.note,
    evidence: data?.evidence,
  };
};
