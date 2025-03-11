import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components";
import { forgotPassword } from "../services/api";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("forgotPasswordVisited")) {
      sessionStorage.setItem("forgotPasswordVisited", "true");
    }
  }, []);

  const handleForgotPassword = async (formData: Record<string, string>) => {
    setLoading(true);
    setError(null);

    if (!formData.email) {
      setError("Введите ваш e-mail");
      setLoading(false);
      return;
    }

    try {
      await forgotPassword(formData.email);
      
      navigate("/reset-password", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка восстановления пароля");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Восстановление пароля"
      fields={[{ type: "email", placeholder: "Укажите E-mail", name: "email" }]}
      buttonText={loading ? "Отправка..." : "Восстановить"}
      onSubmit={handleForgotPassword}
      errorMessage={error}
      bottomText1="Вспомнили пароль?"
      bottomLinkText1="Войти"
      bottomLink1="/login"
    />
  );
}

