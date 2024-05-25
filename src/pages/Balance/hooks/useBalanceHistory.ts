import BalanceHistoryServices from "@services/balanceHistory";
import { useBalanceContext } from "../context";
import { formatBalanceHistoryData } from "@utils/formatBalanceHistoryData";

interface HookReturn {
  balanceHistoryService: BalanceHistoryServices;
  fetchBalanceHistory: () => void;
}
const useBalanceHistory = (): HookReturn => {
  const { setState } = useBalanceContext();
  const balanceHistoryService = new BalanceHistoryServices();

  const fetchBalanceHistory = async () => {
    setState((prev) => ({ ...prev, balanceHistoryLoading: true }));

    const params = new URLSearchParams({
      limit: "10",
      page: "1",
      order_by: "desc",
      sort: "created_at",
    });

    const res = await balanceHistoryService.get(params.toString());
    if (!res || !res.status) {
      setState((prev) => ({ ...prev, balanceHistoryLoading: false }));
      // handle error
      return;
    }

    const formattedBalanceHistoryData = res.data.map(formatBalanceHistoryData);

    setState((prev) => ({
      ...prev,
      balanceHistoryLoading: false,
      balanceHistory: formattedBalanceHistoryData,
      totalBalanceHistory: res.pagination?.total_items ?? 0,
    }));
  };

  return {
    balanceHistoryService,
    fetchBalanceHistory,
  };
};

export default useBalanceHistory;
