import { useSelector } from 'react-redux';
import OrderCard from '../OrderCard/OrderCard';
import { RootState } from '../../services/store';
import { useProfileFeedConnection } from '../../hooks';
import styles from './ProfilePage.module.css';

export function OrderHistory() {
  useProfileFeedConnection(true);
  const { orders, status } = useSelector((state: RootState) => state.profileFeed);

  return (
    <div className={styles.orders}>
      <ul className={styles.orderList}>
        {status === 'connected' && orders.map(order => (
          <OrderCard key={order._id} order={order} linkPrefix="/profile/orders" showStatus />
        ))}
        {status === 'idle' && <p>Загрузка...</p>}
        {status === 'error' && <p>Ошибка загрузки</p>}
      </ul>
    </div>
  );
}
