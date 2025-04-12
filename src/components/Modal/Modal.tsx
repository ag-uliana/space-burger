import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "./ModalOverlay";
import styles from "./Modal.module.css";

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div data-testid="modal" className={`${styles.modal} pt-15 pr-15 pb-15 pl-15`}>
        <div className={styles.header}>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
          <div data-testid="modal_closeButton" className={`${styles.closeIcon}`}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>

      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("modals-root")!
  );
}
