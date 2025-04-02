export const getStatusText = (status: string): { text: string; color: string } => {
  switch (status) {
    case 'done':
      return { text: 'Выполнен', color: 'text_color_success' };
    case 'pending':
      return { text: 'Готовится', color: '' };
    case 'created':
      return { text: 'Создан', color: '' };
    default:
      return { text: status, color: '' };
  }
};
