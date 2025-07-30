import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { Link, useLocation } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { 
  selectIngredients, 
  setCurrentIngredient, 
  addIngredient 
} from "../../services/reducers";
import { useTranslation } from "react-i18next";
import { IngredientCard, IngredientCounter } from "../ui";
import { useTabs } from "../../hooks";
import { filterIngredients } from "../../utils";
import { Ingredient } from "../../types";
import styles from "./BurgerIngredients.module.css";

export function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const ingredients = useAppSelector(selectIngredients); 
  const { currentTab, handleTabClick, refs, scrollContainerRef } = useTabs();
  const { t } = useTranslation();

  const buns = filterIngredients(ingredients, "bun");
  const sauces = filterIngredients(ingredients, "sauce");
  const fillings = filterIngredients(ingredients, "main");

  const renderIngredientList = (
    items: Ingredient[],
    title: string,
    ref: React.RefObject<HTMLHeadingElement>
  ) => (
    <>
      <h3 ref={ref} className="text text_type_main-medium mt-10 mb-6">{title}</h3>
      <div className={styles.items}>
        {items.map((item) => (
          <Link
            key={item._id}
            to={`/ingredients/${item._id}`}
            state={{ background: location }}
            className={styles.ingredientLink}
            onClick={() => {
              dispatch(setCurrentIngredient(item));
              dispatch(addIngredient(item));
            }}
          >
            <IngredientCard
              ingredient={item}
              count={<IngredientCounter ingredientId={item._id} />}
            />
          </Link>
      ))}
      </div>
    </>
  );

  return (
    <section className={styles.ingredients}>
      <div className={styles.tabs}>
        <div className={styles.tabWrapper}>
          <Tab value="buns" active={currentTab === "buns"} onClick={() => handleTabClick("buns")}>
            {t('BurgerIngredients.tabBuns')}
          </Tab>
        </div>
        <div className={styles.tabWrapper}>
          <Tab value="sauces" active={currentTab === "sauces"} onClick={() => handleTabClick("sauces")}>
            {t('BurgerIngredients.tabSauces')}
          </Tab>
        </div>
        <div className={styles.tabWrapper}>
          <Tab value="fillings" active={currentTab === "fillings"} onClick={() => handleTabClick("fillings")}>
            {t('BurgerIngredients.tabFillings')}
          </Tab>
        </div>
      </div>

      <div className={styles.scrollable} ref={scrollContainerRef}>
        {renderIngredientList(buns, t('BurgerIngredients.tabBuns'), refs.buns)}
        {renderIngredientList(sauces, t('BurgerIngredients.tabSauces'), refs.sauces)}
        {renderIngredientList(fillings, t('BurgerIngredients.tabFillings'), refs.fillings)}
      </div>
    </section>
  );
}
