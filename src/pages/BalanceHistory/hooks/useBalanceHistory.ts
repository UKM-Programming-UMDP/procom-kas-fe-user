import BalanceHistoryServices from "@services/balanceHistory";
import { useBalanceHistoryContext } from "../context";
import { FilterType, PaginationType } from "@types";
import { balanceHistoryFormatter } from "@utils/formatter";

type BalanceHistoryParams = {
  limit?: PaginationType["limit"];
  page?: PaginationType["page"];
  order_by?: FilterType["order_by"];
  sort?: FilterType["sort"];
};

interface HookReturn {
  balanceHistoryService: BalanceHistoryServices;
  fetchBalanceHistory: (params: BalanceHistoryParams) => void;
  handleOrderByFilter: () => void;
}
const useBalanceHistory = (): HookReturn => {
  const { state, setState } = useBalanceHistoryContext();
  const balanceHistoryService = new BalanceHistoryServices();

  const fetchBalanceHistory = async ({
    limit = state.pagination?.limit ?? 10,
    page = state.pagination?.page ?? 1,
    order_by = state.filter?.order_by ?? "desc",
    sort = state.filter?.sort ?? "created_at",
  }: BalanceHistoryParams) => {
    setState((prev) => ({ ...prev, balanceHistoryLoading: true }));

    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      order_by,
      sort,
    });

    const res = await balanceHistoryService.get(params.toString());

    if (!res || !res.status) {
      setState((prev) => ({ ...prev, balanceHistoryLoading: false }));
      // handle error
      return;
    }

    const formattedBalanceHistoryData = res.data.map(balanceHistoryFormatter);

    setState((prev) => ({
      ...prev,
      balanceHistoryLoading: false,
      filter: {
        ...prev.filter,
        order_by,
        sort,
      },
      pagination: {
        page: res.pagination?.page ?? page,
        limit: res.pagination?.limit ?? limit,
        total_items: res.pagination?.total_items ?? 0,
        total_pages: res.pagination?.total_pages ?? 1,
      },
      balanceHistory: formattedBalanceHistoryData,
    }));

    if (formattedBalanceHistoryData.length === 0 && page > 1) {
      fetchBalanceHistory({
        limit,
        page: 1,
        order_by,
        sort,
      });
    }
  };

  const handleOrderByFilter = () => {
    fetchBalanceHistory({
      order_by: state.filter?.order_by === "desc" ? "asc" : "desc",
    });
  };

  return {
    balanceHistoryService,
    fetchBalanceHistory,
    handleOrderByFilter,
  };
};

export default useBalanceHistory;
