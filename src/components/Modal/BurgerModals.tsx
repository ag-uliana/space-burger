import { Modal } from "./Modal";
import { OrderDetails } from "./OrderDetails";
import { IngredientDetails } from "./IngredientDetails";
import { useAppDispatch } from "../../types/hooks";
import { resetOrder, clearCurrentIngredient } from "../../services/reducers";
import { useBurgerState } from "../../hooks/useBurgerState";

export const BurgerModals = () => {
  const dispatch = useAppDispatch();
  const { selectedIngredient, orderId } = useBurgerState();

  return (
    <>
      {selectedIngredient && (
        <Modal onClose={() => dispatch(clearCurrentIngredient())}>
          <IngredientDetails />
        </Modal>
      )}

      {orderId && (
        <Modal onClose={() => dispatch(resetOrder())}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
