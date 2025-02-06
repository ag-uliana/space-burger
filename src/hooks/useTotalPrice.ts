import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";

export function useTotalPrice() {
  const { bun, fillings } = useSelector((state: RootState) => state.burgerConstructor);

  return useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const fillingsPrice = fillings.reduce((acc, item) => acc + item.price, 0);
    return bunPrice + fillingsPrice;
  }, [bun, fillings]);
}
