import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
  
    useEffect(() => {
      if (ingredientsStatus === 'idle') {
        dispatch(fetchIngredients());
      }
    }, [dispatch, ingredientsStatus]);
  
  return (
    <>
      <h1 className="text text_type_main-large pt-10 pb-5 pl-10">{t('FeedPage.header')}</h1>
      <div className={styles.columns}>
        {status === 'idle' && <p>{t('loading.loading')}</p>}
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
