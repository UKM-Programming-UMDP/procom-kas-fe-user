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
import {
  glassmorphismContainer,
  glassmorphismContainerBorder,
  glassmorphismContainerHover,
} from "@utils/glassmorphism";

const BalanceBody = () => {
  const { state, setState } = useBalanceHistoryContext();
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
          "py-1 px-2",
          currentMode === mode
            ? glassmorphismContainerBorder()
            : `${"hover:scale-105"} ${glassmorphismContainer()} ${glassmorphismContainerHover()}`,
          mode === "list" && "rounded-s-md",
          mode === "chart" && "rounded-e-md",
        )}
        onClick={() => setState({ ...state, mode })}
      >
        {children}
      </button>
    );
  };

  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      <div
        className={cn(
          "flex flex-col gap-4 p-4 rounded-md",
          glassmorphismContainer(),
          glassmorphismContainerBorder(),
        )}
      >
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Balance History</div>
          <div className="flex gap-4 items-center">
            {!state.balanceHistoryLoading && (
              <AppearFadeIn direction="bottom">
                <button
                  onClick={() =>
                    fetchBalanceHistory({
                      order_by:
                        state.filter.order_by === "desc" ? "asc" : "desc",
                    })
                  }
                  className={cn(
                    "hover:scale-105 transition-all py-2 px-3 font-bold rounded-md uppercase",
                    glassmorphismContainer(),
                    glassmorphismContainerHover(),
                  )}
                >
                  {state.filter.order_by}
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
              glassmorphismContainer(),
              glassmorphismContainerBorder(),
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
