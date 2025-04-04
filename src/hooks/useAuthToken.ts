import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { refreshToken } from '../services/reducers';

export function useAuthToken() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        if (accessToken) {
          setToken(accessToken.replace('Bearer ', ''));
          setReady(true);
        } else {
          const refreshed = await dispatch(refreshToken()).unwrap();

          if (refreshed.accessToken) {
            setToken(refreshed.accessToken.replace('Bearer ', ''));
          } else {
            console.warn('Нет accessToken после refresh');
            setToken(null);
          }
          
          setReady(true);
        }
      } catch (err) {
        console.error('Token refresh failed', err);
        setReady(true);
      }
    };

    getToken();
  }, [accessToken, dispatch]);

  return { token, ready };
}
