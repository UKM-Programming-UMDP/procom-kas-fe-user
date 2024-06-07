import { PayedKasProvider } from "@pages/PayedKas/context";
import PayedKasLayout from "./layout";

const PayedKas = () => {
  return (
    <PayedKasProvider>
      <PayedKasLayout />
    </PayedKasProvider>
  );
};

export default PayedKas;
