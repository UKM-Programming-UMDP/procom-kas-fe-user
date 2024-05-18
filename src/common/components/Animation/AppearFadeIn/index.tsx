import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface AppearFadeInProps {
  children: ReactNode;
  className?: string;
  trigger?: boolean;
  duration?: number;
  delay?: number;
  direction?: "top" | "bottom" | "left" | "right";
  offset?: number;
}
const AppearFadeIn = (props: AppearFadeInProps) => {
  const {
    children,
    trigger = true,
    duration = 0.4,
    delay = 0,
    direction,
    offset = 10,
    className,
  } = props;

  const getInitialPosition = () => {
    switch (direction) {
      case "top":
        return { y: -offset, opacity: 0 };
      case "bottom":
        return { y: offset, opacity: 0 };
      case "left":
        return { x: -offset, opacity: 0 };
      case "right":
        return { x: offset, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className={className}
          initial={getInitialPosition()}
          animate={{ x: 0, y: 0, opacity: 1, transition: { delay } }}
          exit={{ x: 0, y: 0, opacity: 0 }}
          transition={{ duration }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppearFadeIn;
