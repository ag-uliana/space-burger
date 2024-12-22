import { IngredientCard } from "./IngredientCard";
import { useTabs } from "../../hooks";
import { filterIngredients } from "../../utils";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../types";
import styles from "./BurgerIngredients.module.css";

interface BurgerIngredientsProps {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
  onIngredientClick: (ingredient: Ingredient) => void;
}

export function BurgerIngredients({ 
  ingredients,
  onIngredientClick 
}: BurgerIngredientsProps) {
  const { currentTab, handleTabClick, refs } = useTabs();

  const buns = filterIngredients(ingredients, "bun");
  const sauces = filterIngredients(ingredients, "sauce");
  const fillings = filterIngredients(ingredients, "main");

  const renderIngredientList = (
    items: Ingredient[], 
    title: string, 
    ref: React.RefObject<HTMLHeadingElement>,
  ) => (
    <>
      <h3 ref={ref} className="text text_type_main-medium mt-10 mb-6">{title}</h3>
      <div className={styles.items}>
        {items.map((item) => (
          <IngredientCard
            key={item._id}
            ingredient={item}
            count={0}
            onClick={() => onIngredientClick(item)}
          />
        ))}
      </div>
    </>
  );

  return (
    <section className={styles.ingredients}>
      <div className={styles.tabs}>
        <Tab value="buns" active={currentTab === "buns"} onClick={() => handleTabClick("buns")}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === "sauces"} onClick={() => handleTabClick("sauces")}>
          Соусы
        </Tab>
        <Tab value="fillings" active={currentTab === "fillings"} onClick={() => handleTabClick("fillings")}>
          Начинки
        </Tab>
      </div>

      <div className={styles.scrollable}>
        {renderIngredientList(buns, "Булки", refs.buns)}
        {renderIngredientList(sauces, "Соусы", refs.sauces)}
        {renderIngredientList(fillings, "Начинки", refs.fillings)}
      </div>
    </section>
  );
}
