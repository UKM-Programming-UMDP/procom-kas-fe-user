import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { AccountBalanceWallet, Link } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useBalanceContext } from "../context";

const BalanceHeader = () => {
  const { state } = useBalanceContext();

  return (
    <AppearFadeIn direction="bottom" delay={0.7}>
      {state.balanceLoading ? (
        <CircularProgress size="2rem" />
      ) : (
        <div className="flex gap-4 items-center bg-slate-900 p-4 rounded-md">
          <div className="bg-slate-500 p-6 rounded-md">
            <AccountBalanceWallet />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-lg">UKM Programming Balance</p>
              <a
                href="https://ukmprogramming.mdp.ac.id/"
                target="_blank"
                className="font-extralight text-blue-500 flex gap-1 items-center hover:underline"
              >
                <Link />
                UKM Programming Website
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex flex-col gap-1 rounded-md bg-slate-800 py-1 px-2 border-dashed">
                <p className="font-bold">
                  Rp {state.balance.toLocaleString().replace(/,/g, ".")}
                  ,-
                </p>
                <p>Current Balance</p>
              </div>
              <div className="flex flex-col gap-1 rounded-md bg-slate-800 py-1 px-2 border-dashed">
                <p className="font-bold">{state.pagination.total_items}</p>
                <p>Total History</p>
              </div>
              <div className="flex flex-col gap-1 rounded-md bg-slate-800 py-1 px-2 border-dashed">
                <p className="font-bold">?</p>
                <p>Total Payer</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppearFadeIn>
  );
};

export default BalanceHeader;
