import BalanceHistoryServices from "@services/balanceHistory";
import { useBalanceHistoryContext } from "../context";
import { FilterType } from "@types";
import { formatBalanceHistoryData } from "@utils/formatBalanceHistoryData";

interface HookReturn {
  balanceHistoryService: BalanceHistoryServices;
  fetchBalanceHistory: ({ limit, page, order_by, sort }: FilterType) => void;
}
const useBalanceHistory = (): HookReturn => {
  const { state, setState } = useBalanceHistoryContext();
  const balanceHistoryService = new BalanceHistoryServices();

  const fetchBalanceHistory = async ({
    limit = state.filter.limit ?? 10,
    page = state.filter.page ?? 1,
    order_by = state.filter.order_by ?? "desc",
    sort = state.filter.sort ?? "created_at",
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
      filter: {
        ...prev.filter,
        page,
        limit,
        order_by,
        sort,
      },
      pagination: {
        total_items: res.pagination?.total_items ?? 0,
        total_pages: res.pagination?.total_pages ?? 1,
      },
      balanceHistory: formattedBalanceHistoryData,
    }));

    if (formattedBalanceHistoryData.length === 0 && page > 1) {
      fetchBalanceHistory({ limit, page: 1, order_by, sort });
    }
  };

  return {
    balanceHistoryService,
    fetchBalanceHistory,
  };
};

export default useBalanceHistory;
