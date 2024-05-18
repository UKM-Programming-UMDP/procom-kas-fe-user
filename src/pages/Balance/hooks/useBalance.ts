import BalanceServices from "@services/balance";
import { useBalanceContext } from "../context";

interface HookReturn {
  balanceService: BalanceServices;
  fetchBalance: () => void;
}
const useBalance = (): HookReturn => {
  const { setState } = useBalanceContext();
  const balanceService = new BalanceServices();

  const fetchBalance = async () => {
    setState((prev) => ({ ...prev, balanceLoading: true }));
    const res = await balanceService.get();
    if (!res) {
      setState((prev) => ({ ...prev, balanceLoading: false }));
      // handle error
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
