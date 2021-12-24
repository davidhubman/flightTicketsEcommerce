import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import styles from "./Footer.module.scss";

export default function Footer(): JSX.Element {
  const location = useLocation();

  return (
    <footer className={styles.Footer} data-aos="fade-left">
      <div className={styles.FooterContent}>
        {location.pathname === "/" ? (
          <Link to="/">
            <img src={logo} alt="Dev-Sky Logo" />
          </Link>
        ) : (
          <Link to="/">
            <img src={logo} alt="Dev-Sky Logo" />
          </Link>
        )}
        <p>
          &copy; 2021 Dev-Sky. <br /> Todos los derechos reservados.
        </p>
        <Link to="/about-us" >Sobre nosotros</Link>
      </div>
    </footer>
  );
}
