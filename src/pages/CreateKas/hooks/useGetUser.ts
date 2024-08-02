import KasSubmissionService, { UserType } from "@services/kasSubmission";
import { useCreateKasContext } from "../context";
import { snackbar, errMessage } from "@utils/snackbar";

interface HookReturn {
  kasService: KasSubmissionService;
  fetchUsers: () => void;
  selectUser: (user: UserType) => void;
  loading: boolean;
  users: UserType[];
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

  const selectUser = (user: UserType) => {
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
