import styles from "./Modal.module.css";

interface ModalOverlayProps {
  onClose: () => void;
}

export function ModalOverlay({ onClose }: ModalOverlayProps) {
  return <div className={styles.overlay} onClick={onClose} />;
}
