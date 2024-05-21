import AppearGrow from "@components/Animation/AppearGrow";
import { useBalanceContext } from "../context";
import AppearFadeIn from "@components/Animation/AppearFadeIn";

const BalanceBodyTable = () => {
  const { state } = useBalanceContext();
  const theads = [
    "Amount",
    "Previous Balance",
    "NPM",
    "Name",
    "Activity",
    "Note",
    "Date",
  ];
  return (
    <AppearGrow trigger direction="x">
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="font-semibold">
            {theads.map((thead, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider"
              >
                {thead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white text-gray-500 divide-y divide-gray-200">
          {state.balanceHistory.map((item, index) => (
            <tr key={index}>
              <AppearFadeIn direction="bottom" delay={0.1 * index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  Rp {item.amount.toLocaleString().replace(/,/g, ".")}
                  ,-
                </td>
              </AppearFadeIn>

              <td className="px-6 py-4 whitespace-nowrap">
                Rp {item.prev_balance.toLocaleString().replace(/,/g, ".")}
                ,-
              </td>

              <td className="px-6 py-4 whitespace-nowrap">{item.user.npm}</td>

              <td className="px-6 py-4 whitespace-nowrap">{item.user.name}</td>

              <td className="px-6 py-4 whitespace-nowrap">{item.activity}</td>

              <td className="px-6 py-4 whitespace-nowrap">{item.note}</td>

              <td className="px-6 py-4 whitespace-nowrap">
                {item.created_at !== "Today" && item.created_at !== "Yesterday"
                  ? item.created_at.split("at")[0]
                  : item.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppearGrow>
  );
};

export default BalanceBodyTable;
