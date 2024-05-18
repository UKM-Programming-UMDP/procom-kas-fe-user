import { AppType } from "@types";
import { useHomepageContext } from "../context";

interface HookReturn {
  handleChangeApp: (app: AppType) => void;
}
const useHomepage = (): HookReturn => {
  const { setState } = useHomepageContext();

  const handleChangeApp = (app: AppType) => {
    setState((prevState) => ({ ...prevState, app }));
  };

  return {
    handleChangeApp,
  };
};

export default useHomepage;
