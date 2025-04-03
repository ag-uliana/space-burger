import { selectIngredientsStatus } from "../services/reducers";
import { useAppSelector } from "../types/hooks";

export const useBurgerState = () => {
  const ingredientsStatus = useAppSelector(selectIngredientsStatus);
  const selectedIngredient = useAppSelector(state => state.currentIngredient.ingredient);
  const orderId = useAppSelector(state => state.order.orderId);
  const orderStatus = useAppSelector(state => state.order.status);

  return { ingredientsStatus, selectedIngredient, orderId, orderStatus };
};
