import { useBalanceHistoryContext } from "../context";

const BalanceBodyTable = () => {
  const { state: balanceHistoryState } = useBalanceHistoryContext();
  const theads = [
    "Amount",
    "Previous Balance",
    "NPM",
    "Name",
    "Activity",
    "Note",
    "Date",
  ];
  console.log(balanceHistoryState);
  return (
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
        {balanceHistoryState.balanceHistory.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              Rp {item.amount.toLocaleString().replace(/,/g, ".")}
              ,-
            </td>
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
  );
};

export default BalanceBodyTable;