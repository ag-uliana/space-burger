export const NutritionItem = ({ label, value }: { label: string; value: number }) => (
  <li>
    <p className="text text_type_main-default text_color_inactive">{label}</p>
    <p className="text text_type_digits-default text_color_inactive">{value}</p>
  </li>
);
