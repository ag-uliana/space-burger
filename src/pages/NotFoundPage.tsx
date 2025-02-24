import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mt-20">
      <h1 className="text text_type_main-large">404</h1>
      <p className="text text_type_main-medium mb-10">Страница не найдена</p>
      <Link to="/" className="text text_type_main-default">
        Вернуться на главную
      </Link>
    </div>
  );
}
