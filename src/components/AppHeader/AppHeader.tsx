import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../ui";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  const { t } = useTranslation();
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} pt-4 pb-4`}>
        <ul className={`${styles.navList}`}>
          <li className={`mr-4 p-5`}>
            <NavLink
              to="/"
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : styles.inactive}`}
            >
              <BurgerIcon type="secondary" />
              <span className="text text_type_main-default ml-2">{t('AppHeader.navConstructor')}</span>
            </NavLink>
          </li>
          <li className={`${styles.navItem} mr-4 p-5`}>
            <NavLink
              to="/feed"
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : styles.inactive}`}
            >
              <ListIcon type="secondary" />
              <span className="text text_type_main-default ml-2">
              {t('AppHeader.navFeed')}
              </span>
            </NavLink>
          </li>
        </ul>

        <div className={styles.logo}>
          <Logo />
        </div>

        <LanguageSwitcher />

        <ul className={`${styles.navList} m-0 p-0`}>
          <li className={`p-5`}>
            <NavLink
              to="/profile"
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : styles.inactive}`}
            >
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default ml-2">
              {t('AppHeader.navAccount')}
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
