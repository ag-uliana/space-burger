import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "./components";
import BurgerPage from "./pages/BurgerPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import IngredientPage from "./pages/IngredientPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRouteElement from "./components/ProtectedRoute/ProtectedRouteElement";
import { clearCurrentIngredient } from "./services/reducers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./services/store";
import { logout } from "./services/reducers/authSlice";
import { IngredientDetails } from "./components";
import { Modal } from "./components";
import styles from './App.module.css';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <Routes location={background || location}>
            <Route path="/" element={<BurgerPage />} />
            <Route 
              path="/login" 
              element={
                <ProtectedRouteElement onlyUnAuth>
                  <LoginPage />
                </ProtectedRouteElement>} 
            />
            <Route 
              path="/register" 
              element={<
                ProtectedRouteElement onlyUnAuth>
                  <RegisterPage />
                </ProtectedRouteElement>} 
            />
            <Route 
              path="/forgot-password" 
              element={
              <ProtectedRouteElement onlyUnAuth>
                <ForgotPasswordPage />
              </ProtectedRouteElement>} 
            />
            <Route 
              path="/reset-password" 
              element={<ProtectedRouteElement onlyUnAuth requiresForgotPassword>
                <ResetPasswordPage />
              </ProtectedRouteElement>} 
            />
            <Route 
              path="/profile/*" 
              element={<ProtectedRouteElement>
                <ProfilePage />
                </ProtectedRouteElement>
            } />
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {background && (
            <Modal onClose={() => {
              navigate(-1);
              dispatch(clearCurrentIngredient());
            }}> 
              <IngredientDetails />
            </Modal>
          )}
        </main>
      </div>
  );
}

