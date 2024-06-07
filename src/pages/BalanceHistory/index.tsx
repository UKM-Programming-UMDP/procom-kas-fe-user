import { BalanceHistoryProvider } from "@pages/BalanceHistory/context";
import BalanceHistoryLayout from "./layout";

const BalanceHistory = () => {
  return (
    <BalanceHistoryProvider>
      <BalanceHistoryLayout />
    </BalanceHistoryProvider>
  );
};

export default BalanceHistory;
