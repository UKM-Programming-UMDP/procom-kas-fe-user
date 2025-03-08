import { useState } from "react";

interface HookReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useDialog = (): HookReturn => {
  const [isOpen, setOpen] = useState(false);

  return {
    isOpen,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false)
  };
};

export default useDialog;
export type { HookReturn as UseDialogReturn };
