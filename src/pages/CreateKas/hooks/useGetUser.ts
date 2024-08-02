import CreateKasService, { UserType } from "@services/CreateKas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { APIResponse } from "@types";
import { useCreateKasContext } from "../context";
import { snackbar, errMessage } from "@utils/snackbar";
const MySwal = withReactContent(Swal);

interface HookReturn {
  kasService: CreateKasService;
  fetchUsers: () => void;
  selectUser: (user: UserType) => void;
  loading: boolean;
  users: UserType[];
}

const useGetUser = (): HookReturn => {
  const { state, setState } = useCreateKasContext();

  const fetchUsers = async () => {
    setState((prevState) => ({ ...prevState, userLoading: true }));

    const kasService = new CreateKasService();

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
    kasService: new CreateKasService(),
    loading: state.userLoading,
    users: state.user,
  };
};

export default useGetUser;
