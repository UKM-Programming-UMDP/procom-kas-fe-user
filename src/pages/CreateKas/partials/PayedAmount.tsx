import React, { useState } from "react";
import { cn } from "@utils/index";
import glassmorphism from "@utils/glassmorphism";
import { useCreateKasContext } from "../context";
import useCreateKasSubmission from "../hooks/useCreateKasSubmission";
const PayedAmount: React.FC = () => {
  const { state, setState } = useCreateKasContext();
  const [monthCount, setMonthCount] = useState<number>(0);
  const { errors } = useCreateKasSubmission();
  const handleMonthCount = (count: number) => {
    const newCount = Math.max(0, count);
    setMonthCount(newCount);
    setState((prevState) => ({
      ...prevState,
      payedAmount: 10000 * newCount,
    }));
  };

  const handlePayedAmountChange = (value: number) => {
    setState((prevState) => ({
      ...prevState,
      payedAmount: value,
    }));
  };
  return (
    <div className="mb-3">
      <label htmlFor="kas_payed" className="block mb-2">
        Payed Amount
      </label>
      <div className="flex gap-3 items-center">
        <button
          type="button"
          onClick={() => handleMonthCount(monthCount - 1)}
          className={cn(
            "hover:scale-105 relative w-10 py-2 px-3 text-white font-bold rounded-lg shadow-lg duration-300 ease-in-out hover:shadow-[0_0_15px_5px_rgba(220,38,38,0.2)] focus:shadow-[0_0_15px_5px_rgba(220,38,38,0.4)]",
            glassmorphism({ container: true, hover: true }),
          )}
        >
          -
        </button>
        <span className="px-4">{monthCount} Month</span>
        <button
          type="button"
          onClick={() => handleMonthCount(monthCount + 1)}
          className={cn(
            "hover:scale-105 relative w-10 py-2 px-3 text-white font-bold rounded-lg shadow-lg duration-300 ease-in-out focus:shadow-[0_0_15px_5px_rgba(59,130,246,0.4)] hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.2)]",
            glassmorphism({ container: true, hover: true }),
          )}
        >
          +
        </button>
        <p className="text-green-600 mt-auto mb-auto flex gap-3">
          Rp.
          <input
            type="text"
            name="kas_payed"
            value={state.payedAmount}
            onChange={(e) =>
              handlePayedAmountChange(parseInt(e.target.value) || 0)
            }
            className={`outline outline-offset-1 outline-none w-sm w-20 border-bottom rounded-lg text-md bg-transparent ${glassmorphism({ hover: true })}`}
          />
          , -
        </p>
      </div>
      {errors.payedAmount && (
        <div className="text-red-600 mb-3 mt-1">{errors.payedAmount}</div>
      )}
    </div>
  );
};
export default PayedAmount;
