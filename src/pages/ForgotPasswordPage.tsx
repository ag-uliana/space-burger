import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthForm } from "../components";
import { forgotPassword } from "../services/api";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      title={t('AuthForm.resetPasswordTitle')}
      fields={[{ type: "email", placeholder: t('AuthForm.fields.emailPlaceholder'), name: "email" }]}
      buttonText={loading ? t('AuthForm.buttonTextResetPassword.loadingReset') : t('AuthForm.buttonTextResetPassword.reset')}
      onSubmit={handleForgotPassword}
      errorMessage={error}
      bottomText1={t('AuthForm.bottomText1AuthResetPassword')}
      bottomLinkText1={t('AuthForm.bottomLinkText1ResetPassword')}
      bottomLink1="/login"
    />
  );
}

