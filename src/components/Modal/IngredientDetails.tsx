import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import styles from "./Modal.module.css";

const useIngredientDetails = () => {
  const { id } = useParams();
  const selectedIngredient = useSelector((state: RootState) => state.currentIngredient.ingredient);
  const allIngredients = useSelector((state: RootState) => state.ingredients.items);

  return id ? allIngredients.find((item) => item._id === id) : selectedIngredient;
};

const NutritionItem = ({ label, value }: { label: string; value: number }) => (
  <li>
    <p className="text text_type_main-default text_color_inactive">{label}</p>
    <p className="text text_type_digits-default text_color_inactive">{value}</p>
  </li>
);

export function IngredientDetails() {
  const ingredient = useIngredientDetails();

  if (!ingredient) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={styles.details}>
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
      <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
      <ul className={`${styles.nutrition} mt-8 mb-0`}>
        <NutritionItem label="Калории, ккал" value={ingredient.calories} />
        <NutritionItem label="Белки, г" value={ingredient.proteins} />
        <NutritionItem label="Жиры, г" value={ingredient.fat} />
        <NutritionItem label="Углеводы, г" value={ingredient.carbohydrates} />
      </ul>
    </div>
  );
}
