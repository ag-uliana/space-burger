export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  
  if (isToday) return `Сегодня, ${time}`;
  if (isYesterday) return `Вчера, ${time}`;
  
  return `${date.toLocaleDateString('ru-RU')}, ${time}`;
}
  