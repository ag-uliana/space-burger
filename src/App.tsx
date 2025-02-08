import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  AppHeader, 
  BurgerIngredients,
  BurgerConstructor,
  OrderDetails,
  IngredientDetails,
  Modal
} from "./components";
import {
  fetchIngredients,
  selectIngredientsStatus,
  resetOrder,
  clearCurrentIngredient
} from './services/reducers';
import { useAppDispatch } from "./hooks";
import { RootState } from './services/store';
import styles from './App.module.css';

export default function App() {
  const dispatch = useAppDispatch();
  const ingredientsStatus = useSelector(selectIngredientsStatus);
  const selectedIngredient = useSelector((state: RootState) => state.currentIngredient.ingredient);
  const orderId = useSelector((state: RootState) => state.order.orderId);
  const orderStatus = useSelector((state: RootState) => state.order.status);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleCloseIngredientModal = () => {
    dispatch(clearCurrentIngredient());
  }

  const handleCloseOrderModal = () => {
    dispatch(resetOrder());
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <h1 className="columnsHeader text text_type_main-large pt-10 pb-5 pl-30">Соберите бургер</h1>
        <div className={styles.columns}>
          {ingredientsStatus === 'loading' && <p>Загрузка...</p>}
          {ingredientsStatus === 'failed' && <p>Ошибка загрузки</p>}
          {ingredientsStatus === 'idle' && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </div>
      </main>

      {selectedIngredient && (
        <Modal onClose={handleCloseIngredientModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}

      {orderId && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}

      {orderStatus === "failed" && (
        <p className="text text_type_main-default text_color_error mt-4">
          Ошибка оформления заказа. Попробуйте снова.
        </p>
      )}
    </div>
  );
}

