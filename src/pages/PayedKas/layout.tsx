import PayedKas from "@pages/PayedKas";
import { PayedKasProvider } from "@pages/PayedKas/context";

const PayedKasLayout = () => {
  return (
    <PayedKasProvider>
      <PayedKas />
    </PayedKasProvider>
  );
};

export default PayedKasLayout;
