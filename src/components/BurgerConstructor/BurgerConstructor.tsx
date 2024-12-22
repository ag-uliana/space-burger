import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { fakeIngredients } from "./fakeIngredientsArray";
import { Ingredient } from "../../types";
import styles from "./BurgerConstructor.module.css";

interface BurgerConstructorProps {
  bun: Ingredient | null;
  fillings: Ingredient[];
  onRemoveFilling: (id: string) => void;
  onOrderClick: () => void;
}

export default function BurgerConstructor({ 
  onOrderClick
}: BurgerConstructorProps) {
  const bun = fakeIngredients.find((item) => item.type === "bun") || null;
  const fillings = fakeIngredients.filter((item) => item.type !== "bun");
  const calculateTotalPrice = () => {
    const bunPrice = bun ? bun.price : 0;
    const fillingsPrice = fillings.reduce((acc, item) => acc + item.price, 0);
    return bunPrice + fillingsPrice;
  };

  const totalPrice = calculateTotalPrice();

  const renderBun = (type: "top" | "bottom", textSuffix: string) => {
    if (!bun) return null;
    return (
      <div className={`${styles.item} mb-4`}>
        <span className={styles.iconPlaceholder} />
        <ConstructorElement
          type={type}
          isLocked={true}
          text={`${bun.name} (${textSuffix})`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    );
  };

  return (
    <section className={styles.builder}>
        {renderBun("top", "верх")}
        <div className={styles.scrollable}>
          <div className={styles.fillings}>
            {fillings.map((item) => (
              <div className={`${styles.item} mb-4`} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            ))}
          </div>
        </div>
        {renderBun("bottom", "низ")}

      <div className={`${styles.total} mt-10`}>
        <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
        <div className="ml-10">
          <Button 
            type="primary" 
            size="medium" 
            htmlType="button"
            
            onClick={onOrderClick}
          >
            Оформить заказ
          </Button>
          </div>
      </div>
    </section>
  );
}

