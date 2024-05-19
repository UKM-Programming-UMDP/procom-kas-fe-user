import BalanceHistoryServices from "@services/balanceHistory";
import { useBalanceHistoryContext } from "../context";

interface HookReturn {
  balanceHistoryService: BalanceHistoryServices;
  fetchBalanceHistory: () => void;
}
const useBalanceHistory = (): HookReturn => {
  const { setState } = useBalanceHistoryContext();
  const balanceHistoryService = new BalanceHistoryServices();

  const fetchBalanceHistory = async () => {
    setState((prev) => ({ ...prev, balanceHistoryLoading: true }));
    const res = await balanceHistoryService.get();
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
      totalItems: res.pagination?.total_items ?? 0,
      page: res.pagination?.page ?? 1,
      totalPage: res.pagination?.total_pages ?? 1,
      balanceHistory: [...prev.balanceHistory, ...formattedData],
    }));
  };

  return {
    balanceHistoryService,
    fetchBalanceHistory,
  };
};

export default useBalanceHistory;
