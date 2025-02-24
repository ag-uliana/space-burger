import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { 
  selectIngredients, 
  setCurrentIngredient, 
  addIngredient 
} from "../../services/reducers";
import { IngredientCard, IngredientCounter } from "../ui";
import { useTabs } from "../../hooks";
import { filterIngredients } from "../../utils";
import { Ingredient } from "../../types";
import styles from "./BurgerIngredients.module.css";

export function BurgerIngredients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector(selectIngredients); 
  const { currentTab, handleTabClick, refs, scrollContainerRef } = useTabs();

  const buns = filterIngredients(ingredients, "bun");
  const sauces = filterIngredients(ingredients, "sauce");
  const fillings = filterIngredients(ingredients, "main");

  const handleIngredientClick = (ingredient: Ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
    dispatch(addIngredient(ingredient));
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: { pathname: location.pathname } }
    });
  };

  const renderIngredientList = (
    items: Ingredient[],
    title: string,
    ref: React.RefObject<HTMLHeadingElement>
  ) => (
    <>
      <h3 ref={ref} className="text text_type_main-medium mt-10 mb-6">{title}</h3>
      <div className={styles.items}>
        {items.map((item) => (
          <IngredientCard
            key={item._id}
            ingredient={item}
            count={<IngredientCounter ingredientId={item._id} />}
            onClick={() => handleIngredientClick(item)}
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

      <div className={styles.scrollable} ref={scrollContainerRef}>
        {renderIngredientList(buns, "Булки", refs.buns)}
        {renderIngredientList(sauces, "Соусы", refs.sauces)}
        {renderIngredientList(fillings, "Начинки", refs.fillings)}
      </div>
    </section>
  );
}
