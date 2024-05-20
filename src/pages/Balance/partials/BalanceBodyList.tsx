import { cn } from "@utils/cn";
import { useEffect } from "react";
import { useBalanceHistoryContext } from "../context";

type BalanceBodyListProps = {
  firstNewDate: boolean;
  setFirstNewDate: (value: boolean) => void;
};

const BalanceBodyList = ({
  firstNewDate,
  setFirstNewDate,
}: BalanceBodyListProps) => {
  useEffect(() => {
    if (firstNewDate) {
      setFirstNewDate(false);
    }
  }, [firstNewDate, setFirstNewDate]);
  const { state: balanceHistoryState } = useBalanceHistoryContext();
  let lastDate = "";

  return (
    <>
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
            <div className="p-4 flex justify-between group hover:bg-slate-700 transition-colors">
              <div className="flex flex-col gap-1 font-medium group-hover:text-gray-300">
                <div>
                  {item.user.name} - {item.user.npm}
                </div>
                <div>{item.note}</div>
              </div>
              <div className="flex flex-col gap-1 text-end">
                <div>
                  {item.prev_balance && (
                    <div className="text-gray-500 font-medium group-hover:text-gray-400">
                      Rp {item.prev_balance.toLocaleString().replace(/,/g, ".")}
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
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default BalanceBodyList;
