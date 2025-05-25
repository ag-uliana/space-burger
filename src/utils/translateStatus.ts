import { useTranslation } from "react-i18next";

export const getStatusText = (status: string): { text: string; color: string } => {
  const { t } = useTranslation();
  switch (status) {
    case 'done':
      return { text: t('orederStatusText.done'), color: 'text_color_success' };
    case 'pending':
      return { text: t('orederStatusText.pending'), color: '' };
    case 'created':
      return { text: t('orederStatusText.created'), color: '' };
    default:
      return { text: status, color: '' };
  }
};
