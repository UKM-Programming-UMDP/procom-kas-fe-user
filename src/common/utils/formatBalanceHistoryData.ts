import { BalanceHistoryType } from "@services/balanceHistory";
import { formatDate } from "./formatDate";

export const formatBalanceHistoryData = (
  balanceHistory: BalanceHistoryType,
) => {
  const formattedDate = formatDate(balanceHistory.created_at);
  return {
    ...balanceHistory,
    prev_balance: balanceHistory.prev_balance ?? 0,
    user: {
      name: balanceHistory.user.name ?? "Anonymous",
      npm: balanceHistory.user.npm ?? "000000000",
    },
    created_at: formattedDate,
  };
};
