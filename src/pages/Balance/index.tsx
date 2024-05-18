import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { useEffect } from "react";
import useBalance from "./hooks/useBalance";
import { useBalanceContext } from "./context";
import { CircularProgress } from "@mui/material";

const Balance = () => {
  const { state } = useBalanceContext();
  const { fetchBalance } = useBalance();

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <AppearFadeIn
      direction="bottom"
      delay={0.7}
      className="md:h-[60vh] h-[75vh]"
    >
      {state.balanceLoading ? (
        <CircularProgress size="2rem" />
      ) : (
        <div>Balance: {state.balance}</div>
      )}
    </AppearFadeIn>
  );
};

export default Balance;
