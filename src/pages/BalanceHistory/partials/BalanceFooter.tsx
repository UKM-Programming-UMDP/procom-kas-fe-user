import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { useBalanceHistoryContext } from "../context";
import useBalanceHistory from "../hooks/useBalanceHistory";
import { cn } from "@utils/index";
import glassmorphism from "@utils/glassmorphism";

const BalanceFooter = () => {
  const { state } = useBalanceHistoryContext();
  const { fetchBalanceHistory } = useBalanceHistory();
  const limits = [5, 10, 15, 20, 25, 50];

  const handleLimitFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchBalanceHistory({ limit: Number(e.target.value) });
  };

  const handlePageFilter = (page: number) => {
    fetchBalanceHistory({ page });
  };

  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      {!state.balanceHistoryLoading && (
        <div className="flex justify-between px-1">
          <div>
            <select
              defaultValue={state.pagination?.limit}
              className={cn(
                glassmorphism({ container: true, hover: true }),
                "py-2 px-3 font-bold outline-none rounded-md",
              )}
              onChange={handleLimitFilter}
            >
              {limits.map((limit) => (
                <option key={limit} value={limit} className="text-black">
                  {limit}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            {Array.from({
              length: state.pagination?.total_pages || 0,
            }).map((_, index) => (
              <button
                disabled={state.pagination?.page === index + 1}
                key={index}
                onClick={() => handlePageFilter(index + 1)}
                className={cn(
                  state.pagination?.page === index + 1
                    ? `${glassmorphism({ border: true })}`
                    : `${"hover:scale-105"} ${glassmorphism({ hover: true })}`,
                  "py-2 px-3 font-bold rounded-md",
                  glassmorphism({ container: true }),
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </AppearFadeIn>
  );
};

export default BalanceFooter;
