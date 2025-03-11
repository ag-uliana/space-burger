import { useNavigate } from "react-router-dom";
import { 
  ConstructorElement, 
  CurrencyIcon, 
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { createOrder, addIngredient } from "../../services/reducers";
import { PlaceholderElement, DraggableFilling } from "../ui";
import { RootState } from "../../services/store";
import { useAppDispatch, useTotalPrice } from "../../hooks";
import { Ingredient } from "../../types";
import styles from "./BurgerConstructor.module.css";


export default function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalPrice = useTotalPrice();
  const { bun, fillings } = useSelector((state: RootState) => state.burgerConstructor);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleOrderClick = () => {
    if (!bun || fillings.length === 0) return;

    if (!user) {
      navigate("/login"); 
      return;
    }

    const ingredientIds = [
      bun._id,
      ...fillings.map((item) => item._id),
      bun._id,
    ];

    dispatch(createOrder(ingredientIds));
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item: Ingredient) => {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <section ref={dropRef} className={`${styles.builder} ${isOver ? styles.dropHovered : ""}`}>
      <div className={`${styles.item} mb-4`}>
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <PlaceholderElement text="Выберите булку" type="top" />
        )}
      </div>

      <div className={styles.scrollable}>
        {fillings.length > 0 ? (
          fillings.map((item, index) => (
            <DraggableFilling key={item.uniqueId} item={item} index={index} />
          ))
        ) : (
          <PlaceholderElement text="Выберите начинку" type="filling" />
        )}
      </div>

      <div className={`${styles.item} mt-4`}>
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <PlaceholderElement text="Выберите булку" type="bottom" />
        )}
      </div>

      <div className={`${styles.total} mt-10`}>
        <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
        <div className="ml-10">
          <Button 
            type="primary" 
            size="medium" 
            htmlType="button" 
            onClick={handleOrderClick}
            disabled={!bun || fillings.length === 0}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
}
