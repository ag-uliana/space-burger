import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthForm } from "../components";
import { useAuth } from "../hooks";

export default function RegisterPage() {
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = async (formData: Record<string, string>) => {
    const typedFormData = formData as { 
      email: string; 
      password: string; 
      name: string 
    };
    
    const result = await register(typedFormData.email, typedFormData.password, typedFormData.name);
    if (result) {
      navigate("/");
    }
  };

  return (
    <AuthForm
      title={t('AuthForm.authTitle')}
      fields={[
        { type: "text", placeholder: t('AuthForm.fields.namePlaceholder'), name: "name" },
        { type: "email", placeholder: "E-mail", name: "email" },
        { type: "password", placeholder: t('AuthForm.fields.passwordPlaceholder'), name: "password" },
      ]}
      buttonText={isLoading ? t('AuthForm.buttonTextAuth.loadingAuth') : t('AuthForm.buttonTextAuth.auth')}
      onSubmit={handleRegister}
      errorMessage={error}
      bottomText1={t('AuthForm.bottomText1Auth')}
      bottomLinkText1={t('AuthForm.bottomLinkText1Auth')}
      bottomLink1="/login"
    />
  );
}
