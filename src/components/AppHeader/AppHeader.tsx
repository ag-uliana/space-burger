import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} pt-4 pb-4`}>
        <ul className={`${styles.navList}`}>
          <li className={`${styles.navItem} mr-4 p-5`}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2">Конструктор</span>
          </li>
          <li className={`${styles.navItem} mr-4 p-5`}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </span>
          </li>
        </ul>

        <div className={styles.logo}>
          <Logo />
        </div>

        <ul className={`${styles.navList} m-0 p-0`}>
          <li className={`${styles.navItem} p-5`}>
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
