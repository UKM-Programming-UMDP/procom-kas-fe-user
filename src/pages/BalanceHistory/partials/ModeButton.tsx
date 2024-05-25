import glassmorphism from "@utils/glassmorphism";
import { useBalanceHistoryContext } from "../context";
import { cn } from "@utils/cn";

type ModeButtonMode = "list" | "table" | "chart";
type ModeButtonProps = {
  mode: ModeButtonMode;
  currentMode: "list" | "table" | "chart";
  children: React.ReactNode;
};

const ModeButton = ({ mode, currentMode, children }: ModeButtonProps) => {
  const { state, setState } = useBalanceHistoryContext();

  return (
    <button
      disabled={currentMode === mode}
      className={cn(
        "py-1 px-2",
        currentMode === mode
          ? glassmorphism({ border: true })
          : `${"hover:scale-105"} ${glassmorphism({ container: true, hover: true })}`,
        mode === "list" && "rounded-s-md",
        mode === "chart" && "rounded-e-md",
      )}
      onClick={() => setState({ ...state, mode })}
    >
      {children}
    </button>
  );
};

export type { ModeButtonMode };
export default ModeButton;
