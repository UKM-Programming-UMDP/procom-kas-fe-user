import { useState, useEffect } from "react";
import CreateKasService, { SubmissionRequest } from "@services/CreateKas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCreateKasContext } from "../context";
import { APIResponse } from "@types";
import useUploadImage from "../hooks/useUploadImage";
import { UserType } from "@services/CreateKas";
const MySwal = withReactContent(Swal);

const useCreateKasSubmission = () => {
  const kasService = new CreateKasService();
  const { state, setState } = useCreateKasContext();
  const { selectedUsers, errors } = state;
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const { uriId } = useUploadImage();

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setSelectedUser(user);
    } else if (selectedUsers.length > 0) {
      setSelectedUser(selectedUsers[0]);
    }
  }, [selectedUsers]);

  const handleSubmit = async (payedAmount: number, note: string) => {
    let hasError = false;
    const newErrors = { ...errors };

    if (!selectedUser) {
      newErrors.user = "User is required.";
      hasError = true;
    } else {
      newErrors.user = "";
    }

    if (!payedAmount || payedAmount <= 0) {
      newErrors.payedAmount = "Payment amount must be greater than 0.";
      hasError = true;
    } else {
      newErrors.payedAmount = "";
    }

    if (!note) {
      newErrors.note = "Note is required.";
      hasError = true;
    } else {
      newErrors.note = "";
    }

    if (!uriId) {
      newErrors.fileUpload = "File upload is required.";
      hasError = true;
    } else {
      newErrors.fileUpload = "";
    }

    setState((prevState) => ({
      ...prevState,
      errors: newErrors,
    }));

    if (hasError) {
      return false;
    }

    const submissionData: SubmissionRequest = {
      user: {
        npm: selectedUser?.npm || "",
      },
      payed_amount: payedAmount,
      note: note,
      evidence: uriId,
    };

    setState((prev) => ({
      ...prev,
      createKasLoading: true,
      createKasError: null,
      createKasSuccess: false,
    }));

    try {
      const response = await kasService.post(JSON.stringify(submissionData));
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
    } catch (err: unknown) {
      const error = err as APIResponse<void>;
      setState((prev) => ({
        ...prev,
        createKasError: error?.message || "Error creating submission",
      }));
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || "Error creating submission",
      });
    } finally {
      setState((prev) => ({
        ...prev,
        createKasLoading: false,
      }));
    }
    return true;
  };

  return { handleSubmit, selectedUser, setSelectedUser, errors };
};

export default useCreateKasSubmission;
