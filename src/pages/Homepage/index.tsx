import CardAutosize from "@components/Card/CardAutosize";
import { useHomepageContext } from "./context";
import TextAutosize from "@components/Animation/TextAutosize";
import AutoMargin from "@components/Animation/AutoMargin";
import useWindowSize from "@hooks/useWindowSize";
import AppList from "./partials/AppList";
import { ArrowBack } from "@mui/icons-material";
import useHomepage from "./hooks/useHomepage";
import { appDisplayName } from "@utils/consts";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import PayedKasLayout from "@pages/PayedKas/layout";
import BalanceLayout from "@pages/Balance/layout";
import BalanceHistoryLayout from "@pages/BalanceHistory/layout";

const Homepage = () => {
  const { state } = useHomepageContext();
  const { handleChangeApp } = useHomepage();
  const { md, sm, xs } = useWindowSize();

  const appComponent = {
    home: <AppList />,
    "payed kas": <PayedKasLayout />,
    balance: <BalanceLayout />,
    "balance history": <BalanceHistoryLayout />,
  };

  const isAppHome = state.app === "home";

  return (
    <div className="flex flex-col h-[100vh]">
      <AutoMargin
        trigger={md}
        className="w-fit mx-auto"
        initial={{ marginTop: "1rem" }}
        animate={{ marginTop: state.app === "home" ? "6rem" : "1rem" }}
      >
        <TextAutosize
          initialSize="3rem"
          targetSize={xs ? "2.5rem" : "2rem"}
          trigger={!md || !sm}
          className="text-white"
        >
          UKM Programming
        </TextAutosize>
      </AutoMargin>
      <div className="flex justify-center items-center md:p-4 p-1">
        <CardAutosize
          className="mx-auto mt-3"
          trigger={!isAppHome}
          initialSize={{ width: "32.3rem" }}
          animateSize={{ width: "60rem" }}
        >
          {!isAppHome && (
            <div className="flex h-9">
              <AppearFadeIn direction="left" className="drop-shadow-xl">
                <button
                  className="absolute ms-3 mt-1.5 w-fit"
                  onClick={() => handleChangeApp("home")}
                >
                  <ArrowBack />
                </button>
              </AppearFadeIn>
              <AppearFadeIn direction="top" className="m-auto drop-shadow-xl">
                {appDisplayName[state.app]}
              </AppearFadeIn>
            </div>
          )}
          <div
            className={`mx-3 mt-1 mb-3 overflow-auto ${!isAppHome && "md:h-[70vh] h-[80vh]"}`}
          >
            {appComponent[state.app]}
          </div>
        </CardAutosize>
      </div>
    </div>
  );
};

export default Homepage;
