import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { useBalanceHistoryContext } from "../context";
import useBalanceHistory from "../hooks/useBalanceHistory";
import { cn } from "@utils/cn";
import {
  glassmorphismContainer,
  glassmorphismContainerBorder,
  glassmorphismContainerHover,
} from "@utils/glassmorphism";

const BalanceFooter = () => {
  const { state } = useBalanceHistoryContext();
  const { fetchBalanceHistory } = useBalanceHistory();
  const limits = [5, 10, 15, 20, 25, 50];
  return (
    <AppearFadeIn direction="bottom" delay={0.8}>
      {!state.balanceHistoryLoading && (
        <div className="flex justify-between px-1">
          <div>
            <select
              defaultValue={state.filter.limit}
              className={cn(
                glassmorphismContainer(),
                glassmorphismContainerHover(),
                "py-2 px-3 font-bold outline-none rounded-md",
              )}
              onChange={(e) =>
                fetchBalanceHistory({ limit: Number(e.target.value) })
              }
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
              length: state.pagination.total_pages || 0,
            }).map((_, index) => (
              <button
                disabled={state.filter.page === index + 1}
                key={index}
                onClick={() => fetchBalanceHistory({ page: index + 1 })}
                className={cn(
                  state.filter.page === index + 1
                    ? `${glassmorphismContainerBorder()}`
                    : `${"hover:scale-105"} ${glassmorphismContainerHover()}`,
                  "py-2 px-3 font-bold rounded-md",
                  glassmorphismContainer(),
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
