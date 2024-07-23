import { HomepageProvider } from "@pages/Homepage/context";
import HomepageLayout from "./layout";
import { SnackbarProvider } from "notistack";
import { StyledMaterialDesignContent } from "@components/Snackbar";

const Homepage = () => {
  return (
    <HomepageProvider>
      <SnackbarProvider Components={{ error: StyledMaterialDesignContent }}>
        <HomepageLayout />
      </SnackbarProvider>
    </HomepageProvider>
  );
};

export default Homepage;
