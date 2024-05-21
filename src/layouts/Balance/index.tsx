import Balance from "@pages/Balance";
import { BalanceProvider } from "@pages/Balance/context";

const BalanceLayout = () => {
  return (
    <BalanceProvider>
      <Balance />
    </BalanceProvider>
  );
};

export default BalanceLayout;
