import { StateType } from "@pages/CreateKas/context";
import { FilterParams } from "@types";

export const filterMapper = (filters: StateType["filters"]): FilterParams => {
  return {
    params: {
      name: filters.name,
      npm: filters.npm,
    },
  };
};
