import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import styles from "./RegisterPage.module.scss";
import "firebase/auth";
import {
  auth,
  db,
} from "../../firebaseConfig";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import swal from "sweetalert";
import {
  confirmPasswordValidation,
  emailValidation,
  lastNameValidation,
  nameValidation,
  passwordValidation,
  validateForm,
} from "./validations";
import firebase from "firebase/app";

export default function RegisterPage() {
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputError, setInputError] = useState({
    name: [false, ""],
    lastName: [false, ""],
    email: [false, ""],
    password: [false, ""],
    confirmPassword: [false, ""],
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setInput({
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setInputError({
      name: [false, ""],
      lastName: [false, ""],
      email: [false, ""],
      password: [false, ""],
      confirmPassword: [false, ""],
    });
  };


  const newUser = async (data) => {
    try {
       await auth.createUserWithEmailAndPassword(input.email, input.password)
      .then(() => {
        db.collection("users").doc().set({
          uid: auth.currentUser.uid,
          authProvider: auth.currentUser.providerId,
          dni: "",
          email: input.email,
          name: input.name,
          lastName: input.lastName,
          phone: "",
          address: "",
          password: input.password,
          confirmPassword: input.confirmPassword,
          photoURL:
            "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg",
        });
        swal("Exito!", "La cuenta ah sido registrada!", "success").then(
            () => {
              history.push("/user");
            }
        );
      })
        } catch (err){
          if (err.code === "auth/email-already-in-use"){
            await swal({
              title: "Error!",
              text: "El Email ya esta en uso!",
              icon: "error",
              button: "Continue",
            });
          }
        else if(err.code === "auth/weak-password"){
          await swal({
            title: "Contraseña muy débil",
            icon: "error",
            button: "Ok",
          });
        }
        else if(err.code === "auth/invalid-email"){
          await swal({
            title: "Email invalido",
            icon: "error",
            button: "Ok",
          });
        }
        else{
          console.error(err);
          await swal({
            title: "Error al registrar usuario",
            icon: "error",
            button: "Ok",
          });
        }
      }
    }

  const history = useHistory();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
      googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const user = res.user;
      const query = await db
          .collection("users")
          .where("uid", "==", user.uid)
          .get();
      if (query.docs.length === 0) {
        await db.collection("users").add({
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
        history.push("/user");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(input, inputError, setInputError)) {
      newUser().then(r => {
        resetForm();
      });
    }
  };

  return (
    <section className={styles.loginPage}>
      <GoHomeButton />

      <div className={styles.loginPageContent}>
        <Link to="/">
          <img src={logo} alt="Dev-Sky logo" />
        </Link>

        <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e)}>
          {/* --------- Name ------------ */}
          <div className={styles.loginFormInput}>
            <FaUserAlt
              className={
                inputError.name[0]
                  ? styles.loginFormInputIcon +
                    " " +
                    styles.loginFormInputIconError
                  : styles.loginFormInputIcon
              }
            />
            <label htmlFor="name">Nombre</label>
            <input
              autoComplete="off"
              className={inputError.name[0] ? styles.loginFormInputError : ""}
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleInputChange}
              onKeyUp={(e) => nameValidation(e, inputError, setInputError)}
              placeholder="Ingrese su nombre"
            />
            {inputError.name[0] && (
              <span className={styles.loginFormInputErrorMessage}>
                {inputError.name[1]}
              </span>
            )}
          </div>

          {/* --------- Last Name --------- */}
          <div className={styles.loginFormInput}>
            <FaUserAlt
              className={
                inputError.lastName[0]
                  ? styles.loginFormInputIcon +
                    " " +
                    styles.loginFormInputIconError
                  : styles.loginFormInputIcon
              }
            />
            <label htmlFor="last-name">Apellido</label>
            <input
              autoComplete="off"
              className={
                inputError.lastName[0] ? styles.loginFormInputError : ""
              }
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Ingrese su apellido"
              value={input.lastName}
              onChange={handleInputChange}
              onKeyUp={(e) => lastNameValidation(e, inputError, setInputError)}
            />
            {inputError.lastName[0] && (
              <span className={styles.loginFormInputErrorMessage}>
                {inputError.lastName[1]}
              </span>
            )}
          </div>

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
              // autoComplete="on"
              className={inputError.email[0] ? styles.loginFormInputError : ""}
              type="text"
              id="email"
              name="email"
              value={input.email}
              onChange={handleInputChange}
              onKeyUp={(e) => emailValidation(e, inputError, setInputError)}
              placeholder="correo10.sky@edev.com"
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
              value={input.password}
              onChange={handleInputChange}
              onKeyUp={(e) => passwordValidation(e, inputError, setInputError)}
            />
            {inputError.password[0] && (
              <span className={styles.loginFormInputErrorMessage}>
                {inputError.password[1]}
              </span>
            )}
          </div>

          {/* -------  Confirm Password ---------- */}
          <div className={styles.loginFormInput}>
            <RiLockPasswordFill
              className={
                inputError.confirmPassword[0]
                  ? styles.loginFormInputIcon +
                    " " +
                    styles.loginFormInputIconError
                  : styles.loginFormInputIcon
              }
            />
            <label htmlFor="confirmPassword">Password</label>
            <input
              className={
                inputError.confirmPassword[0] ? styles.loginFormInputError : ""
              }
              type="password"
              placeholder="confirme la contraseña"
              id="confirmPassword"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleInputChange}
              onKeyUp={(e) =>
                confirmPasswordValidation(
                  e,
                  inputError,
                  setInputError,
                  input.password
                )
              }
            />
            {inputError.confirmPassword[0] && (
              <span className={styles.loginFormInputErrorMessage}>
                {inputError.confirmPassword[1]}
              </span>
            )}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={input.terms}
                onChange={handleInputChange}
              />
              Acepto los términos y condiciones
              <br/>
               <Link to="/terms" target="_blank" rel="noopener">Ver términos y condiciones</Link>
            </label>
          </div>
          <div>
            <label>
              <input
                  type="checkbox"
                  name="age"
                  checked={input.age}
                  onChange={handleInputChange}
              />
              Tengo más de 18 años
            </label>
          </div>
          <button type="submit" disabled={!input.terms || !input.age}>
            {
              (!input.terms ? "Aceptar Términos y Condiciones" : !input.age ? "Verifica tu Edad" : "Registrarse")
            }
          </button>
        </form>
        <button className={styles.googleBtn} onClick={signInWithGoogle}>
          <FcGoogle />
          Continuar con Google
        </button>
        <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
      </div>
    </section>
  );
}
