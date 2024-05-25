import { CircularProgress } from "@mui/material";
import { useBalanceHistoryContext } from "../context";
import { BarChart, List, TableChart } from "@mui/icons-material";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import React, { useState } from "react";
import BalanceBodyTable from "./BalanceBodyTable";
import { cn } from "@utils/cn";
import BalanceBodyChart from "./BalanceBodyChart";
import useBalanceHistory from "../hooks/useBalanceHistory";
import glassmorphism from "@utils/glassmorphism";
import ModeButton, { ModeButtonMode } from "./ModeButton";
import BalanceBodyList from "./BalanceBodyList";

const BalanceBody = () => {
  const { state } = useBalanceHistoryContext();
  const { handleOrderByFilter } = useBalanceHistory();
  const [firstNewDate, setFirstNewDate] = useState(true);

  const modeButton: { mode: ModeButtonMode; icon: React.ReactNode }[] = [
    { mode: "list", icon: <List /> },
    { mode: "table", icon: <TableChart /> },
    { mode: "chart", icon: <BarChart /> },
  ];

  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      <div
        className={cn(
          "flex flex-col gap-4 p-4 rounded-md",
          glassmorphism({ container: true, border: true }),
        )}
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Balance History</span>
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
              {modeButton.map((button, index) => (
                <ModeButton
                  key={index}
                  mode={button.mode}
                  currentMode={state.mode}
                >
                  {button.icon}
                </ModeButton>
              ))}
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
