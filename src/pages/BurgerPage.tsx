import { useEffect } from "react";
import { BurgerIngredients, BurgerConstructor, BurgerModals } from "../components";
import { fetchIngredients } from "../services/reducers/ingredientsSlice";
import { useAppDispatch, useBurgerState } from "../hooks";
import styles from "../App.module.css";

export default function BurgerPage() {
  const dispatch = useAppDispatch();
  const { ingredientsStatus, orderStatus } = useBurgerState();

  useEffect(() => {
    if (ingredientsStatus === "idle") {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsStatus]);

  return (
    <>
      <h1 className="columnsHeader text text_type_main-large pt-10 pb-5 pl-30">Соберите бургер</h1>
      <div className={styles.columns}>
        {ingredientsStatus === "loading" && <p>Загрузка...</p>}
        {ingredientsStatus === "failed" && <p>Ошибка загрузки</p>}
        {ingredientsStatus === "succeeded" && (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </div>

      <BurgerModals />

      {orderStatus === "failed" && (
        <p className="text text_type_main-default text_color_error mt-4">
          Ошибка оформления заказа. Попробуйте снова.
        </p>
      )}
    </>
  );
}
