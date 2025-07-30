import { useAppSelector } from "../../types/hooks";
import { useTranslation } from "react-i18next";
import styles from "./Modal.module.css";

export function OrderDetails() {
  const orderId = useAppSelector(state => state.order.orderId);
  const orderStatus = useAppSelector(state => state.order.status);
  const { t } = useTranslation();

  return (
    <div className={styles.details}>
      {orderStatus === "loading" ? (
        <p className="text text_type_main-medium">{t('OrderDetails.loading')}</p>
      ) : (
        <>
          <p className="orderId text text_type_digits-large">{orderId}</p>
          <p className="text text_type_main-medium mt-2 mb-15 orderId">{t('OrderDetails.details.id')}</p>
          <div className={`${styles.icon} mt-15`} />
          <p className="text text_type_main-default mt-15">{t('OrderDetails.details.cooking')}</p>
          <p className="text text_type_main-default text_color_inactive mt-2">
            {t('OrderDetails.details.wait')}
          </p>
        </>
      )}
    </div>
  );
}
