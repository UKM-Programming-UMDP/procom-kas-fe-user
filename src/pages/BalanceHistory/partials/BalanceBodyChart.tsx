import AppearGrow from "@components/Animation/AppearGrow";
import { BarChart } from "@mui/x-charts/BarChart";
import { useBalanceHistoryContext } from "../context";
import { cn } from "@utils/cn";
import glassmorphism from "@utils/glassmorphism";
import useGroupedChartData from "../hooks/useGroupedChartData";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const BalanceBodyChart = () => {
  const { state } = useBalanceHistoryContext();
  const { groupedChartData, valueFormatter } = useGroupedChartData(
    state.balanceHistory,
  );

  const theme = useTheme();
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const chartWidth = isVerySmallScreen
    ? 100
    : isSmallScreen
      ? 300
      : isMediumScreen
        ? 400
        : 700;

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
