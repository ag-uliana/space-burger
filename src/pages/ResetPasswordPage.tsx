import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components";
import { resetPassword } from "../services/api";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (formData: Record<string, string>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await resetPassword(formData.password, formData.token);
      console.log(response.message);
      
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сброса пароля");

    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Восстановление пароля"
      fields={[
        { type: "password", placeholder: "Введите новый пароль", name: "password" },
        { type: "text", placeholder: "Введите код из письма", name: "token" },
      ]}
      buttonText={loading ? "Отправка..." : "Сохранить"}
      onSubmit={handleResetPassword}
      errorMessage={error}
      bottomText1="Вспомнили пароль?"
      bottomLinkText1="Войти"
      bottomLink1="/login"
    />
  );
}

