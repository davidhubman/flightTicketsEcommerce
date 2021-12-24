import { Link } from "react-router-dom";
import { IoIosAirplane } from "react-icons/io";
import styles from "./GoHomeButton.module.scss";
export default function GoHomeButton(): JSX.Element {
    return (
        <Link to="/" className={styles.goHomeBtn}>
            <button>
                <IoIosAirplane /> Volver al home
            </button>
        </Link>
    );
}