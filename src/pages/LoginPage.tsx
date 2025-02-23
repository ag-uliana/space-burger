import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData: Record<string, string>) => {
    const typedFormData = formData as { 
      email: string; 
      password: string 
    };

    const result = await login(typedFormData.email, typedFormData.password);
    
    if (result) {
      navigate("/");
    }
  };

  return (
    <AuthForm
      title="Вход"
      fields={[
        { type: "email", placeholder: "E-mail", name: "email" },
        { type: "password", placeholder: "Пароль", name: "password" },
      ]}
      buttonText={isLoading ? "Вход..." : "Войти"}
      onSubmit={handleLogin}
      errorMessage={error}
      bottomText1="Вы — новый пользователь?"
      bottomLinkText1="Зарегистрироваться"
      bottomLink1="/register"
      bottomText2="Забыли пароль?"
      bottomLinkText2="Восстановить пароль"
      bottomLink2="/forgot-password"
    />
  );
}
