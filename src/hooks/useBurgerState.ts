import { useSelector } from "react-redux";
import { selectIngredientsStatus } from "../services/reducers";
import { RootState } from "../services/store";

export const useBurgerState = () => {
  const ingredientsStatus = useSelector(selectIngredientsStatus);
  const selectedIngredient = useSelector((state: RootState) => state.currentIngredient.ingredient);
  const orderId = useSelector((state: RootState) => state.order.orderId);
  const orderStatus = useSelector((state: RootState) => state.order.status);

  return { ingredientsStatus, selectedIngredient, orderId, orderStatus };
};
