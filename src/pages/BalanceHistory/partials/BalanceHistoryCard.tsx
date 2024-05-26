import { BalanceHistoryType } from "@services/balanceHistory";
import { cn } from "@utils/index";
import { amountFormatter } from "@utils/formatter";
import glassmorphism from "@utils/glassmorphism";

interface Props {
  history: BalanceHistoryType;
}
const BalanceHistoryCard = (props: Props) => {
  const { history } = props;

  return (
    <div
      className={cn(
        "p-4 flex justify-between group",
        glassmorphism({ container: true, hover: true }),
      )}
    >
      <div className="flex flex-col gap-1 font-medium">
        <span>
          {history.user.name} - {history.user.npm}
        </span>
        <span>{history.note}</span>
      </div>
      <div className="flex flex-col text-end">
        <span className="text-gray-300/70 font-medium">
          Rp {history.prev_balance.toLocaleString().replace(/,/g, ".")}
          ,-
        </span>
        <span
          className={cn(
            "font-medium mb-1 ",
            history.amount > 0
              ? "text-green-500 group-hover:text-green-400"
              : history.amount < 0
                ? "text-red-500 group-hover:text-red-400"
                : "text-gray-300",
          )}
        >
          {amountFormatter(history.amount)}
        </span>
        <span>{history.created_at.split("at")[1]}</span>
      </div>
    </div>
  );
};

export default BalanceHistoryCard;
