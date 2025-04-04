import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { moveIngredient, removeIngredient } from "../../../services/reducers";
import { useAppDispatch } from "../../../types/hooks";
import { Ingredient } from "../../../types";
import styles from "./DraggableFilling.module.css";

interface DraggableFillingProps {
  item: Ingredient;
  index: number;
}

export function DraggableFilling({ item, index }: DraggableFillingProps) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "filling",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "filling",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        dispatch(moveIngredient({ fromIndex: draggedItem.index, toIndex: index }));
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  dragRef(dropRef(ref));

  return (
    <div ref={ref} className={`${styles.item} ${isDragging ? styles.dragging : ""} ${isOver ? styles.hovered : ""}`}>
      <div className={`${styles.dragIcon}`}>
        <DragIcon type="primary" />
      </div>
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => {
              if (!item.uniqueId) return;
              dispatch(removeIngredient(item.uniqueId));
            }}
        />
    </div>
  );
}
