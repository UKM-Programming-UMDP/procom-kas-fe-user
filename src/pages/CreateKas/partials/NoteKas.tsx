import React, { useEffect } from "react";
import glassmorphism from "@utils/glassmorphism";
import { Controller, useFormContext } from "react-hook-form";
import { useLocalStorage } from "@utils/localStorage";
import QuickNoteOptions from "./QuickNoteOptions";

const NoteKas: React.FC = () => {
  const { control, setValue } = useFormContext();
  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {
    setValue("note", getItem("note"));
  }, [setValue, getItem]);

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
                  setItem("note", e.target.value);
                }}
                className={`shadow-lg outline-none  w-full px-3 py-2 rounded-lg text-md text-white ${glassmorphism(
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
      <QuickNoteOptions />
    </>
  );
};

export default NoteKas;
