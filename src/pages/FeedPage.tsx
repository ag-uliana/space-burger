import { useEffect } from 'react';
import FeedOrderList from '../components/Feed/FeedOrderList';
import FeedStats from '../components/Feed/FeedStats';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { fetchIngredients } from '../services/reducers';
import { useFeedConnection } from '../hooks';
import styles from '../components/Feed/Feed.module.css';

export default function FeedPage() {
    useFeedConnection(true);
    const dispatch = useAppDispatch();
    const { orders, status, error, total, totalToday } = useAppSelector(state => state.feed);
    const ingredientsStatus = useAppSelector(state => state.ingredients.status);
  
    useEffect(() => {
      if (ingredientsStatus === 'idle') {
        dispatch(fetchIngredients());
      }
    }, [dispatch, ingredientsStatus]);
  
  return (
    <>
      <h1 className="text text_type_main-large pt-10 pb-5 pl-10">Лента заказов</h1>
      <div className={styles.columns}>
        {status === 'idle' && <p>Загрузка...</p>}
        {status === 'error' && <p>{error}</p>}
        {status === 'connected' && (
          <>
            <FeedOrderList orders={orders} />
            <FeedStats orders={orders} total={total} totalToday={totalToday} />
          </>
        )}
      </div>
    </>
  );
}
