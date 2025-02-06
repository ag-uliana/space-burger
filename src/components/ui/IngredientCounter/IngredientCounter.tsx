import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";

interface IngredientCounterProps {
  ingredientId: string;
}

export function IngredientCounter({ ingredientId }: IngredientCounterProps) {
  const { bun, fillings } = useSelector((state: RootState) => state.burgerConstructor);

  if (bun?._id === ingredientId) {
    return <Counter count={2} size="default" />;
  }

  const count = fillings.filter((item) => item._id === ingredientId).length;

  return count > 0 ? <Counter count={count} size="default" /> : null;
}
