import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { feedActions } from '../services/reducers';
import { RootState } from '../services/store';
import { WS_BASE_URL } from '../constants';

export const useFeedConnection = (enabled: boolean) => {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.feed.status);

  useEffect(() => {
    if (!enabled) return;

    if (status !== 'connected') {
      dispatch({
        type: feedActions.wsConnect,
        payload: `${WS_BASE_URL}/all`
      });
    }

    return () => {
      dispatch({ type: feedActions.wsDisconnect });
    };
  }, [dispatch, enabled]);
};
