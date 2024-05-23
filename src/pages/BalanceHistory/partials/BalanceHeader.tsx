import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { AccountBalanceWallet } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useBalanceHistoryContext } from "../context";
import { cn } from "@utils/cn";
import {
  glassmorphismContainer,
  glassmorphismContainerBorder,
} from "@utils/glassmorphism";

const BalanceHeader = () => {
  const { state } = useBalanceHistoryContext();

  return (
    <AppearFadeIn direction="bottom" delay={0.7}>
      {state.balanceLoading ? (
        <CircularProgress size="2rem" />
      ) : (
        <div
          className={cn(
            "flex gap-4 items-center p-4 rounded-md",
            glassmorphismContainer(),
            glassmorphismContainerBorder(),
          )}
        >
          <div className={cn("p-6 rounded-md", glassmorphismContainer())}>
            <AccountBalanceWallet />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg">UKM Programming Balance History</p>
            <div className="flex flex-wrap justify-center gap-2">
              <div
                className={cn(
                  "flex flex-col gap-1 rounded-md py-1 px-2 border-dashed",
                  glassmorphismContainer(),
                  glassmorphismContainerBorder(),
                )}
              >
                <p className="font-bold">
                  Rp {state.balance.toLocaleString().replace(/,/g, ".")}
                  ,-
                </p>
                <p>Current Balance</p>
              </div>
              <div
                className={cn(
                  "flex flex-col gap-1 rounded-md py-1 px-2 border-dashed",
                  glassmorphismContainer(),
                  glassmorphismContainerBorder(),
                )}
              >
                <p className="font-bold">{state.pagination.total_items}</p>
                <p>Total History</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppearFadeIn>
  );
};

export default BalanceHeader;
