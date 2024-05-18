import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AutoMarginProps {
  children: ReactNode;
  className?: string;
  trigger: boolean;
  initial: {
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
  };
  animate: {
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
  };
}
const AutoMargin = (props: AutoMarginProps) => {
  const { children, className, trigger, initial, animate } = props;

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={trigger ? animate : initial}
    >
      {children}
    </motion.div>
  );
};

export default AutoMargin;
