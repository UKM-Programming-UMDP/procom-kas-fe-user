import AppCard from "@components/Card/AppCard";
import { CurrencyBitcoin, PointOfSale } from "@mui/icons-material";
import { AppList as AppListType } from "@types";
import useHomepage from "../hooks/useHomepage";
import { appDisplayName } from "@utils/consts";

const AppList = () => {
  const { handleChangeApp } = useHomepage();

  const appList: AppListType[] = [
    {
      displayName: appDisplayName["payed kas"],
      icon: <PointOfSale fontSize="large" />,
      appName: "payed kas",
    },
    {
      displayName: appDisplayName["balance"],
      icon: <CurrencyBitcoin fontSize="large" />,
      appName: "balance",
    },
  ];
  return (
    <div className="p-5 flex flex-wrap gap-3 gap-y-5 w-fit min-h-[40vh]">
      {appList.map((app, index) => (
        <AppCard
          key={index}
          displayName={app.displayName}
          icon={app.icon}
          onClick={() => handleChangeApp(app.appName)}
          delay={(index + 1) * 0.2}
        />
      ))}
    </div>
  );
};

export default AppList;
