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
    setState((prev) => ({
      ...prev,
      balanceHistoryLoading: false,
      balanceHistory: [...prev.balanceHistory, ...res.data],
    }));
  };

  return {
    balanceHistoryService,
    fetchBalanceHistory,
  };
};

export default useBalanceHistory;
