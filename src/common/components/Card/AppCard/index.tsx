import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AppCardProps {
  displayName: string;
  icon: ReactNode;
  onClick: () => void;
  delay?: number;
  className?: string;
}
const AppCard = (props: AppCardProps) => {
  const { displayName, icon, onClick, delay = 0, className } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay, duration: 0.4 }}
      className={`w-20 flex hover:scale-105 transition-all hover:drop-shadow-sm duration-200 ${className}`}
    >
      <button onClick={onClick} className="cursor-pointer mx-auto h-fit">
        <div className="w-fit mx-auto px-3 bg-zinc-800/80 p-2.5 rounded-xl shadow-sm flex flex-col items-center">
          <div>{icon}</div>
        </div>
        <span className="font-sans drop-shadow-md text-center block w-full">
          {displayName}
        </span>
      </button>
    </motion.div>
  );
};

export default AppCard;
