import { useTranslation } from "react-i18next";

export function getOrderStatusLabel(status: string) {
  const { t } = useTranslation();
  switch (status) {
    case 'done': return <span className="text text_type_main-default text_color_success">{t('orederStatusText.done')}</span>;
    case 'pending': return 'Готовится';
    case 'created': return 'Создан';
    default: return status;
  }
}
  