import { CityProps } from "./types";
import styles from "./CityCard.module.scss";

export default function CityCard({ name, image }: CityProps): JSX.Element {
  return (
    <div className={styles.cityCard}>
      <h3>{name}</h3>
      <img src={image} alt="" />
    </div>
  );
}
