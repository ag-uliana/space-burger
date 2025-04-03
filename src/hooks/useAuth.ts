import { useAppDispatch, useAppSelector } from "../types/hooks";
import { RootState } from "../services/store";
import { login, logout, register } from "../services/reducers";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state: RootState) => state.auth);

  return {
    user,
    isLoading,
    error,
    login: (email: string, password: string) => dispatch(login({ email, password })),
    register: (email: string, password: string, name?: string) => dispatch(register({ email, password, name })),
    logout: () => dispatch(logout()).unwrap(),
  };
};
