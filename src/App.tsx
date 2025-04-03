import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./types/hooks";
import BurgerPage from "./pages/BurgerPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import IngredientPage from "./pages/IngredientPage";
import NotFoundPage from "./pages/NotFoundPage";
import FeedPage from "./pages/FeedPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { AppHeader, IngredientDetails, Modal } from "./components";
import ProtectedRouteElement from "./components/ProtectedRoute/ProtectedRouteElement";
import { clearCurrentIngredient, logout } from "./services/reducers";
import { useFeedConnection, useProfileFeedConnection } from "./hooks";
import styles from './App.module.css';

export default function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  const isFeed = location.pathname.startsWith('/feed');
  const isProfile = location.pathname.startsWith('/profile/orders');

  useFeedConnection(isFeed);
  useProfileFeedConnection(isProfile);

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
          <Route path="/login" element={
            <ProtectedRouteElement onlyUnAuth>
              <LoginPage />
            </ProtectedRouteElement>
          } />
          <Route path="/register" element={
            <ProtectedRouteElement onlyUnAuth>
              <RegisterPage />
            </ProtectedRouteElement>
          } />
          <Route path="/forgot-password" element={
            <ProtectedRouteElement onlyUnAuth>
              <ForgotPasswordPage />
            </ProtectedRouteElement>
          } />
          <Route path="/reset-password" element={
            <ProtectedRouteElement onlyUnAuth requiresForgotPassword>
              <ResetPasswordPage />
            </ProtectedRouteElement>
          } />
          <Route path="/profile/*" element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          } />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderDetailsPage />} />
          <Route path="/profile/orders/:id" element={
            <ProtectedRouteElement>
              <OrderDetailsPage />
            </ProtectedRouteElement>
          } />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {background && (
            <>
              <Routes>
                <Route path="/ingredients/:id" element={
                  <Modal onClose={() => {
                    navigate(-1);
                    dispatch(clearCurrentIngredient());
                  }}>
                    <IngredientDetails />
                  </Modal>
                } />

                <Route path="/feed/:id" element={
                  <Modal onClose={() => navigate(-1)}>
                    <OrderDetailsPage />
                  </Modal>
                } />

                <Route path="/profile/orders/:id" element={
                  <Modal onClose={() => navigate(-1)}>
                    <OrderDetailsPage />
                  </Modal>
                } />
              </Routes>
            </>
          )}
        </main>
      </div>
  );
}
