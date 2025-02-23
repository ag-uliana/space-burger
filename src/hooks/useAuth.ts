import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../services/store";
import { login, logout, register } from "../services/reducers";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error } = useSelector((state: RootState) => state.auth);

  return {
    user,
    isLoading,
    error,
    login: (email: string, password: string) => dispatch(login({ email, password })),
    register: (email: string, password: string, name?: string) => dispatch(register({ email, password, name })),
    logout: () => dispatch(logout()).unwrap(),
  };
};
