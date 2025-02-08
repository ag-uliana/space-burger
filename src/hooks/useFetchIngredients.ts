import { useEffect, useState } from "react";
import { Ingredient } from "../types";

export const useFetchIngredients = (url: string) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: Не удалось получить данные`);
      }

      const data = await response.json();
      setIngredients(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
      }
    };

    fetchIngredients();
  }, [url]);

  return { ingredients, error };
};
