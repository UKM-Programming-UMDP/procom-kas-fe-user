import { useEffect } from "react";
import { useBalanceHistoryContext } from "../context";
import AppearGrow from "@components/Animation/AppearGrow";
import BalanceBodyListItem from "./BalanceBodyListItem";

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
  const { state } = useBalanceHistoryContext();
  let lastDate = "";

  return (
    <AppearGrow trigger direction="x">
      {state.balanceHistory.map((item, index) => {
        const currentDate = item.created_at.split("at")[0];
        const isNewDate = currentDate !== lastDate;
        lastDate = currentDate;

        return (
          <BalanceBodyListItem
            key={index}
            item={item}
            index={index}
            isNewDate={isNewDate}
            firstNewDate={firstNewDate}
            currentDate={currentDate}
          />
        );
      })}
    </AppearGrow>
  );
};

export default BalanceBodyList;
