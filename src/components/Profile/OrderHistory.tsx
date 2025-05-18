import { useTranslation } from 'react-i18next';
import OrderCard from '../OrderCard/OrderCard';
import { useProfileFeedConnection } from '../../hooks';
import { useAppSelector } from '../../types/hooks';
import styles from './ProfilePage.module.css';

export function OrderHistory() {
  const { t } = useTranslation();
  useProfileFeedConnection(true);
  const { orders, status } = useAppSelector(state => state.profileFeed);

  return (
    <div className={styles.orders}>
      <ul className={styles.orderList}>
        {status === 'connected' && orders.map(order => (
          <OrderCard key={order._id} order={order} linkPrefix="/profile/orders" showStatus />
        ))}
        {status === 'idle' && <p>{t('loading.loading')}</p>}
        {status === 'error' && <p>{t('loading.error')}</p>}
      </ul>
    </div>
  );
}
