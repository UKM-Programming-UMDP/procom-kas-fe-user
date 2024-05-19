import Balance from "@pages/Balance";
import {
  BalanceHistoryProvider,
  BalanceProvider,
} from "@pages/Balance/context";

const BalanceLayout = () => {
  return (
    <BalanceProvider>
      <BalanceHistoryProvider>
        <Balance />
      </BalanceHistoryProvider>
    </BalanceProvider>
  );
};

export default BalanceLayout;
