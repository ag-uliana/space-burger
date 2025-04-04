import { useState, useEffect } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState } from "../../services/store";
import { updateUserProfile } from "../../services/reducers/profileSlice";
import { updateAuthUser, refreshToken } from "../../services/reducers/authSlice";
import { useProfileData } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import styles from "./ProfilePage.module.css";

interface ProfileInputProps {
  label: string;
  type: "text" | "email" | "password";
  name: string;
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
}

const useProfileForm = (user: RootState["auth"]["user"]) => { 
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);
  const refreshTokenValue = useAppSelector((state: RootState) => state.auth.refreshToken);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setHasChanges(true);
  };

  const handleEdit = (field: "name" | "email" | "password") => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    setHasChanges(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
    setIsEditing({ name: false, email: false, password: false });
    setHasChanges(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData: Partial<typeof formData> = {};
    if (formData.name !== user?.name) updatedData.name = formData.name;
    if (formData.email !== user?.email) updatedData.email = formData.email;
    if (formData.password) updatedData.password = formData.password;

    if (Object.keys(updatedData).length > 0) {
      try {
        if (!accessToken && refreshTokenValue) {
          await dispatch(refreshToken()).unwrap();
        }

        const result = await dispatch(updateUserProfile(updatedData)).unwrap();
        dispatch(updateAuthUser(result));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка обновления профиля");
      }
    }

    setIsEditing({ name: false, email: false, password: false });
    setHasChanges(false);
    setError(null);
  };

  return {
    formData,
    isEditing,
    hasChanges,
    error,
    handleChange,
    handleEdit,
    handleCancel,
    handleSubmit,
  };
};

const ProfileInput = ({ label, type, name, value, disabled, onChange, onIconClick }: ProfileInputProps) => (
  <div className="mb-6">
    <Input
      type={type}
      placeholder={label}
      name={name}
      value={value}
      disabled={disabled}
      icon="EditIcon"
      onChange={onChange}
      onIconClick={onIconClick}
    />
  </div>
);

export function ProfileInfo() {
  const { user, isLoading, isFetching } = useProfileData();
  const { 
    formData, 
    isEditing, 
    hasChanges, 
    handleChange, 
    error,
    handleEdit, 
    handleCancel, 
    handleSubmit 
  } = useProfileForm(user);

  if ((isLoading || isFetching) && !user) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={styles.profile}>
      <form onSubmit={handleSubmit}>
        <ProfileInput
          label="Имя"
          type="text"
          name="name"
          value={formData.name}
          disabled={!isEditing.name}
          onChange={handleChange}
          onIconClick={() => handleEdit("name")}
        />
        <ProfileInput
          label="E-mail"
          type="email"
          name="email"
          value={formData.email}
          disabled={!isEditing.email}
          onChange={handleChange}
          onIconClick={() => handleEdit("email")}
        />
        <ProfileInput
          label="Пароль"
          type="password"
          name="password"
          value={formData.password}
          disabled={!isEditing.password}
          onChange={handleChange}
          onIconClick={() => handleEdit("password")}
        />

        {error && <p className={styles.error}>{error}</p>}

        {hasChanges && (
          <div className={styles.buttons}>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
            <Button type="secondary" size="medium" htmlType="button" onClick={handleCancel}>
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
