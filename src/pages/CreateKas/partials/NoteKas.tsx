import React, { useEffect } from "react";
import glassmorphism from "@utils/glassmorphism";
import { useCreateKasContext } from "@pages/CreateKas/context/index";
import QuickNote from "./QuickNote";
import { Controller, useFormContext } from "react-hook-form";
import { LocalStorage } from "@utils/localStorage";

const Note: React.FC = () => {
  const { control, setValue, getValues } = useFormContext();
  const { setItem, getItem } = LocalStorage("note");

  // Initialize the form value from local storage on component mount
  useEffect(() => {
    const storedNote = getItem();
    if (storedNote) {
      setValue("note", storedNote);
    }
  }, [setValue, getItem]);

  // Update local storage whenever the form value changes
  const handleInputChange = (value: string) => {
    setItem(value);
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="note" className="block mb-2">
          Note
        </label>
        <Controller
          name="note"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <>
              <textarea
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(e.target.value);
                }}
                className={`shadow-lg outline-none text-white w-full px-3 py-2 rounded-lg text-md text-black ${glassmorphism(
                  {
                    container: true,
                    hover: true,
                  },
                )}`}
              />
              {fieldState.error && (
                <div className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </div>
              )}
            </>
          )}
        />
      </div>
      <QuickNote />
    </>
  );
};

export default Note;
