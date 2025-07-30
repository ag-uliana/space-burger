import { useDrag } from "react-dnd";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../../types";
import styles from "./IngredientCard.module.css";

interface IngredientCardProps {
    ingredient: Ingredient;
    count?: React.ReactNode;
  }

export function IngredientCard({ 
  ingredient,
  count
}: IngredientCardProps) {
  const { image, price, name } = ingredient;

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
    return (
      <div 
        ref={dragRef}
        className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
        data-testid={`ingredient-card-${ingredient.type}`}
      >
        {count}
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-1">{name}</p>
      </div>
    );
  }
  