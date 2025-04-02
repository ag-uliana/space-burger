import OrderCard from '../OrderCard/OrderCard';
import { FeedOrder } from '../../services/reducers';
import styles from './Feed.module.css';

type Props = {
  orders: FeedOrder[];
};

export default function FeedOrderList({ orders }: Props) {
  return (
    <ul className={`${styles.list}`}>
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </ul>
  );
}
