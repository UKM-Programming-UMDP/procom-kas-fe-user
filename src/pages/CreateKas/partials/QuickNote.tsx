import { useRef, useEffect } from "react";
import { useCreateKasContext } from "@pages/CreateKas/context/index";
import glassmorphism from "@utils/glassmorphism";
const QuickNote = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, setState } = useCreateKasContext();
  const { predefinedNotes } = state;
  useEffect(() => {
    const container = containerRef.current;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDownHandler = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - (container?.offsetLeft || 0);
      scrollLeft = container?.scrollLeft || 0;
    };

    const mouseLeaveHandler = () => {
      isDown = false;
    };

    const mouseUpHandler = () => {
      isDown = false;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - (container?.offsetLeft || 0);
      const walk = (x - startX) * 2;
      if (container) {
        container.scrollLeft = scrollLeft - walk;
      }
    };

    if (container) {
      container.addEventListener("mousedown", mouseDownHandler);
      container.addEventListener("mouseleave", mouseLeaveHandler);
      container.addEventListener("mouseup", mouseUpHandler);
      container.addEventListener("mousemove", mouseMoveHandler);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousedown", mouseDownHandler);
        container.removeEventListener("mouseleave", mouseLeaveHandler);
        container.removeEventListener("mouseup", mouseUpHandler);
        container.removeEventListener("mousemove", mouseMoveHandler);
      }
    };
  }, []);
  const handleQuickNote = (key: keyof typeof predefinedNotes) => {
    const note = predefinedNotes[key];
    setState((prevState) => ({
      ...prevState,
      note,
    }));
    localStorage.setItem("note", note);
  };
  return (
    <div
      ref={containerRef}
      className="mb-3 flex gap-6 text-white snap-x overflow-x-auto max-h-[100px] w-full flex-nowrap"
    >
      {Object.keys(predefinedNotes).map((key) => (
        <div
          key={key}
          onClick={() => handleQuickNote(key as keyof typeof predefinedNotes)}
          className={`cursor-pointer shadow-lg rounded-lg px-3 py-2 snap-center shrink-0 text-center ${glassmorphism({ container: true, hover: true })} w-full max-w-[200px]`}
        >
          {predefinedNotes[key as keyof typeof predefinedNotes]}
        </div>
      ))}
    </div>
  );
};
export default QuickNote;
