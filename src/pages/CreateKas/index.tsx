import { CreateKasProvider } from "@pages/CreateKas/context";
import CreateKasLayout from "./layout";
const index = () => {
  return (
    <CreateKasProvider>
      <CreateKasLayout />
    </CreateKasProvider>
  );
};

export default index;
