import AppearGrow from "@components/Animation/AppearGrow";
import { useBalanceHistoryContext } from "../context";
import { cn } from "@utils/cn";
import glassmorphism from "@utils/glassmorphism";
import _ from "lodash";
import { BalanceHistoryType } from "@services/balanceHistory";

const BalanceBodyTable = () => {
  const { state } = useBalanceHistoryContext();
  const tableMap = [
    ["Amount", "amount"],
    ["Previous Balance", "prev_balance"],
    ["NPM", "user.npm"],
    ["Name", "user.name"],
    ["Activity", "activity"],
    ["Note", "note"],
    ["Date", "created_at"],
  ];

  const getCellValue = (item: BalanceHistoryType, path: string) => {
    if (path === "amount" || path === "prev_balance") {
      return `Rp ${item[path].toLocaleString().replace(/,/g, ".")},-`;
    } else if (
      path === "created_at" &&
      item.created_at !== "Today" &&
      item.created_at !== "Yesterday"
    ) {
      return item.created_at.split("at")[0];
    } else {
      return _.get(item, path);
    }
  };

  return (
    <AppearGrow trigger direction="x">
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="font-semibold">
            {tableMap.map(([header]) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={cn(
            "divide-y divide-gray-200",
            glassmorphism({ container: true }),
          )}
        >
          {state.balanceHistory.map((item, index) => (
            <tr key={index}>
              {tableMap.map(([, path]) => (
                <td key={path} className="px-6 py-4 whitespace-nowrap">
                  {getCellValue(item, path)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </AppearGrow>
  );
};

export default BalanceBodyTable;
