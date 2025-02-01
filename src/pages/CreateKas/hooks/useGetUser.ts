import { UserModel } from "@api/kasSubmission/model";
import KasSubmissionService from "@api/kasSubmission/kasSubmission";
import { useCreateKasContext } from "../context";
import { snackbar } from "@utils/snackbar";
import { useEffect, useState, useCallback } from "react";
import { FilterType } from "@types";

interface HookReturn {
  fetchUsers: () => void;
  loading: boolean;
  users: UserModel[];
}

const useGetUser = (): HookReturn => {
  const { state, setState } = useCreateKasContext();
  const [filters, setFilters] = useState<FilterType[]>([
    {
      key: "npm",
      label: "npm",
      options: [
        {
          label: "npm",
          value: "user.npm",
        },
        {
          label: "name",
          value: "user.name",
        },
      ],
    },
  ]);

  const fetchUsers = useCallback(() => {
    setState((prevState) => ({ ...prevState, userLoading: true }));

    const kasService = new KasSubmissionService();

    kasService.get("name", {
      onSuccess: (data) => {
        setState((prevState) => ({
          ...prevState,
          userLoading: false,
          users: data,
        }));

        setFilters((prevFilters) => [
          ...prevFilters,
          {
            key: "user.npm",
            label: "npm",
            options: data.map((user: UserModel) => ({
              label: user.name,
              value: user.npm,
            })),
          },
        ]);
      },
      onError: (error: unknown) => {
        snackbar.error(JSON.stringify(error));
        setState((prevState) => ({
          ...prevState,
          userLoading: false,
        }));
      },
    });
  }, [setState]);

  useEffect(() => {
    if (!filters.find((filter) => filter.key === "npm")) {
      fetchUsers();
    }
  }, [fetchUsers, filters]);

  return {
    fetchUsers,
    loading: state.userLoading,
    users: state.users, 
  };
};

export default useGetUser;
