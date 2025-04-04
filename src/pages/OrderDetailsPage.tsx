import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatRelativeDate, getOrderStatusLabel } from '../utils';
import { useOrderDetails } from '../hooks/useOrderDetails';
import styles from '../components/Feed/Feed.module.css';

export default function OrderDetailsPage() {
  const { order, ingredientCounts, ingredientMap, totalPrice, isLoading } = useOrderDetails();

  if (isLoading || !order) {
    return <p className="text text_type_main-default p-10">Загрузка...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.orderNumber} text text_type_digits-default mb-10`}>#{order.number}</p>
      <h2 className="text text_type_main-medium mb-3 ">{order.name}</h2>
      <p className="text text_type_main-default mb-15">{getOrderStatusLabel(order.status)}</p>

      <h3 className="text text_type_main-medium mb-4">Состав:</h3>
      <ul className={`${styles.ingredients} mb-10`}>
        {Object.entries(ingredientCounts).map(([id, count]) => {
          const item = ingredientMap[id];
          if (!item) return null;

          return (
            <li key={id} className={`${styles.ingredient} mb-4`}>
              <div className={styles.iconWrapper}>
                <img className={styles.icon} src={item.image} alt={item.name} />
              </div>
              <p className="text text_type_main-default ml-4 mr-4 flex-fill">{item.name}</p>
              <div className={styles.price}>
                <span className="text text_type_digits-default mr-2">{count} x {item.price}</span>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {formatRelativeDate(order.createdAt)}
        </p>
        <div className={styles.total}>
          <span className="text text_type_digits-default mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
