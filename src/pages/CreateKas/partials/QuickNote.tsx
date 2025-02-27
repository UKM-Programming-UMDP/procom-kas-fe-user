import React from "react";
import { useCreateKasContext } from "@pages/CreateKas/context/index";
import glassmorphism from "@utils/glassmorphism";
import { useFormContext } from "react-hook-form";
import { useLocalStorage } from "@utils/localStorage";

const QuickNote: React.FC = () => {
  const { state } = useCreateKasContext();
  const { setValue } = useFormContext();
  const { predefinedNotes } = state;
  const { setItem, getItem } = useLocalStorage();

  const handleQuickNote = (key: keyof typeof predefinedNotes) => {
    const note = predefinedNotes[key];
    setItem("note", note);
    setValue("note", getItem("note"));
  };

  return (
    <div className="mb-3 w-full overflow-x-auto">
      <div className="flex gap-4 snap-x snap-mandatory scroll-smooth outline-none">
        {Object.keys(predefinedNotes).map((key) => (
          <div
            key={key}
            onClick={() => handleQuickNote(key as keyof typeof predefinedNotes)}
            className={`cursor-pointer shadow-lg rounded-lg px-3 py-2 snap-center shrink-0 text-center ${glassmorphism(
              {
                container: true,
                hover: true,
              },
            )} w-full max-w-[200px]`}
          >
            {predefinedNotes[key as keyof typeof predefinedNotes]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickNote;
