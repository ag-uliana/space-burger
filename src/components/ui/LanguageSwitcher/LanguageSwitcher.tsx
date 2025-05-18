import { useTranslation } from 'react-i18next';
import styles from "../../AppHeader/AppHeader.module.css";
import ruIcon from "/ru.svg";
import enIcon from "/en.svg"

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  const icon = currentLang === 'ru' ? enIcon : ruIcon;

  return (
    <div
      className={styles.langButton}
      onClick={toggleLanguage}
      title="Change language"
      style={{ cursor: 'pointer',  }}
    >
      <img
        src={icon}
        alt="Switch language"
        style={{ width: '24px', height: '24px' }}
      />
    </div>
  );
}

