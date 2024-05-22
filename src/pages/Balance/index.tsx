import useBalance from "./hooks/useBalance";
import useBalanceHistory from "./hooks/useBalanceHistory";
import { useEffect } from "react";
import BalanceHeader from "./partials/BalanceHeader";
import BalanceBody from "./partials/BalanceBody";

const Balance = () => {
  const { fetchBalance } = useBalance();
  const { fetchBalanceHistory } = useBalanceHistory();

  useEffect(() => {
    fetchBalance();
    fetchBalanceHistory();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <BalanceHeader />
      <BalanceBody />
    </div>
  );
};

export default Balance;
