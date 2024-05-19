import useBalance from "./hooks/useBalance";
import useBalanceHistory from "./hooks/useBalanceHistory";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { useEffect } from "react";
import { useBalanceContext, useBalanceHistoryContext } from "./context";
import { CircularProgress } from "@mui/material";

const Balance = () => {
  const { state: balanceState } = useBalanceContext();
  const { fetchBalance } = useBalance();
  const { state: balanceHistoryState } = useBalanceHistoryContext();
  console.log(balanceHistoryState);
  const { fetchBalanceHistory } = useBalanceHistory();

  useEffect(() => {
    fetchBalance();
    fetchBalanceHistory();
  }, []);

  return (
    <AppearFadeIn
      direction="bottom"
      delay={0.7}
      className="md:h-[60vh] h-[75vh]"
    >
      {balanceState.balanceLoading ? (
        <CircularProgress size="2rem" />
      ) : (
        <div>Balance: {balanceState.balance}</div>
      )}
    </AppearFadeIn>
  );
};

export default Balance;
