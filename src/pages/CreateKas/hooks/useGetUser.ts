import KasSubmissionService from "@api/kasSubmission/kasSubmission";
import { useCreateKasContext } from "../context";
import { snackbar } from "@utils/snackbar";
import { FilterParams} from "@types";
import { filterMapper } from "../List/utils/filterMapper";

interface HookReturn {
  fetchUsers: (filterParams?: FilterParams) => void;
}

const useGetUser = (): HookReturn => {
  const { state, setState } = useCreateKasContext();
  const kasService = new KasSubmissionService();
  
  const fetchUsers = (
    filterParams: FilterParams = filterMapper(
      Object.assign(state.filters)
    )
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
    fetchUsers,
  };
};

export default useGetUser;
