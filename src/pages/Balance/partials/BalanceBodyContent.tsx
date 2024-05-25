import AppearGrow from "@components/Animation/AppearGrow";
import { useBalanceContext } from "../context";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { cn } from "@utils/cn";
import glassmorphism from "@utils/glassmorphism";
import useFormatAmount from "../hooks/useFormatAmount";

const BalanceBodyContent = () => {
  const { state } = useBalanceContext();
  const formatAmount = useFormatAmount();
  return (
    <AppearGrow trigger direction="x">
      {state.balanceHistory.map((item, index) => (
        <AppearFadeIn key={index} direction="bottom" delay={0.2 * index}>
          <div
            className={cn(
              "p-4 flex justify-between group",
              glassmorphism({ hover: true }),
            )}
          >
            <div className="flex flex-col">
              <span>
                {item.user.name} ({item.user.npm})
              </span>
              <span>{item.note}</span>
            </div>
            <div className="flex flex-col text-right">
              <span
                className={cn(
                  "font-medium ",
                  item.amount > 0
                    ? "text-green-500 group-hover:text-green-400"
                    : item.amount < 0
                      ? "text-red-500 group-hover:text-red-400"
                      : "text-gray-300",
                )}
              >
                {formatAmount(item.amount)}
              </span>
              <span>{item.created_at}</span>
            </div>
          </div>
          {index !== state.balanceHistory.length - 1 && <hr />}
        </AppearFadeIn>
      ))}
    </AppearGrow>
  );
};

export default BalanceBodyContent;
