import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextAutosizeProps {
  children: ReactNode;
  initialSize: string;
  targetSize: string;
  trigger: boolean;
  duration?: number;
  className?: string;
}
const TextAutosize = (props: TextAutosizeProps) => {
  const {
    children,
    initialSize,
    targetSize,
    trigger,
    duration = 0.4,
    className,
  } = props;

  return (
    <motion.div
      initial={{ fontSize: initialSize }}
      animate={{ fontSize: trigger ? targetSize : initialSize }}
      transition={{ duration: duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default TextAutosize;
