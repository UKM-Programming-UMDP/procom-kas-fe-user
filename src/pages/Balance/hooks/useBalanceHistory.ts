import BalanceHistoryServices from "@services/balanceHistory";
import { useBalanceHistoryContext } from "../context";

interface HookReturn {
  balanceHistoryService: BalanceHistoryServices;
  fetchBalanceHistory: (
    limit?: number,
    page?: number,
    order_by?: "desc" | "asc",
    sort?: string,
  ) => void;
}
const useBalanceHistory = (): HookReturn => {
  const { setState } = useBalanceHistoryContext();
  const balanceHistoryService = new BalanceHistoryServices();

  const fetchBalanceHistory = async (
    limit: number = 10,
    page: number = 1,
    order_by: "desc" | "asc" = "desc",
    sort: string = "created_at",
  ) => {
    setState((prev) => ({ ...prev, balanceHistoryLoading: true }));
    const res = await balanceHistoryService.get(limit, page, order_by, sort);
    if (!res) {
      setState((prev) => ({ ...prev, balanceHistoryLoading: false }));
      // handle error
      return;
    }

    function formatDate(date: Date) {
      const today = new Date();
      const yesterday = new Date(today);

      yesterday.setDate(today.getDate() - 1);

      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return "Today";
      } else if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
      ) {
        return "Yesterday";
      } else {
        const options = {
          day: "numeric" as const,
          month: "long" as const,
          year: "numeric" as const,
          hour: "2-digit" as const,
          minute: "2-digit" as const,
          second: "2-digit" as const,
          hour12: true,
        };
        return date.toLocaleString("en-US", options);
      }
    }

    const formattedData = res.data.map((item) => {
      const date = new Date(item.created_at);

      const formattedDate = formatDate(date);
      return {
        ...item,
        prev_balance: item.prev_balance ?? 0,
        user: {
          name: item.user.name ?? "Anonymous",
          npm: item.user.npm ?? "000000000",
        },
        created_at: formattedDate,
      };
    });

    setState((prev) => ({
      ...prev,
      balanceHistoryLoading: false,
      page: res.pagination?.page ?? 1,
      limit: res.pagination?.limit ?? 10,
      orderBy: order_by,
      totalItems: res.pagination?.total_items ?? 0,
      totalPages: res.pagination?.total_pages ?? 1,
      balanceHistory: formattedData,
    }));

    if (formattedData.length === 0 && page > 1) {
      fetchBalanceHistory(limit, 1, order_by, sort);
    }
  };

  return {
    balanceHistoryService,
    fetchBalanceHistory,
  };
};

export default useBalanceHistory;
