import { useCreateKasContext } from "@pages/CreateKas/context";
import useGetUser from "@pages/CreateKas/hooks/useUser";
import KasSubmissionService from "@api/kasSubmission/kasSubmission";
import { snackbar } from "@utils/snackbar";
import { userFilter } from "../utils/userFilter";

interface HookReturn {
  handleChangeSearch: (value: string) => void;
}

const useUserFilter = (): HookReturn => {
  const { setState } = useCreateKasContext();
  const { fetchUsers } = useGetUser();
  const kasService = new KasSubmissionService();

  const handleChangeSearch = (value: string) => {
    if (value === "" || value === null) {
      fetchUsers();
      return;
    }

    setState((prevState) => ({
      ...prevState,
      userLoading: true,
    }));

    kasService.get(value, {
      onSuccess: (data) => {
        setState((prevState) => ({
          ...prevState,
          user: value || value !== "" ? userFilter(data, value) : data,
          userLoading: false,
        }));
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
        setState((prevState) => ({
          ...prevState,
          userLoading: false,
        }));
      },
    });
  };

  return {
    handleChangeSearch,
  };
};

export default useUserFilter;
