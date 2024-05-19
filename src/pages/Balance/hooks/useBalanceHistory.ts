import BalanceHistoryServices from "@services/balanceHistory";
import { useBalanceHistoryContext } from "../context";

interface HookReturn {
  balanceHistoryService: BalanceHistoryServices;
  fetchBalanceHistory: (
    limit?: number,
    page?: number,
    order_by?: string,
    sort?: string,
  ) => void;
}
const useBalanceHistory = (): HookReturn => {
  const { setState } = useBalanceHistoryContext();
  const balanceHistoryService = new BalanceHistoryServices();

  const fetchBalanceHistory = async (
    limit: number = 10,
    page: number = 1,
    order_by: string = "desc",
    sort: string = "created_at",
  ) => {
    setState((prev) => ({ ...prev, balanceHistoryLoading: true }));
    const res = await balanceHistoryService.get(limit, page, order_by, sort);
    if (!res) {
      setState((prev) => ({ ...prev, balanceHistoryLoading: false }));
      // handle error
      return;
    }

    const formattedData = res.data.map((item) => {
      const date = new Date(item.created_at);
      const options = {
        day: "numeric" as const,
        month: "long" as const,
        year: "numeric" as const,
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: true,
      };
      const formattedDate = date.toLocaleString("en-US", options);
      return {
        ...item,
        created_at: formattedDate,
      };
    });

    setState((prev) => ({
      ...prev,
      balanceHistoryLoading: false,
      page: res.pagination?.page ?? 1,
      limit: res.pagination?.limit ?? 10,
      totalItems: res.pagination?.total_items ?? 0,
      totalPages: res.pagination?.total_pages ?? 1,
      balanceHistory: formattedData,
    }));

    if (formattedData.length === 0) {
      fetchBalanceHistory(limit, 1, order_by, sort);
    }
  };

  return {
    balanceHistoryService,
    fetchBalanceHistory,
  };
};

export default useBalanceHistory;
