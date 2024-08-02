import { useState, useEffect } from "react";
import CreateKasService, { SubmissionRequest } from "@services/CreateKas";
import { useCreateKasContext } from "../context";
import useUploadImage from "../hooks/useUploadImage";
import { UserType } from "@services/CreateKas";
import { snackbar } from "@utils/snackbar";

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
      snackbar.warning(newErrors.user);
      hasError = true;
    } else {
      newErrors.user = "";
    }

    if (!payedAmount || payedAmount <= 0) {
      newErrors.payedAmount = "Payment amount must be greater than 0.";
      snackbar.warning(newErrors.payedAmount);
      hasError = true;
    } else {
      newErrors.payedAmount = "";
    }

    if (!note) {
      newErrors.note = "Note is required.";
      hasError = true;
      snackbar.warning(newErrors.note);
    } else {
      newErrors.note = "";
    }

    if (!uriId) {
      newErrors.fileUpload = "File upload is required.";
      hasError = true;
      snackbar.warning(newErrors.fileUpload);
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
    }));

    try {
      const res = await kasService.post(JSON.stringify(submissionData));
      if (res && res.status) {
        snackbar.success(res.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        snackbar.error(error?.message);
      } else {
        snackbar.error("An unexpected error occurred");
      }
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
