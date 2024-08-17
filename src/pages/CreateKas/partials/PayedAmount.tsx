import React, { useState, useEffect } from "react";
import { cn } from "@utils/index";
import glassmorphism from "@utils/glassmorphism";
import { Controller, useFormContext } from "react-hook-form";

const PayedAmount: React.FC = () => {
  const [monthCount, setMonthCount] = useState<number>(0);
  const { control, setValue, getValues, trigger } = useFormContext();

  const handleMonthCount = (count: number) => {
    const newCount = Math.max(0, count);
    setMonthCount(newCount);
    const newPayedAmount = 10000 * newCount;

    setValue("payed_amount", newPayedAmount);
    trigger("payed_amount");
  };

  const handlePayedAmountChange = (value: number) => {
    setValue("payed_amount", value);
    trigger("payed_amount");
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
        <Controller
          name="payed_amount"
          control={control}
          defaultValue={0}
          render={({ field, fieldState }) => (
            <div className="block">
              <div className="text-green-600 mt-auto mb-auto flex gap-3">
                Rp.
                <input
                  type="text"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    field.onChange(e);
                    handlePayedAmountChange(value);
                  }}
                  className={`outline outline-offset-1 outline-none w-sm w-20 border-bottom rounded-lg text-md bg-transparent ${glassmorphism({ hover: true })}`}
                />
                , -
              </div>
              <div className="text-red-500 text-sm mt-1">
                {fieldState.error?.message}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PayedAmount;
