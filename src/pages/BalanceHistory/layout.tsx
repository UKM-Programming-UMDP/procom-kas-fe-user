import BalanceHistory from "@pages/BalanceHistory";
import { BalanceHistoryProvider } from "@pages/BalanceHistory/context";

const BalanceHistoryLayout = () => {
  return (
    <BalanceHistoryProvider>
      <BalanceHistory />
    </BalanceHistoryProvider>
  );
};

export default BalanceHistoryLayout;
