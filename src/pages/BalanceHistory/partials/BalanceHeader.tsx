import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { AccountBalanceWallet } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useBalanceHistoryContext } from "../context";
import { cn } from "@utils/index";
import glassmorphism from "@utils/glassmorphism";

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
            glassmorphism({ container: true, border: true }),
          )}
        >
          <div
            className={cn(
              "p-6 rounded-md md:block hidden",
              glassmorphism({ container: true }),
            )}
          >
            <AccountBalanceWallet />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg md:block hidden">
              UKM Programming Balance History
            </span>
            <div className="flex flex-wrap gap-2">
              <div
                className={cn(
                  "flex flex-col gap-1 rounded-md py-1 px-2 border-dashed",
                  glassmorphism({ container: true, border: true }),
                )}
              >
                <span className="font-bold">
                  Rp {state.balance.toLocaleString().replace(/,/g, ".")}
                  ,-
                </span>
                <span>Current Balance</span>
              </div>
              <div
                className={cn(
                  "flex flex-col gap-1 rounded-md py-1 px-2 border-dashed",
                  glassmorphism({ container: true, border: true }),
                )}
              >
                <span className="font-bold">
                  {state.pagination?.total_items}
                </span>
                <span>Total History</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppearFadeIn>
  );
};

export default BalanceHeader;
