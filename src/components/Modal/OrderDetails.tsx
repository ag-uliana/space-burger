import styles from "./Modal.module.css";

export function OrderDetails() {
  const orderId = "034536";

  return (
    <div className={styles.details}>
      <p className="orderId text text_type_digits-large">{orderId}</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div className={`${styles.icon} mt-15`}>
      </div>
      <p className="text text_type_main-default mt-15 ">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
