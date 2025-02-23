import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AuthForm.module.css";

interface AuthFormProps {
  title: string;
  fields: { type: "text" | "email" | "password"; placeholder: string; name: string }[];
  buttonText: string;
  onSubmit: (formData: Record<string, string>) => void;
  errorMessage?: string | null;
  bottomText1?: string;
  bottomLinkText1?: string;
  bottomLink1?: string;
  bottomText2?: string;
  bottomLinkText2?: string;
  bottomLink2?: string;
}

export function AuthForm({
  title,
  fields,
  buttonText,
  onSubmit,
  errorMessage,
  bottomText1,
  bottomLinkText1,
  bottomLink1,
  bottomText2,
  bottomLinkText2,
  bottomLink2
}: AuthFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {fields.map((field) => (
          <div key={field.name} className="mb-6">
            <Input
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        {errorMessage && <p className="text text_type_main-default text_color_error mb-4">{errorMessage}</p>}
        <Button type="primary" size="medium" htmlType="submit">{buttonText}</Button>
      </form>

      {bottomText1 && bottomLink1 && bottomLinkText1 && (
        <p className="text text_type_main-default mt-20">
          {bottomText1} <Link to={bottomLink1}>{bottomLinkText1}</Link>
        </p>
      )}

      {bottomText2 && bottomLink2 && bottomLinkText2 && (
        <p className="text text_type_main-default mt-4">
          {bottomText2} <Link to={bottomLink2}>{bottomLinkText2}</Link>
        </p>
      )}
    </div>
  );
}
