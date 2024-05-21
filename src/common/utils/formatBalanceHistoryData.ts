import { GetResponse as BalanceHistoryType } from "@services/balanceHistory";
import { formatDate } from "./formatDate";

export const formatBalanceHistoryData = (item: BalanceHistoryType[0]) => {
  const date = new Date(item.created_at);
  const formattedDate = formatDate(date);
  return {
    ...item,
    prev_balance: item.prev_balance ?? 0,
    user: {
      name: item.user.name ?? "Anonymous",
      npm: item.user.npm ?? "000000000",
    },
    created_at: formattedDate,
  };
};
