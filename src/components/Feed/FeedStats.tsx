import { useTranslation } from 'react-i18next';
import { FeedOrder } from '../../services/reducers';
import styles from './Feed.module.css';

type Props = {
    orders: FeedOrder[];
    total: number;
    totalToday: number;
};

export default function FeedStats({ orders, total, totalToday }: Props) {
  const done = orders.filter(o => o.status === 'done');
  const pending = orders.filter(o => o.status === 'pending');
   const { t } = useTranslation();

  const splitToColumns = (arr: FeedOrder[], itemsPerColumn: number) => {
    const cols: FeedOrder[][] = [];
    for (let i = 0; i < arr.length; i += itemsPerColumn) {
      cols.push(arr.slice(i, i + itemsPerColumn));
    }
    return cols.slice(0, 2);
  };

  const doneChunks = splitToColumns(done, 5);
  const pendingChunks = splitToColumns(pending, 10);

  return (
    <div className={`${styles.stats} ml-15`}>
      <div className={`${styles.statusSection} mb-2`}>
        <div className={styles.statusColumn}>
          <h3 className="text text_type_main-medium">{t('FeedStats.statusColumn.ready')}</h3>
          <div className={styles.columnsWrap}>
            {doneChunks.map((col, i) => (
              <ul key={i} className={styles.statusColumn}>
              {col.map(o => (
                <li key={o._id} className="text text_type_digits-default text_color_success">
                {o.number}
                </li>
              ))}
              </ul>
            ))}
        </div>
        </div>

        <div className={styles.statusColumn}>
          <h3 className="text text_type_main-medium">{t('FeedStats.statusColumn.inProgress')}</h3>
          <div className={styles.columnsWrap}>
            {pendingChunks.map((col, i) => (
              <ul key={i} className={styles.statusColumn}>
              {col.map(o => (
                <li key={o._id} className="text text_type_digits-default">
                {o.number}
                </li>
              ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <p className="text text_type_main-medium">{t('FeedStats.completedTotal.allTime')}</p>
        <p className="text text_type_digits-large">{total}</p>
        <p className="text text_type_main-medium">{t('FeedStats.completedTotal.today')}</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  );
}
