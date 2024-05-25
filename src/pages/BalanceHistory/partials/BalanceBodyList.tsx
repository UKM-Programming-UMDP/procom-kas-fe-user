import { useEffect } from "react";
import { useBalanceHistoryContext } from "../context";
import AppearGrow from "@components/Animation/AppearGrow";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { cn } from "@utils/cn";
import BalanceHistoryCard from "./BalanceHistoryCard";

type BalanceBodyListProps = {
  firstNewDate: boolean;
  setFirstNewDate: (value: boolean) => void;
};

const BalanceBodyList = ({
  firstNewDate,
  setFirstNewDate,
}: BalanceBodyListProps) => {
  const { state } = useBalanceHistoryContext();

  useEffect(() => {
    if (firstNewDate) {
      setFirstNewDate(false);
    }
  }, [firstNewDate, setFirstNewDate]);

  let lastDate = "";

  return (
    <AppearGrow trigger direction="x">
      {state.balanceHistory.map((item, index) => {
        const currentDate = item.created_at.split("at")[0];
        const isNewDate = currentDate !== lastDate;
        lastDate = currentDate;

        return (
          <AppearFadeIn key={index} direction="bottom" delay={0.2 * index}>
            {isNewDate && (
              <div
                className={cn(
                  "p-4 font-semibold",
                  firstNewDate && "rounded-t-md",
                )}
              >
                {currentDate}
              </div>
            )}
            <BalanceHistoryCard history={item} />
            <hr />
          </AppearFadeIn>
        );
      })}
    </AppearGrow>
  );
};

export default BalanceBodyList;
