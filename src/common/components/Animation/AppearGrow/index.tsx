import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface AppearGrowProps {
  children: ReactNode;
  className?: string;
  trigger: boolean;
  direction: "x" | "y";
  duration?: number;
}
const AppearGrow = (props: AppearGrowProps) => {
  const { children, direction, trigger, duration = 0.4 } = props;

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          initial={{ [direction]: 0, opacity: 0 }}
          animate={{ [direction]: "auto", opacity: 1 }}
          exit={{ [direction]: 0, opacity: 0 }}
          transition={{ duration: duration }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppearGrow;
