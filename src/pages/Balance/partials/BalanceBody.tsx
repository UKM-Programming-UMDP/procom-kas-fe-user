import { CircularProgress } from "@mui/material";
import { useBalanceHistoryContext } from "../context";
import { BarChart, List, TableChart } from "@mui/icons-material";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import BalanceBodyList from "./BalanceBodyList";
import { useState } from "react";
import BalanceBodyTable from "./BalanceBodyTable";
import { cn } from "@utils/cn";
import BalanceBodyChart from "./BalanceBodyChart";
import useBalanceHistory from "../hooks/useBalanceHistory";

const BalanceBody = () => {
  const { state: balanceHistoryState, setState } = useBalanceHistoryContext();
  const { fetchBalanceHistory } = useBalanceHistory();
  const [firstNewDate, setFirstNewDate] = useState(true);

  type ModeButtonProps = {
    mode: "list" | "table" | "chart";
    currentMode: "list" | "table" | "chart";
    children: React.ReactNode;
  };
  const ModeButton = ({ mode, currentMode, children }: ModeButtonProps) => {
    return (
      <button
        disabled={currentMode === mode}
        className={cn(
          "border border-slate-900 py-1 px-2",
          currentMode === mode
            ? "bg-slate-900 border-white"
            : "bg-slate-800 hover:bg-slate-700 hover:scale-105 transition-all",
          mode === "list" && "rounded-s-md",
          mode === "chart" && "rounded-e-md",
        )}
        onClick={() => setState({ ...balanceHistoryState, mode })}
      >
        {children}
      </button>
    );
  };

  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      <div className="flex flex-col gap-4 bg-slate-900 p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Balance History</div>
          <div className="flex gap-4 items-center">
            {!balanceHistoryState.balanceHistoryLoading && (
              <AppearFadeIn direction="bottom">
                <button
                  onClick={() =>
                    fetchBalanceHistory(
                      balanceHistoryState.limit,
                      balanceHistoryState.page,
                      balanceHistoryState.orderBy === "desc" ? "asc" : "desc",
                    )
                  }
                  className="bg-slate-800 hover:bg-slate-700 hover:scale-105 transition-all py-2 px-3 font-bold rounded-md uppercase"
                >
                  {balanceHistoryState.orderBy}
                </button>
              </AppearFadeIn>
            )}
            <div className="flex bg-slate-950 p-2 rounded-md">
              <ModeButton mode="list" currentMode={balanceHistoryState.mode}>
                <List />
              </ModeButton>
              <ModeButton mode="table" currentMode={balanceHistoryState.mode}>
                <TableChart />
              </ModeButton>
              <ModeButton mode="chart" currentMode={balanceHistoryState.mode}>
                <BarChart />
              </ModeButton>
            </div>
          </div>
        </div>
        <hr />
        {balanceHistoryState.balanceHistoryLoading ? (
          <CircularProgress size="2rem" />
        ) : (
          <div className="bg-slate-800 rounded-md overflow-x-auto">
            {balanceHistoryState.balanceHistory.length === 0 ? (
              <div className="text-center p-2">Balance History is empty</div>
            ) : balanceHistoryState.mode === "list" ? (
              <BalanceBodyList
                firstNewDate={firstNewDate}
                setFirstNewDate={setFirstNewDate}
              />
            ) : balanceHistoryState.mode === "table" ? (
              <BalanceBodyTable />
            ) : (
              <BalanceBodyChart />
            )}
          </div>
        )}
      </div>
    </AppearFadeIn>
  );
};

export default BalanceBody;
