import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { profileFeedActions } from '../services/reducers';
import { useAuthToken } from './useAuthToken';
import { WS_BASE_URL } from '../constants';

export const useProfileFeedConnection = (enabled: boolean) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.profileFeed.status);
  const { token, ready } = useAuthToken();

  useEffect(() => {
    if (!enabled || !ready || !token) return;

    if (status !== 'connected') {
      dispatch({
        type: profileFeedActions.wsConnect,
        payload: `${WS_BASE_URL}?token=${token}`
      });
    }

    return () => {
      dispatch({ type: profileFeedActions.wsDisconnect });
    };
  }, [dispatch, enabled, token]);
};
