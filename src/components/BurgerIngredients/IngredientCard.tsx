import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCard.module.css";

interface IngredientCardProps {
    image: string;
    price: number;
    name: string;
    count: number;
    onClick: () => void;
    onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
  }

export function IngredientCard({ 
  image, 
  price, 
  name, 
  count, 
  onClick, 
  onContextMenu 
}: IngredientCardProps) {
    return (
      <div className={`${styles.card}`} onClick={onClick} onContextMenu={onContextMenu}>
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
  