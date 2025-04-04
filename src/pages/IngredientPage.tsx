import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../types/hooks";
import { IngredientDetails } from "../components";
import { fetchIngredients } from "../services/reducers/ingredientsSlice";
import { RootState } from "../services/store";
import { Ingredient } from "../types";
import styles from "../components/BurgerIngredients/BurgerIngredients.module.css"

export default function IngredientPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const ingredient = useAppSelector((state: RootState) =>
    state.ingredients.items.find((item: Ingredient) => item._id === id)
  );

  useEffect(() => {
    if (!ingredient) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredient]);

  return (
    <div className={styles.page}>
      <h1 className="text text_type_main-large mt-20">Детали ингредиента</h1>
      {ingredient ? <IngredientDetails /> : <p>Загрузка...</p>}
    </div>
  );
}
