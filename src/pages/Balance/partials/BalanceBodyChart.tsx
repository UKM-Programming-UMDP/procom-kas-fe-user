import AppearGrow from "@components/Animation/AppearGrow";
import { BarChart } from "@mui/x-charts/BarChart";
import { useBalanceHistoryContext } from "../context";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const BalanceBodyChart = () => {
  const { state: balanceHistoryState } = useBalanceHistoryContext();
  const groupedData = balanceHistoryState.balanceHistory.reduce(
    (acc: { [key: string]: { date: string; total_amount: number } }, item) => {
      const existingItem = acc[item.created_at];
      if (existingItem) {
        existingItem.total_amount += item.amount;
      } else {
        acc[item.created_at] = {
          date: item.created_at.split("at")[0],
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
      <div className="flex justify-center py-1 bg-gray-200">
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
