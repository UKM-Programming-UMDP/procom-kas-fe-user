import { HomepageProvider } from "@pages/Homepage/context";
import HomepageLayout from "./layout";

const Homepage = () => {
  return (
    <HomepageProvider>
      <HomepageLayout />
    </HomepageProvider>
  );
};

export default Homepage;
