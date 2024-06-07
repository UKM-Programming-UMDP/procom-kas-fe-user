import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { useEffect } from "react";
import usePayedKas from "./hooks/usePayedKas";
import { usePayedKasContext } from "./context";

const PayedKasLayout = () => {
  const { state } = usePayedKasContext();
  const { fetchPayedKas } = usePayedKas();

  useEffect(() => {
    fetchPayedKas();
  }, []);

  return (
    <AppearFadeIn
      direction="bottom"
      delay={0.7}
      className="md:h-[60vh] h-[75vh]"
    >
      <div>PayedKas</div>
      {state.payedKas.map((item, index) => (
        <div key={index}>
          {item.user.name} - {item.payed_amount}
        </div>
      ))}
    </AppearFadeIn>
  );
};

export default PayedKasLayout;
