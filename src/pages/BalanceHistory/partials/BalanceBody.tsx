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
import glassmorphism from "@utils/glassmorphism";
import ModeButton from "./ModeButton";

const BalanceBody = () => {
  const { state } = useBalanceHistoryContext();
  const { fetchBalanceHistory } = useBalanceHistory();
  const [firstNewDate, setFirstNewDate] = useState(true);

  const handleOrderByFilter = () => {
    fetchBalanceHistory({
      order_by: state.filter?.order_by === "desc" ? "asc" : "desc",
    });
  };

  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      <div
        className={cn(
          "flex flex-col gap-4 p-4 rounded-md",
          glassmorphism({ container: true, border: true }),
        )}
      >
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Balance History</div>
          <div className="flex gap-4 items-center">
            {!state.balanceHistoryLoading && (
              <AppearFadeIn direction="bottom">
                <button
                  onClick={handleOrderByFilter}
                  className={cn(
                    "hover:scale-105 transition-all py-2 px-3 font-bold rounded-md uppercase",
                    glassmorphism({ container: true, hover: true }),
                  )}
                >
                  {state.filter?.order_by}
                </button>
              </AppearFadeIn>
            )}
            <div className="flex p-2">
              <ModeButton mode="list" currentMode={state.mode}>
                <List />
              </ModeButton>
              <ModeButton mode="table" currentMode={state.mode}>
                <TableChart />
              </ModeButton>
              <ModeButton mode="chart" currentMode={state.mode}>
                <BarChart />
              </ModeButton>
            </div>
          </div>
        </div>
        <hr />
        {state.balanceHistoryLoading ? (
          <CircularProgress size="2rem" />
        ) : (
          <div
            className={cn(
              "rounded-md overflow-x-auto",
              glassmorphism({ container: true, border: true }),
            )}
          >
            {state.balanceHistory.length === 0 ? (
              <div className="text-center p-2">Balance History is empty</div>
            ) : state.mode === "list" ? (
              <BalanceBodyList
                firstNewDate={firstNewDate}
                setFirstNewDate={setFirstNewDate}
              />
            ) : state.mode === "table" ? (
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
