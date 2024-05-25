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
      {state.balanceHistory.map((item, index) => {
        return (
          <AppearFadeIn key={index} direction="bottom" delay={0.1 * index}>
            <div
              className={cn(
                "p-4 flex justify-between group",
                glassmorphism({ hover: true }),
              )}
            >
              <div className="flex items-center gap-4 font-medium group-hover:text-gray-300">
                <div>
                  {item.user.name} ({item.user.npm})<div>{item.note}</div>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-end">
                <div
                  className={cn(
                    "font-medium ",
                    item.amount > 0
                      ? "text-green-500 group-hover:text-green-600"
                      : item.amount < 0
                        ? "text-red-500 group-hover:text-red-600"
                        : "text-gray-300",
                  )}
                >
                  {formatAmount(item.amount)}
                </div>
                <div className="group-hover:text-gray-300">
                  {item.created_at}
                </div>
              </div>
            </div>
            {index !== state.balanceHistory.length - 1 && <hr />}
          </AppearFadeIn>
        );
      })}
    </AppearGrow>
  );
};

export default BalanceBodyContent;
