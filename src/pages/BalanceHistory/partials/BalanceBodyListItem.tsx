import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { BalanceHistoryType } from "@services/balanceHistory";
import { cn } from "@utils/cn";
import glassmorphism from "@utils/glassmorphism";
import useFormatAmount from "../hooks/useFormatAmount";

type BalanceBodyListItemProps = {
  item: BalanceHistoryType;
  index: number;
  isNewDate: boolean;
  firstNewDate: boolean;
  currentDate: string;
};

const BalanceBodyListItem = ({
  item,
  index,
  isNewDate,
  firstNewDate,
  currentDate,
}: BalanceBodyListItemProps) => {
  const formatAmount = useFormatAmount();

  return (
    <AppearFadeIn key={index} direction="bottom" delay={0.1 * index}>
      {isNewDate && (
        <div
          className={cn("p-4 font-semibold", firstNewDate && "rounded-t-md")}
        >
          {currentDate}
        </div>
      )}
      <div
        className={cn(
          "p-4 flex justify-between group",
          glassmorphism({ container: true, hover: true }),
        )}
      >
        <div className="flex flex-col gap-1 font-medium group-hover:text-gray-300">
          <div>
            {item.user.name} - {item.user.npm}
          </div>
          <div>{item.note}</div>
        </div>
        <div className="flex flex-col gap-1 text-end">
          <div>
            <div className="text-gray-500 font-medium group-hover:text-gray-400">
              Rp {item.prev_balance.toLocaleString().replace(/,/g, ".")}
              ,-
            </div>
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
          </div>
          <div className="group-hover:text-gray-300">
            {item.created_at.split("at")[1]}
          </div>
        </div>
      </div>
      <hr />
    </AppearFadeIn>
  );
};

export default BalanceBodyListItem;
