import Homepage from "@pages/Homepage";
import { HomepageProvider } from "@pages/Homepage/context";

const HomepageLayout = () => {
  return (
    <HomepageProvider>
      <Homepage />
    </HomepageProvider>
  );
};

export default HomepageLayout;
