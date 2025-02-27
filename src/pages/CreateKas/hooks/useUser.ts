import KasSubmissionService from "@api/kasSubmission/kasSubmission";
import { useCreateKasContext } from "../context";
import { snackbar } from "@utils/snackbar";
import { FilterParams } from "@types";
import { filterMapper } from "../List/utils/filterMapper";
import { useFormContext } from "react-hook-form";

interface HookReturn {
  fetchUsers: (filterParams?: FilterParams) => void;
  handleActiveUser: () => { npm: string; name: string } | null;
}

const useUser = (): HookReturn => {
  const { state, setState } = useCreateKasContext();
  const kasService = new KasSubmissionService();
  const { getValues } = useFormContext();

  const handleActiveUser = () => {
    const activeUser = state.user.find(
      (user) => user.npm === getValues("user.npm"),
    );
    return activeUser ? { npm: activeUser.npm, name: activeUser.name } : null;
  };

  const fetchUsers = (
    filterParams: FilterParams = filterMapper(Object.assign(state.filters)),
  ) => {
    setState((prevState) => ({
      ...prevState,
      userLoading: true,
    }));

    kasService.get(JSON.stringify(filterParams), {
      onSuccess: (data) => {
        setState((prevState) => ({
          ...prevState,
          userLoading: false,
          user: data,
        }));
      },
      onError: (error: unknown) => {
        snackbar.error(JSON.stringify(error));
        setState((prevState) => ({
          ...prevState,
          userLoading: false,
        }));
      },
    });
  };

  return {
    handleActiveUser,
    fetchUsers,
  };
};

export default useUser;
