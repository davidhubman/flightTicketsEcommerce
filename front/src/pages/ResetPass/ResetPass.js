import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
// import { auth, sendPasswordResetEmail } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";
import styles from "./ResetPass.module.scss";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { FaEnvelope } from "react-icons/fa";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import { emailValidation, validateForm } from "./validations";
import swal from "sweetalert";

function Reset() {
  const [inputError, setInputError] = useState({
    email: [false, ""],
  });

  const [email, setEmail] = useState("");
  // const [user, loading, error] = useAuthState(auth);
  const [user, loading ] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/user/update");
  }, [user, loading, history]);

  return (
    <section className={styles.resetPage}>
      <GoHomeButton />
      <div className={styles.resetContent}>
        <Link to="/">
          <img src={logo} alt="DevSky Logo" className={styles.resetLogo} />
        </Link>

        <div className={styles.resetInput}>
          <FaEnvelope
            className={
              inputError.email[0]
                ? styles.resetInputIcon + " " + styles.resetInputIconError
                : styles.resetInputIcon
            }
          />
          <input
            className={inputError.email[0] ? styles.resetInputError : ""}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={(e) => emailValidation(e, inputError, setInputError)}
            placeholder="correo@example.com"
            required
          />
          {inputError.email[0] && (
            <span className={styles.resetInputErrorMessage}>
              {inputError.email[1]}
            </span>
          )}
        </div>

        <button
          className={styles.resetButton}
          onClick={(e) => {
            e.preventDefault();

            if (validateForm(email, setInputError)) {
              setEmail("");

              var actionCodeSettings = {
                // After password reset, the user will be give the ability to go back
                // to this page.
                url: 'https://localhost:3000/login',
                handleCodeInApp: true,
              };

              const sendPasswordResetEmail = async (email,actionCodeSettings) => {
                try {
                  await auth.sendPasswordResetEmail(email,actionCodeSettings);
                  swal("Se ha enviado un correo de recuperación", {
                    icon: "success",
                  });
                } catch (err) {
                  swal("No se ha podido enviar el correo", {
                    icon: "error",
                  });
                }
              };

              sendPasswordResetEmail(email,actionCodeSettings);
            }
          }}
        >
          Enviar correo de restablecimiento de contraseña
        </button>

        <Link className={styles.resetRegister} to="/register">
          ¿No tienes cuenta? Registrate
        </Link>
      </div>
    </section>
  );
}
export default Reset;
