export function getOrderStatusLabel(status: string) {
  switch (status) {
    case 'done': return <span className="text text_type_main-default text_color_success">Выполнен</span>;
    case 'pending': return 'Готовится';
    case 'created': return 'Создан';
    default: return status;
  }
}
  