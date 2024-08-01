import CreateKasService, { UserType } from "@services/CreateKas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { APIResponse } from "@types";
import { useCreateKasContext } from "../context";

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
    try {
      const kasService = new CreateKasService();
      const res = await kasService.get();
      if (res && res.data) {
        setState((prevState) => ({
          ...prevState,
          user: res.data,
          userLoading: false,
        }));
      }
    } catch (err: unknown) {
      const error = err as APIResponse<void>;
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error?.message + " Error fetching users",
      });
      setState((prevState) => ({ ...prevState, userLoading: false }));
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
