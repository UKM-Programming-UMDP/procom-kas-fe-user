import { UserModel } from "@api/kasSubmission/model";
import KasSubmissionService from "@api/kasSubmission/kasSubmission";
import { useCreateKasContext } from "../context";
import { snackbar, errMessage } from "@utils/snackbar";

interface HookReturn {
  kasService: KasSubmissionService;
  fetchUsers: () => void;
  selectUser: (user: UserModel) => void;
  loading: boolean;
  users: UserModel[];
}

const useGetUser = (): HookReturn => {
  const { state, setState } = useCreateKasContext();

  const fetchUsers = async () => {
    setState((prevState) => ({ ...prevState, userLoading: true }));

    const kasService = new KasSubmissionService();

    const res = await kasService.get();
    if (res && res.data) {
      setState((prevState) => ({
        ...prevState,
        user: res.data,
        userLoading: false,
      }));
    }

    if (!res || !res.status) {
      setState((prevState) => ({ ...prevState, userLoading: false }));
      snackbar.error(errMessage(res));
    }
  };

  const selectUser = (user: UserModel) => {
    setState((prevState) => ({
      ...prevState,
      selectedUsers: [...prevState.selectedUsers, user],
    }));
  };

  return {
    fetchUsers,
    selectUser,
    kasService: new KasSubmissionService(),
    loading: state.userLoading,
    users: state.user,
  };
};

export default useGetUser;
