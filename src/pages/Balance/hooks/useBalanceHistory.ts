import BalanceHistoryServices from "@services/balanceHistory";
import { useBalanceContext } from "../context";
import { FilterType } from "@types";
import { formatBalanceHistoryData } from "@utils/formatBalanceHistoryData";

interface HookReturn {
  balanceHistoryService: BalanceHistoryServices;
  fetchBalanceHistory: ({ limit, page, order_by, sort }: FilterType) => void;
}
const useBalanceHistory = (): HookReturn => {
  const { setState } = useBalanceContext();
  const balanceHistoryService = new BalanceHistoryServices();

  const fetchBalanceHistory = async ({
    limit = 10,
    page = 1,
    order_by = "desc",
    sort = "created_at",
  }: FilterType) => {
    setState((prev) => ({ ...prev, balanceHistoryLoading: true }));
    const res = await balanceHistoryService.get({
      limit,
      page,
      order_by,
      sort,
    });
    if (!res) {
      setState((prev) => ({ ...prev, balanceHistoryLoading: false }));
      // handle error
      return;
    }

    const formattedBalanceHistoryData = res.data.map(formatBalanceHistoryData);

    setState((prev) => ({
      ...prev,
      balanceHistoryLoading: false,
      pagination: {
        ...prev.pagination,
        total_items: res.pagination?.total_items ?? 0,
        total_pages: res.pagination?.total_pages ?? 1,
      },
      balanceHistory: formattedBalanceHistoryData,
    }));
  };

  return {
    balanceHistoryService,
    fetchBalanceHistory,
  };
};

export default useBalanceHistory;
