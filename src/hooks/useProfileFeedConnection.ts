import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { profileFeedActions } from '../services/reducers';
import { RootState } from '../services/store';
import { WS_BASE_URL } from '../constants';

export const useProfileFeedConnection = (enabled: boolean) => {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.profileFeed.status);
  const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');

  useEffect(() => {
    if (!enabled || !token) return;

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
