import { useMemo } from "react";
import { useAppSelector } from "../types/hooks";

export function useTotalPrice() {
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);

  return useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const fillingsPrice = fillings.reduce((acc, item) => acc + item.price, 0);
    return bunPrice + fillingsPrice;
  }, [bun, fillings]);
}
