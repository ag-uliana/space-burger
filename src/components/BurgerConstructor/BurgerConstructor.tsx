import { useNavigate } from "react-router-dom";
import { 
  ConstructorElement, 
  CurrencyIcon, 
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { useTotalPrice } from "../../hooks";
import { useDrop } from "react-dnd";
import { createOrder, addIngredient } from "../../services/reducers";
import { PlaceholderElement, DraggableFilling } from "../ui";
import { useTranslation } from 'react-i18next';
import { Ingredient } from "../../types";
import styles from "./BurgerConstructor.module.css";


export default function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalPrice = useTotalPrice();
  const { t } = useTranslation();
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const user = useAppSelector(state => state.auth.user);

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
    <section data-testid="burger-constructor" ref={dropRef} className={`${styles.builder} ${isOver ? styles.dropHovered : ""}`}>
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
          <PlaceholderElement text={t('BurgerConstructor.chooseBun')} type="top" />
        )}
      </div>

      <div className={styles.scrollable}>
        {fillings.length > 0 ? (
          fillings.map((item, index) => (
            <DraggableFilling key={item.uniqueId} item={item} index={index} />
          ))
        ) : (
          <PlaceholderElement text={t('BurgerConstructor.chooseFilling')} type="filling" />
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
          <PlaceholderElement text={t('BurgerConstructor.chooseBun')} type="bottom" />
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
            {t('BurgerConstructor.order')}
          </Button>
        </div>
      </div>
    </section>
  );
}
