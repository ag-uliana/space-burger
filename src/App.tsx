import { useState } from "react";
import { 
  AppHeader, 
  BurgerIngredients,
  BurgerConstructor,
  OrderDetails,
  IngredientDetails,
  Modal
} from "./components";
import { useFetchIngredients } from "./hooks";
import { API_URL } from "./constants";
import { Ingredient } from "./types";
import styles from './App.module.css';

export default function App() {
  const { ingredients, error } = useFetchIngredients(API_URL);
  const [bun, setBun] = useState<Ingredient | null>(null);
  const [fillings, setFillings] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (ingredient.type === "bun") {
      setBun(ingredient);
    } else {
      setFillings((prev) => [...prev, ingredient]);
    }
  };

  const handleRemoveFilling = (id: string) => {
    setFillings((prev) => prev.filter((item) => item._id !== id));
  };

  const handleIngredientRightClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleOrderClick = () => {
    setIsOrderModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedIngredient(null);
    setIsOrderModalOpen(false);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={styles.main}>
        <div className={styles.columns}>
          {error ? (
            <p className="text text_type_main-medium mt-10">{error}</p>
          ) : (
            <>
              <div className={styles.ingredientsColumn}>
                <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>
                <BurgerIngredients
                  ingredients={ingredients}
                  onAddIngredient={handleAddIngredient}
                  onIngredientClick={handleIngredientRightClick}
                />
              </div>
              <div className={`${styles.constructorColumn} mt-25 ml-10`}>
                <BurgerConstructor
                  bun={bun}
                  fillings={fillings}
                  onRemoveFilling={handleRemoveFilling}
                  onOrderClick={handleOrderClick}
                />
              </div>
            </>
          )}
        </div>
      </main>

      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}

      {isOrderModalOpen && (
        <Modal title=" " onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

