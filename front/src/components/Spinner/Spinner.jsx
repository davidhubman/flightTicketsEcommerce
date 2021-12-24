import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <section className={styles.spinner}>
      <div className={styles.spinnerContent}>
        <FontAwesomeIcon
          icon={faCircleNotch}
          size="2x"
          className={styles.spinnerLoader}
        />
      </div>
    </section>
  );
}
