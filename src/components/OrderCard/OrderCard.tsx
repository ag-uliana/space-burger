import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FeedOrder } from '../../services/reducers';
import { formatRelativeDate, getStatusText } from '../../utils';
import { RootState } from '../../services/store';
import styles from './OrderCard.module.css';

type Props = {
  order: FeedOrder;
  linkPrefix?: string;
  showStatus?: boolean;
};

export default function OrderCard({ order, linkPrefix = '/feed', showStatus = false }: Props) {
  const location = useLocation();
  const ingredientsData = useSelector((state: RootState) => state.ingredients.items);

  const orderIngredients = order.ingredients
    .map(id => ingredientsData.find(item => item._id === id))
    .filter(Boolean);

  const price = orderIngredients.reduce((sum, item) => sum + (item?.price || 0), 0);

  return (
    <li className={`${styles.item} pr-6 pb-6 pt-6 pl-6 mb-4 mr-2`}>
      <Link
        to={`${linkPrefix}/${order._id}`}
        state={{ background: location }}
        className={styles.link}
      >
        <div className={styles.card}>
          <div className={`${styles.header}`}>
            <span className="text text_type_digits-default">#{order.number}</span>
            <span className="text text_type_main-default text_color_inactive">
              {formatRelativeDate(order.createdAt)}
            </span>
          </div>

          <h3 className="text text_type_main-medium mt-6 mb-6">{order.name}</h3>

          {showStatus && (
            <p className={`text text_type_main-default mb-6 ${getStatusText(order.status).color}`}>
              {getStatusText(order.status).text}
            </p>
          )}

          <div className={styles.footer}>
            <div className={`${styles.icons} ml-6`}>
            {orderIngredients.slice(0, 5).map((item, index) => (
              <div key={index} className={styles.iconWrapper} style={{ zIndex: 6 - index }}>
                <img
                  className={styles.icon}
                  src={item!.image}
                  alt={item!.name}
                />
              </div>
            ))}

            {orderIngredients.length > 5 && (
              <div className={styles.iconWrapper} style={{ zIndex: 1 }}>
                <img
                  className={`${styles.icon} ${styles.dimmed}`}
                  src={orderIngredients[5]!.image}
                  alt="+more"
                />
                <div className={styles.overlay}>
                  <span className="text text_type_main-default">+{orderIngredients.length - 5}</span>
                </div>
              </div>
            )}
            </div>
            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">{price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
