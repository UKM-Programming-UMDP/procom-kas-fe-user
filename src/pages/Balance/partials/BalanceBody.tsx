import { CircularProgress, Divider } from "@mui/material";
import { useBalanceContext } from "../context";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { cn } from "@utils/index";
import glassmorphism from "@utils/glassmorphism";
import BalanceBodyContent from "./BalanceBodyContent";

const BalanceBody = () => {
  const { state } = useBalanceContext();

  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      <div
        className={cn(
          "flex flex-col gap-4 p-4 rounded-md",
          glassmorphism({ container: true, border: true }),
        )}
      >
        <div className="text-lg font-semibold">Latest 10 Balance History</div>
        <Divider color="white" />
        {state.balanceHistoryLoading ? (
          <CircularProgress size="2rem" />
        ) : (
          <div
            className={cn(
              "overflow-x-auto rounded-md",
              glassmorphism({ container: true, border: true }),
            )}
          >
            {state.balanceHistory.length === 0 ? (
              <div className="text-center p-2">Balance History is empty</div>
            ) : (
              <BalanceBodyContent />
            )}
          </div>
        )}
      </div>
    </AppearFadeIn>
  );
};

export default BalanceBody;
