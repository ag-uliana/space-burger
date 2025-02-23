import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../components";
import { fetchIngredients } from "../services/reducers/ingredientsSlice";
import { RootState, AppDispatch } from "../services/store";
import { Ingredient } from "../types";
import styles from "../components/BurgerIngredients/BurgerIngredients.module.css"

export default function IngredientPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const ingredient = useSelector((state: RootState) =>
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
