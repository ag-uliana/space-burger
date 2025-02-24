import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components";
import { useAuth } from "../hooks";

export default function RegisterPage() {
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

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
      title="Регистрация"
      fields={[
        { type: "text", placeholder: "Имя", name: "name" },
        { type: "email", placeholder: "E-mail", name: "email" },
        { type: "password", placeholder: "Пароль", name: "password" },
      ]}
      buttonText={isLoading ? "Регистрация..." : "Зарегистрироваться"}
      onSubmit={handleRegister}
      errorMessage={error}
      bottomText1="Уже зарегистрированы?"
      bottomLinkText1="Войти"
      bottomLink1="/login"
    />
  );
}
