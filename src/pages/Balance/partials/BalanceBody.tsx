import { CircularProgress } from "@mui/material";
import { useBalanceHistoryContext } from "../context";
import { BarChart, List, TableChart } from "@mui/icons-material";
import { cn } from "@utils/cn";
import AppearFadeIn from "@components/Animation/AppearFadeIn";

const BalanceBody = () => {
  const { state: balanceHistoryState } = useBalanceHistoryContext();
  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      {balanceHistoryState.balanceHistoryLoading ? (
        <CircularProgress size="2rem" />
      ) : (
        (() => {
          let firstNewDate = true;
          let lastDate = "";
          return (
            <div className="flex flex-col gap-4 bg-slate-900 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Balance History</div>
                <div className="flex gap-2 bg-slate-950 p-2 rounded-md">
                  <button className="bg-slate-800 rounded-md py-1 px-2">
                    <List />
                  </button>
                  <button className="bg-slate-800 rounded-md py-1 px-2">
                    <TableChart />
                  </button>
                  <button className="bg-slate-800 rounded-md py-1 px-2">
                    <BarChart />
                  </button>
                </div>
              </div>
              <hr />
              <div className="bg-slate-800 rounded-md">
                {balanceHistoryState.balanceHistory.map((item, index) => {
                  const currentDate = item.created_at.split("at")[0];
                  const isNewDate = currentDate !== lastDate;
                  lastDate = currentDate;

                  return (
                    <div key={index}>
                      {isNewDate && (
                        <div
                          className={cn(
                            "bg-slate-950 p-4 font-semibold",
                            firstNewDate && "rounded-t-md",
                          )}
                        >
                          {currentDate}
                        </div>
                      )}
                      {firstNewDate && isNewDate && (firstNewDate = false)}
                      <div className="p-4 flex justify-between group hover:bg-slate-700 transition-colors">
                        <div className="flex flex-col gap-1 font-medium group-hover:text-gray-300">
                          <div>
                            {item.user.name ?? "Anonymous"} -{" "}
                            {item.user.npm ?? "?"}
                          </div>
                          <div>{item.note}</div>
                        </div>
                        <div className="flex flex-col gap-1 text-end">
                          <div>
                            {item.prev_balance && (
                              <div className="text-gray-500 font-medium group-hover:text-gray-400">
                                Rp{" "}
                                {item.prev_balance
                                  .toLocaleString()
                                  .replace(/,/g, ".")}
                                ,-
                              </div>
                            )}
                            <div className="text-green-500 font-medium group-hover:text-green-600">
                              {item.activity === "Add" && "+"} Rp{" "}
                              {item.amount.toLocaleString().replace(/,/g, ".")}
                              ,-
                            </div>
                          </div>
                          <div className="group-hover:text-gray-300">
                            {item.created_at.split("at")[1]}
                          </div>
                        </div>
                      </div>
                      {index !==
                        balanceHistoryState.balanceHistory.length - 1 && <hr />}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()
      )}
    </AppearFadeIn>
  );
};

export default BalanceBody;
