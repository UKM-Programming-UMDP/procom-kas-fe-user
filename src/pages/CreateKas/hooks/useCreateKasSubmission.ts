import { useState } from "react";
import CreateKasService, { SubmissionRequest } from "@services/CreateKas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCreateKasContext } from "../context";

const MySwal = withReactContent(Swal);

interface HookReturn {
  kasService: CreateKasService;
  submissionKas: (submission: SubmissionRequest, e: React.FormEvent) => void;
}

const useCreateKasSubmission = (): HookReturn => {
  const { setState } = useCreateKasContext();
  const kasService = new CreateKasService();

  const submissionKas = async (
    submission: SubmissionRequest,
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      createKasLoading: true,
      createKasError: null,
      createKasSuccess: false,
    }));

    try {
      const response = await kasService.submission(submission);
      console.log(response);
      if (response && response.status) {
        setState((prev) => ({
          ...prev,
          createKasSuccess: true,
        }));
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "Data created successfully!",
        });
      } else {
        setState((prev) => ({
          ...prev,
          createKasError: "Error creating submission",
        }));
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Error creating submission",
        });
      }
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        createKasError: err?.message || "Error creating submission",
      }));
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Error creating submission",
      });
    } finally {
      setState((prev) => ({
        ...prev,
        createKasLoading: false,
      }));
    }
  };

  return { kasService, submissionKas };
};

export default useCreateKasSubmission;
