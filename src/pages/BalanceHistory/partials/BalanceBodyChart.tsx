import AppearGrow from "@components/Animation/AppearGrow";
import { BarChart } from "@mui/x-charts/BarChart";
import { useBalanceHistoryContext } from "../context";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { cn } from "@utils/cn";
import glassmorphism from "@utils/glassmorphism";

const BalanceBodyChart = () => {
  const { state } = useBalanceHistoryContext();
  const groupedData = state.balanceHistory.reduce(
    (acc: { [key: string]: { date: string; total_amount: number } }, item) => {
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

  const dataset = Object.values(groupedData);
  const valueFormatter = (value: number | null) =>
    `Rp ${value?.toLocaleString().replace(/,/g, ".")},-`;

  const theme = useTheme();
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  let chartWidth;
  if (isVerySmallScreen) {
    chartWidth = 100;
  } else if (isSmallScreen) {
    chartWidth = 300;
  } else if (isMediumScreen) {
    chartWidth = 400;
  } else {
    chartWidth = 700;
  }

  return (
    <AppearGrow trigger direction="x">
      <div
        className={cn(
          "flex justify-center py-1",
          glassmorphism({ container: true }),
        )}
      >
        <BarChart
          dataset={dataset}
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
