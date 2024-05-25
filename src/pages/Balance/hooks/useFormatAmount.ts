import { useCallback } from "react";

const useFormatAmount = () => {
  const formatAmount = useCallback((amount: number) => {
    const sign = amount > 0 ? "+" : amount < 0 ? "-" : "";
    const formattedAmount = `Rp ${amount.toLocaleString().replace(/,/g, ".")}`;

    return `${sign} ${formattedAmount}`;
  }, []);

  return formatAmount;
};

export default useFormatAmount;
