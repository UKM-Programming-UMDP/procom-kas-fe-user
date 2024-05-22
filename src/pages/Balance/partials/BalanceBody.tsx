import { CircularProgress } from "@mui/material";
import { useBalanceContext } from "../context";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { useEffect, useState } from "react";
import AppearGrow from "@components/Animation/AppearGrow";
import { cn } from "@utils/cn";

const BalanceBody = () => {
  const { state } = useBalanceContext();
  const [firstNewDate, setFirstNewDate] = useState(true);
  useEffect(() => {
    if (firstNewDate) {
      setFirstNewDate(false);
    }
  }, [firstNewDate, setFirstNewDate]);

  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      <div className="flex flex-col gap-4 bg-slate-900 p-4 rounded-md">
        <div className="text-lg font-semibold">Latest 10 Balance History</div>
        <hr />
        {state.balanceHistoryLoading ? (
          <CircularProgress size="2rem" />
        ) : (
          <div className="bg-slate-800 rounded-md overflow-x-auto">
            {state.balanceHistory.length === 0 ? (
              <div className="text-center p-2">Balance History is empty</div>
            ) : (
              <AppearGrow trigger direction="x">
                {state.balanceHistory.map((item, index) => {
                  return (
                    <AppearFadeIn
                      key={index}
                      direction="bottom"
                      delay={0.1 * index}
                    >
                      <div className="p-4 flex justify-between group hover:bg-slate-700 transition-colors">
                        <div className="flex flex-col gap-1 font-medium group-hover:text-gray-300">
                          <div className="flex items-center gap-4">
                            <div className="bg-slate-900 rounded-full py-3 px-4">
                              {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </div>
                            <div>
                              <div>
                                {item.user.name} ({item.user.npm})
                              </div>
                              <div>{item.note}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 text-end">
                          <div
                            className={cn(
                              "font-medium ",
                              item.amount > 0
                                ? "text-green-500 group-hover:text-green-600"
                                : item.amount < 0
                                  ? "text-red-500 group-hover:text-red-600"
                                  : "text-gray-300",
                            )}
                          >
                            {item.amount > 0 ? "+" : item.amount < 0 ? "-" : ""}{" "}
                            Rp {item.amount.toLocaleString().replace(/,/g, ".")}
                            ,-
                          </div>
                          <div className="group-hover:text-gray-300">
                            {item.created_at}
                          </div>
                        </div>
                      </div>
                      {index !== state.balanceHistory.length - 1 && <hr />}
                    </AppearFadeIn>
                  );
                })}
              </AppearGrow>
            )}
          </div>
        )}
      </div>
    </AppearFadeIn>
  );
};

export default BalanceBody;
