import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthForm } from "../components";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const location = useLocation();
  const { t } = useTranslation();
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (formData: Record<string, string>) => {
    const typedFormData = formData as { 
      email: string; 
      password: string 
    };
    const result = await login(typedFormData.email, typedFormData.password);
    
    if (result) {
      navigate(from, { replace: true });
    }
  };

  return (
    <AuthForm
      title={t('AuthForm.loginTitle')}
      fields={[
        { type: "email", placeholder: "E-mail", name: "email" },
        { type: "password", placeholder: t('AuthForm.fields.passwordPlaceholder'), name: "password" },
      ]}
      buttonText={isLoading ? t('AuthForm.buttonTextLogin.loadingEnter') : t('AuthForm.buttonTextLogin.login')}
      onSubmit={handleLogin}
      errorMessage={error}
      bottomText1={t('AuthForm.bottomText1Login')}
      bottomLinkText1={t('AuthForm.bottomLinkText1Login')}
      bottomLink1="/register"
      bottomText2={t('AuthForm.bottomText2Login')}
      bottomLinkText2={t('AuthForm.bottomLinkText2Login')}
      bottomLink2="/forgot-password"
    />
  );
}
