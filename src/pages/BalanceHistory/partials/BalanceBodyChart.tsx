import AppearGrow from "@components/Animation/AppearGrow";
import { BarChart } from "@mui/x-charts/BarChart";
import { useBalanceHistoryContext } from "../context";
import { cn } from "@utils/cn";
import glassmorphism from "@utils/glassmorphism";
import { useChartWidth } from "../hooks/useChartWidth";
import { useGroupedChartData } from "../hooks/useGroupedChartData";

const BalanceBodyChart = () => {
  const { state } = useBalanceHistoryContext();
  const { groupedChartData, valueFormatter } = useGroupedChartData(
    state.balanceHistory,
  );

  const chartWidth = useChartWidth();

  return (
    <AppearGrow trigger direction="x">
      <div
        className={cn(
          "flex justify-center py-1",
          glassmorphism({ container: true }),
        )}
      >
        <BarChart
          dataset={groupedChartData}
          colors={["#008000"]}
          yAxis={[{ scaleType: "band", dataKey: "date" }]}
          series={[
            {
              dataKey: "total_amount",
              label: "Total Amount Payed",
              valueFormatter,
            },
          ]}
          layout="horizontal"
          xAxis={[{ label: "Total Amount per Date" }]}
          width={chartWidth}
          height={400}
        />
      </div>
    </AppearGrow>
  );
};

export default BalanceBodyChart;
