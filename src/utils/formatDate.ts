import { useTranslation } from "react-i18next";

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const { t } = useTranslation();
  
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  
  if (isToday) return `${t('dataTransform.today')}, ${time}`;
  if (isYesterday) return `${t('dataTransform.yesterday')}, ${time}`;
  
  return `${date.toLocaleDateString('ru-RU')}, ${time}`;
}
  