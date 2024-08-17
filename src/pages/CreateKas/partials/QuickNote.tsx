import React from "react";
import { useCreateKasContext } from "@pages/CreateKas/context/index";
import glassmorphism from "@utils/glassmorphism";
import { useFormContext } from "react-hook-form";

const QuickNote: React.FC = () => {
  const { state, setState } = useCreateKasContext();
  const { setValue } = useFormContext();
  const { predefinedNotes } = state;

  const handleQuickNote = (key: keyof typeof predefinedNotes) => {
    const note = predefinedNotes[key];
    setState((prevState) => ({
      ...prevState,
      note,
    }));
    localStorage.setItem("note", note);
    setValue("note", note);
  };

  return (
    <div className="mb-3 w-full overflow-x-auto">
      <div className="flex gap-4 snap-x snap-mandatory scroll-smooth">
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
