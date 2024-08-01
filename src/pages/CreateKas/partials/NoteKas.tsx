import React, { useEffect } from "react";
import glassmorphism from "@utils/glassmorphism";
import { useCreateKasContext } from "@pages/CreateKas/context/index";
import useCreateKasSubmission from "../hooks/useCreateKasSubmission";
import QuickNote from "./QuickNote";
const Note = () => {
  const { state, setState } = useCreateKasContext();
  const { errors } = useCreateKasSubmission();
  useEffect(() => {
    const storedNote = localStorage.getItem("note");
    if (storedNote) {
      setState((prevState) => ({
        ...prevState,
        note: storedNote,
      }));
    }
  }, [setState]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
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
        <textarea
          name="note"
          value={state.note}
          onChange={handleInputChange}
          className={`shadow-lg outline-none text-white w-full px-3 py-2 rounded-lg text-md text-black ${glassmorphism(
            {
              container: true,
              hover: true,
            },
          )}`}
        />
        {errors.note && (
          <div className="text-red-600 mt-1 mb-2">{errors.note}</div>
        )}
      </div>
      <QuickNote />
    </>
  );
};

export default Note;
