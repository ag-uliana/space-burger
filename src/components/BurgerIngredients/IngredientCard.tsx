import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../types";
import styles from "./IngredientCard.module.css";

interface IngredientCardProps {
    ingredient: Ingredient;
    count: number;
    onClick: () => void;
  }

export function IngredientCard({ 
  ingredient,
  count,
  onClick
}: IngredientCardProps) {
  const { image, price, name } = ingredient;
  
    return (
      <div className={`${styles.card}`} onClick={onClick}>
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-1">{name}</p>
      </div>
    );
  }
  