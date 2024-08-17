import React, { useEffect } from "react";
import glassmorphism from "@utils/glassmorphism";
import { useCreateKasContext } from "@pages/CreateKas/context/index";
import QuickNote from "./QuickNote";
import { Controller, useFormContext } from "react-hook-form";

const Note: React.FC = () => {
  const { state, setState } = useCreateKasContext();
  const { control, setValue } = useFormContext();

  useEffect(() => {
    const storedNote = localStorage.getItem("note");
    if (storedNote) {
      setValue("note", storedNote);
      setState((prevState) => ({
        ...prevState,
        note: storedNote,
      }));
    }
  }, [setValue, setState]);

  const handleInputChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      note: value,
    }));
    localStorage.setItem("note", value);
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
          defaultValue="note"
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
