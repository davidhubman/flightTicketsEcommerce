// import React, { useCallback, useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "./LoginPage.module.scss";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  // signInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebaseConfig";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import {
  emailValidation,
  passwordValidation,
  validateForm,
} from "./validations";
import swal from "sweetalert";

export default function LoginPage() {
  const [inputError, setInputError] = useState({
    email: [false, ""],
    password: [false, ""],
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/");
  }, [user, loading, history]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setInputError({
      email: [false, ""],
      password: [false, ""],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(email, password, setInputError)) {
      resetForm();

      const signInWithEmailAndPassword = async (email, password) => {
        try {
          await auth.signInWithEmailAndPassword(email, password);
          swal("Success!", "You have successfully logged in!", "success");
        } catch (err) {
          if (err.code === "auth/user-not-found") {
            swal({
              title: "Error!",
              text: "Usuario no Encontrado!",
              icon: "error",
              button: "Continue",
            });
          } else if (err.code === "auth/wrong-password") {
            swal({
              title: "Error!",
              text: "Contraseña Incorrecta!",
              icon: "error",
              button: "Continue",
            });
          } else if (err.code === "auth/invalid-email") {
            swal({
              title: "Error!",
              text: "El Email no es Valido!",
              icon: "error",
              button: "Continue",
            });
          } else {
            console.log(err);
            swal("Error!", err.message, "error");
          }
        }
      };
      signInWithEmailAndPassword(email, password);
    }
  };

  return (
    <section className={styles.loginPage}>
      <GoHomeButton />

      <div className={styles.loginPageContent}>
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Dev-Sky logo" />
        </Link>

        <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e)}>
          {/* --------- Email ---------- */}
          <div className={styles.loginFormInput}>
            <FaEnvelope
              className={
                inputError.email[0]
                  ? styles.loginFormInputIcon +
                    " " +
                    styles.loginFormInputIconError
                  : styles.loginFormInputIcon
              }
            />
            <label htmlFor="email">Email</label>
            <input
              autoComplete="off"
              className={inputError.email[0] ? styles.loginFormInputError : ""}
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={(e) => emailValidation(e, inputError, setInputError)}
              placeholder="correo10.sky@example.com"
            />
            {inputError.email[0] && (
              <span className={styles.loginFormInputErrorMessage}>
                {inputError.email[1]}
              </span>
            )}
          </div>

          {/* --------- Password ------------ */}
          <div className={styles.loginFormInput}>
            <RiLockPasswordFill
              className={
                inputError.password[0]
                  ? styles.loginFormInputIcon +
                    " " +
                    styles.loginFormInputIconError
                  : styles.loginFormInputIcon
              }
            />
            <label htmlFor="password">Password</label>
            <input
              className={
                inputError.password[0] ? styles.loginFormInputError : ""
              }
              type="password"
              placeholder="contraseña"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => passwordValidation(e, inputError, setInputError)}
            />
            {inputError.password[0] && (
              <span className={styles.loginFormInputErrorMessage}>
                {inputError.password[1]}
              </span>
            )}
          </div>

          {/* Link para reestablecer contraseña */}
          <Link to="/reset">¿Olvidaste tu contraseña?</Link>

          {/* Iniciar sesión con correo */}
          <button
            type="submit"
            className="login__btn"
            // onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Iniciar sesión
          </button>
        </form>

        {/* Iniciar sesión con Google */}
        <button className={styles.googleBtn} onClick={signInWithGoogle}>
          <FcGoogle />
          Iniciar Sesión con Google
        </button>

        {/* Link de registro */}
        <Link to="/register">¿No tienes cuenta? Registrate</Link>
      </div>
    </section>
  );
}
