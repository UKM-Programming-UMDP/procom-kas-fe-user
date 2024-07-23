import { useState } from "react";
import CreateKasService, { UserType } from "@services/CreateKas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const useGetUser = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const kasService = new CreateKasService();
      const res = await kasService.get();
      if (res && res?.data) {
        setUsers(res?.data);
      }
    } catch (err: any) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: err?.message + " Error fetching users",
      });
    } finally {
      setLoading(false);
    }
  };

  return { fetchUsers, users, loading };
};

export default useGetUser;
