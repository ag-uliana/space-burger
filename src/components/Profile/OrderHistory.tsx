import styles from "./ProfilePage.module.css"

export function OrderHistory() {
  return (
    <div className={styles.orders}>
      <h2 className="text text_type_main-medium">История заказов</h2>
      <p>Здесь будет список заказов</p>
    </div>
  );
}
