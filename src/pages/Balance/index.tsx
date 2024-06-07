import { BalanceProvider } from "@pages/Balance/context";
import BalanceLayout from "./layout";

const Balance = () => {
  return (
    <BalanceProvider>
      <BalanceLayout />
    </BalanceProvider>
  );
};

export default Balance;
