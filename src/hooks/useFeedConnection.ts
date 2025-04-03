import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { feedActions } from '../services/reducers';
import { WS_BASE_URL } from '../constants';

export const useFeedConnection = (enabled: boolean) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.feed.status);

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
