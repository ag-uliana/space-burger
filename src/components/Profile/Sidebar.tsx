import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import styles from "./ProfilePage.module.css";

const NavItem = ({ to, children }: { to: string; children: string }) => (
  <li>
    <NavLink 
      to={to}
      end
      className={({ isActive }) => 
        `${styles.navItem} ${isActive ? styles.activeLink : styles.link} text text_type_main-default`
      }
    >
      {children}
    </NavLink>
  </li>
);

export function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <nav className={`${styles.sidebar} mr-15`}>
      <ul className={styles.menu}>
        <NavItem to="/profile">{t('Sidebar.profile')}</NavItem>
        <NavItem to="/profile/orders">{t('Sidebar.orders')}</NavItem>
        <li>
          <button
            className={`${styles.logout} text text_type_main-default`}
            onClick={handleLogout}
          >
            {t('Sidebar.logout')}
          </button>
        </li>
      </ul>
      <p className={`${styles.hint} text text_type_main-small mt-20`}>
        {t('Sidebar.about')}
      </p>
    </nav>
  );
}
