import { useState, useCallback } from "react";
import KasSubmissionService from "@api/kasSubmission/kasSubmission";
import { snackbar, errMessage } from "@utils/snackbar";
import { UserModel } from "@api/kasSubmission/model";

const useKasSubmissionService = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserModel[]>([]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const kasService = new KasSubmissionService();
    const res = await kasService.get();

    if (res && res.data) {
      setUsers(res.data);
    } else {
      snackbar.error(errMessage(res));
    }

    setLoading(false);
  }, []);

  return {
    fetchUsers,
    users,
    loading,
  };
};

export default useKasSubmissionService;
