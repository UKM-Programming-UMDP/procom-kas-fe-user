import AppearGrow from "@components/Animation/AppearGrow";
import { CircularProgress } from "@mui/material";
import { useBalanceHistoryContext } from "../context";

const BalanceBody = () => {
  const { state: balanceHistoryState } = useBalanceHistoryContext();
  return (
    <AppearGrow direction="x" trigger>
      {balanceHistoryState.balanceHistoryLoading ? (
        <CircularProgress size="2rem" />
      ) : (
        (() => {
          let lastDate = "";
          return (
            <div className="flex flex-col gap-3 bg-slate-800 p-2 rounded-md">
              <div>Balance History</div>
              {balanceHistoryState.balanceHistory.map((item, index) => {
                const currentDate = item.created_at.split("at")[0];
                const isNewDate = currentDate !== lastDate;
                lastDate = currentDate;

                return (
                  <div key={index}>
                    {isNewDate && <h2>{currentDate}</h2>}
                    {item.user.npm} - {item.amount}
                  </div>
                );
              })}
            </div>
          );
        })()
      )}
    </AppearGrow>
  );
};

export default BalanceBody;
