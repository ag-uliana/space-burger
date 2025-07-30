import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BurgerIngredients, BurgerConstructor, BurgerModals } from "../components";
import { fetchIngredients } from "../services/reducers/ingredientsSlice";
import { useBurgerState } from "../hooks";
import { useAppDispatch } from "../types/hooks";
import styles from "../App.module.css";

export default function BurgerPage() {
  const dispatch = useAppDispatch();
  const { ingredientsStatus, orderStatus } = useBurgerState();
  const { t } = useTranslation();

  useEffect(() => {
    if (ingredientsStatus === "idle") {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsStatus]);

  return (
    <>
      <h1 className="columnsHeader text text_type_main-large pt-10 pb-5">{t('BurgerPage.header')}</h1>
      <div className={styles.columns}>
        {ingredientsStatus === "loading" && <p>{t('loading.loading')}</p>}
        {ingredientsStatus === "failed" && <p>{t('loading.error')}</p>}
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
