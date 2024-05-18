import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardAutosizeProps {
  children: ReactNode;
  className?: string;
  trigger: boolean;
  initialSize: { width?: string; height?: string };
  animateSize: { width?: string; height?: string };
  duration?: number;
}
const CardAutosize = (props: CardAutosizeProps) => {
  const {
    children,
    className,
    trigger,
    initialSize,
    animateSize,
    duration = 0.4,
  } = props;

  const sizeVariants = {
    initial: {
      maxWidth: initialSize.width,
      maxHeight: initialSize.height,
      width: "100%",
      height: "100%",
    },
    animate: {
      maxWidth: animateSize.width,
      maxHeight: animateSize.height,
      width: "100%",
      height: "100%",
    },
  };

  return (
    <motion.div
      initial={false}
      className={className}
      animate={trigger ? "animate" : "initial"}
      variants={sizeVariants}
      transition={{ duration: duration }}
      layout
    >
      <div className="h-auto w-full rounded-md border border-zinc-800/20 bg-zinc-800/60 text-white shadow-lg">
        {children}
      </div>
    </motion.div>
  );
};

export default CardAutosize;
