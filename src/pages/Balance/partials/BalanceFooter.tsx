import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { useBalanceContext } from "../context";
import useBalanceHistory from "../hooks/useBalanceHistory";
import { cn } from "@utils/cn";

const BalanceFooter = () => {
  const { state } = useBalanceContext();
  const { fetchBalanceHistory } = useBalanceHistory();
  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      {!state.balanceHistoryLoading && (
        <div className="flex justify-between px-1">
          <div>
            <select
              defaultValue={state.pagination.limit}
              className="py-2 px-3 font-bold outline-none bg-slate-800 hover:bg-slate-700 transition-all rounded-md"
              onChange={(e) =>
                fetchBalanceHistory(
                  Number(e.target.value),
                  state.pagination.page,
                  state.pagination.order_by,
                  state.pagination.sort,
                )
              }
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex gap-3">
            {Array.from({ length: state.pagination.total_pages || 0 }).map(
              (_, index) => (
                <button
                  disabled={state.pagination.page === index + 1}
                  key={index}
                  onClick={() =>
                    fetchBalanceHistory(
                      state.pagination.limit,
                      index + 1,
                      state.pagination.order_by,
                      state.pagination.sort,
                    )
                  }
                  className={cn(
                    state.pagination.page === index + 1
                      ? "bg-slate-900 border border-white"
                      : "bg-slate-800 hover:bg-slate-700 hover:scale-105 transition-all",
                    "py-2 px-3 font-bold rounded-md",
                  )}
                >
                  {index + 1}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </AppearFadeIn>
  );
};

export default BalanceFooter;
