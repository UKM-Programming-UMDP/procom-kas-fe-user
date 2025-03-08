import React from "react";
import { useCreateKasContext } from "@pages/CreateKas/context/index";
import glassmorphism from "@utils/glassmorphism";
import { useFormContext } from "react-hook-form";
import { useLocalStorage } from "@utils/localStorage";

const QuickNoteOptions: React.FC = () => {
  const { state } = useCreateKasContext();
  const { setValue } = useFormContext();
  const { listNoteOptions } = state;
  const { setItem, getItem } = useLocalStorage();

  const handleQuickNoteOptions = (key: number) => {
    const note = listNoteOptions[key];
    setItem("note", note);
    setValue("note", getItem("note"));
  };

  return (
    <div className="mb-3 w-full overflow-x-auto">
      <div className="flex gap-4 snap-x snap-mandatory scroll-smooth outline-none">
        {listNoteOptions.map((data, key) => (
          <div
            key={key}
            onClick={() => handleQuickNoteOptions(key)}
            className={`cursor-pointer shadow-lg rounded-lg px-3 py-2 snap-center shrink-0 text-center ${glassmorphism(
              {
                container: true,
                hover: true,
              },
            )} w-full max-w-[200px]`}
          >
            {data}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickNoteOptions;
