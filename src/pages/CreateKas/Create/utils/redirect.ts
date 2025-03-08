import { useHomepageContext } from "@pages/Homepage/context";

interface HookReturn {
  handleRedirect: () => void;
}

export const Redirect = ():HookReturn => {
  const { setState } = useHomepageContext();


  const handleRedirect = () => {
    setState((prevState) => ({
      ...prevState,
      app: "balance", 
    }));
  };

  return {handleRedirect};
};
