import { usePayedKasContext } from "../context";
import PayedKasService from "@services/payedKas";

interface HookReturn {
  payedKasService: PayedKasService;
  fetchPayedKas: () => void;
}
const usePayedKas = (): HookReturn => {
  const { setState } = usePayedKasContext();
  const payedKasService = new PayedKasService();

  const fetchPayedKas = async () => {
    setState((prev) => ({ ...prev, payedKasLoading: true }));
    const res = await payedKasService.get();
    if (!res || !res.status) {
      setState((prev) => ({ ...prev, payedKasLoading: false }));
      // handle error
      return;
    }
    setState((prev) => ({
      ...prev,
      payedKasLoading: false,
      payedKas: res.data,
    }));
  };

  return {
    payedKasService,
    fetchPayedKas,
  };
};

export default usePayedKas;
