import styles from './PlaceholderElement.module.css';

interface PlaceholderElementProps {
    text: string;
    type?: "top" | "bottom" | "filling";
  }
  
  export function PlaceholderElement({ text, type = "filling" }: PlaceholderElementProps) {
    return (
      <div className={`${styles.placeholderItem} ${styles[type]}`}>
        <p className="text text_type_main-default text_color_inactive">{text}</p>
      </div>
    );
  }
