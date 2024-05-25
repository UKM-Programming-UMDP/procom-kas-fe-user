import { BalanceHistoryType } from "@services/balanceHistory";
import { useState, useEffect } from "react";

type GroupedChartDataType = {
  date: string;
  total_amount: number;
};

function useGroupedChartData(balanceHistory: BalanceHistoryType[]) {
  const [groupedChartData, setGroupedChartData] = useState<
    GroupedChartDataType[]
  >([]);

  useEffect(() => {
    const data = balanceHistory.reduce(
      (
        acc: { [key: string]: { date: string; total_amount: number } },
        item,
      ) => {
        const dateOnly = item.created_at.split("at")[0];
        const existingItem = acc[dateOnly];
        if (existingItem) {
          existingItem.total_amount += item.amount;
        } else {
          acc[dateOnly] = {
            date: dateOnly,
            total_amount: item.amount,
          };
        }
        return acc;
      },
      {},
    );

    setGroupedChartData(Object.values(data));
  }, [balanceHistory]);

  const valueFormatter = (value: number | null) =>
    `Rp ${value?.toLocaleString().replace(/,/g, ".")},-`;

  return { groupedChartData, valueFormatter };
}

export default useGroupedChartData;
