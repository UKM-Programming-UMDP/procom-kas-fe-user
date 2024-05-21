import BalanceHistoryServices from "@services/balanceHistory";
import { useBalanceContext } from "../context";
import { PaginationType } from "@types";
import { formatBalanceHistoryData } from "@utils/formatBalanceHistoryData";

interface HookReturn {
  balanceHistoryService: BalanceHistoryServices;
  fetchBalanceHistory: (
    limit?: PaginationType["limit"],
    page?: PaginationType["page"],
    order_by?: PaginationType["order_by"],
    sort?: PaginationType["sort"],
  ) => void;
}
const useBalanceHistory = (): HookReturn => {
  const { setState } = useBalanceContext();
  const balanceHistoryService = new BalanceHistoryServices();

  const fetchBalanceHistory = async (
    limit: PaginationType["limit"] = 10,
    page: PaginationType["page"] = 1,
    order_by: PaginationType["order_by"] = "desc",
    sort: PaginationType["sort"] = "created_at",
  ) => {
    setState((prev) => ({ ...prev, balanceHistoryLoading: true }));
    const res = await balanceHistoryService.get({
      limit,
      page,
      order_by,
      sort,
    });
    if (!res) {
      setState((prev) => ({ ...prev, balanceHistoryLoading: false }));
      // handle error
      return;
    }

    const formattedBalanceHistoryData = res.data.map(formatBalanceHistoryData);

    setState((prev) => ({
      ...prev,
      balanceHistoryLoading: false,
      pagination: {
        ...prev.pagination,
        page: res.pagination?.page ?? 1,
        limit: res.pagination?.limit ?? 10,
        order_by,
        sort,
        total_items: res.pagination?.total_items ?? 0,
        total_pages: res.pagination?.total_pages ?? 1,
      },
      balanceHistory: formattedBalanceHistoryData,
    }));

    if (formattedBalanceHistoryData.length === 0 && page > 1) {
      fetchBalanceHistory(limit, 1, order_by, sort);
    }
  };

  return {
    balanceHistoryService,
    fetchBalanceHistory,
  };
};

export default useBalanceHistory;
