import styles from "./Navbar.module.scss";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { auth, db, logout } from "../../firebaseConfig";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [userdelback, setUserdelback] = useState(null);

  useEffect( () => {
     auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    getUser();
     //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  

  const getUser = () => {
    db.collection("users").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      const filtrado = docs.filter((doc) => doc.email === user?.email);
      setUserdelback(filtrado[0]?.photoURL);
    });
  };

  return (
    <div className={styles.navBar} data-aos="fade-down"  data-aos-duration="1200">
      <nav className={styles.nav}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        {/* <div className={styles.user}> */}
          {auth.currentUser ? (
            <div className={styles.user}>
              <div className={styles.userLogin} >
                <Link to="/user" className={styles.userLinkImage}>
                  <img src={userdelback} alt="" className={styles.userImg} />
                </Link>
                <Link className={styles.userLink} to="/user">
                  <span>Perfil</span>
                </Link>
              </div>
              <Link className={styles.userLink} to="/">
                <span onClick={logout}>Cerrar Sesión</span>
              </Link>
            </div>
          ) : (
            <div className={styles.user}>
              <Link className={styles.userLink} to="/login">
                <span>Iniciar Sesión</span>
              </Link>
              <Link className={styles.userLink} to="/register">
                <span>Registrarse</span>
              </Link>
            </div>
          )}
        {/* </div> */}
      </nav>
    </div>
  );
}
