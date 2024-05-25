import { BalanceHistoryType } from "@services/balanceHistory";
import { cn } from "@utils/cn";
import glassmorphism from "@utils/glassmorphism";
import useBalanceHistory from "../hooks/useBalanceHistory";

interface Props {
  history: BalanceHistoryType;
}
const BalanceHistoryCard = (props: Props) => {
  const { history } = props;
  const { amountFormatter } = useBalanceHistory();

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
        <span className="text-gray-500 font-medium">
          Rp {history.prev_balance.toLocaleString().replace(/,/g, ".")}
          ,-
        </span>
        <span
          className={cn(
            "font-medium mb-1 ",
            history.amount > 0
              ? "text-green-500 group-hover:text-green-600"
              : history.amount < 0
                ? "text-red-500 group-hover:text-red-600"
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
