import BalanceServices from "@services/balance";
import { useBalanceHistoryContext } from "../context";
import { snackbar, errMessage } from "@utils/snackbar";

interface HookReturn {
  balanceService: BalanceServices;
  fetchBalance: () => void;
}
const useBalance = (): HookReturn => {
  const { setState } = useBalanceHistoryContext();
  const balanceService = new BalanceServices();

  const fetchBalance = async () => {
    setState((prev) => ({ ...prev, balanceLoading: true }));
    const res = await balanceService.get();
    if (!res || !res.status) {
      setState((prev) => ({ ...prev, balanceLoading: false }));
      snackbar.error(errMessage(res));
      return;
    }
    setState((prev) => ({
      ...prev,
      balanceLoading: false,
      balance: res.data.balance,
    }));
  };

  return {
    balanceService,
    fetchBalance,
  };
};

export default useBalance;
