import { useAppSelector } from "../../types/hooks";
import styles from "./Modal.module.css";

export function OrderDetails() {
  const orderId = useAppSelector(state => state.order.orderId);
  const orderStatus = useAppSelector(state => state.order.status);

  return (
    <div className={styles.details}>
      {orderStatus === "loading" ? (
        <p className="text text_type_main-medium">Оформляем заказ...</p>
      ) : (
        <>
          <p className="orderId text text_type_digits-large">{orderId}</p>
          <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
          <div className={`${styles.icon} mt-15`} />
          <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive mt-2">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}
