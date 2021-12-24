import { useEffect, useState } from "react";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import styles from "./UpdateUserProfile.module.scss";
// import regex from "../../helpers/regex";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import {
  // FaBirthdayCake,
  // FaEnvelope,
  FaFileUpload,
  FaHome,
  FaPassport,
  FaPhone,
  FaPhotoVideo,
  FaUserAlt,
} from "react-icons/fa";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { auth, db, storage } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  adressValidation,
  // dateValidation,
  dniValidation,
  lastNameValidation,
  nameValidation,
  phoneValidation,
  // photoURLValidation,
  validateForm,
} from "./validations";

export default function UpdateUserProfile() {
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    photoURL: "",
    phone: "",
    dni: "",
    address: "",
  });

  const [inputError, setInputError] = useState({
    name: [false, ""],
    lastName: [false, ""],
    photoURL: [false, ""],
    phone: [false, ""],
    dni: [false, ""],
    address: [false, ""],
  });

  const resetForm = () => {
    setInput({
      name: "",
      lastName: "",
      photoURL: "",
      phone: "",
      dni: "",
      address: "",
    });
    setInputError({
      name: [false, ""],
      lastName: [false, ""],
      photoURL: [false, ""],
      phone: [false, ""],
      dni: [false, ""],
      address: [false, ""],
    });
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const [usuario, setUsuario] = useState([]);
  const [value, setValue] = useState({ uploadValue: 0, picture: null });

  const history = useHistory();

  const handleUpload = (e) => {
    const image = e.target.files[0];
    const storageRef = storage.ref(`/imageProfile/${image.name}`);
    const task = storageRef.put(image);

    task.on(
      "state_changed",
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setValue({ uploadValue: percentage, picture: image });
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        setValue({
          uploadValue: 100,
          picture: task.snapshot.ref.fullPath,
        });
        task.snapshot.ref.getDownloadURL().then((url) => {
          setInput({ ...input, photoURL: url });
        });
      }
    );
  };

  const getUser = () => {
    db.collection("users").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      const filtrado = docs.filter((doc) => doc.email === user.email);
      setUsuario(filtrado);
    });
  };

  const updateUser = () => {
    db.collection("users")
      .doc(usuario[0].id)
      .set({
        dni: input.dni,
        name: input.name,
        lastName: input.lastName,
        phone: input.phone,
        address: input.address,
        photoURL: input.photoURL,
        uid: auth.currentUser.uid,
        authProvider: auth.currentUser.providerId,
        email: auth.currentUser.email,
      })
      .then((r) => {
        swal({
          title: "Datos actualizados",
          icon: "success",
          button: "Ok",
        }).then((r) => history.push("/user"));
      })
      .catch((error) => {
            if (error.code === "auth/user-not-found") {
              swal({
                title: "Usuario no encontrado",
                icon: "error",
                button: "Ok",
              })
            } else {
              swal({
                title: "Error al actualizar",
                icon: "error",
                button: "Ok",
              })
            }
          });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(input, inputError, setInputError)) {
      resetForm();
      updateUser();
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    getUser();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, history]);

  return (
    <section className={styles.updatePage}>
      <GoHomeButton />
      <div className={styles.updatePageContent}>
        <img src={logo} alt="Dev-Sky logo" />
        <h2 className={styles.updatePageTitle}>Actualizar perfil</h2>
        <form
          className={styles.updatePageForm}
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* --------- Name ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaUserAlt
              className={
                inputError.name[0]
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="name">Nombre</label>
            <input
              // required
              autoComplete="off"
              className={
                inputError.name[0] ? styles.updatePageFormInputError : ""
              }
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleInputChange}
              onKeyUp={(e) => nameValidation(e, inputError, setInputError)}
              placeholder="Ingrese su nombre"
            />
            {inputError.name[0] && (
              <span className={styles.updatePageFormInputErrorMessage}>
                {inputError.name[1]}
              </span>
            )}
          </div>

          {/* --------- Last Name --------- */}
          <div className={styles.updatePageFormInput}>
            <FaUserAlt
              className={
                inputError.lastName[0]
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="lastName">Apellido</label>
            <input
              // required
              autoComplete="off"
              className={
                inputError.lastName[0] ? styles.updatePageFormInputError : ""
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
              <span className={styles.updatePageFormInputErrorMessage}>
                {inputError.lastName[1]}
              </span>
            )}
          </div>

          {/* --------- Foto de perfil ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaPhotoVideo
              className={
                inputError.photoURL[0]
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="photoURL">Foto de perfil</label>
            <input
              // required
              autoComplete="off"
              className={
                inputError.photoURL[0] ? styles.updatePageFormInputError : ""
              }
              type="text"
              id="photoURL"
              disabled
              name="photoURL"
              value={input.photoURL}
              onChange={handleInputChange}
              // onKeyUp={(e) => photoURLValidation(e, inputError, setInputError)}
              placeholder="https://foto-de-perfil.jpg"
            />
          </div>
          <progress value={value.uploadValue} max="100" />
          <button type="button" className={styles.inputFile}>
            <FaFileUpload />
            Cargar imagen
            <input
              className={styles.inputFileBtn}
              type="file"
              accept="image/*"
              id="photoURL"
              name="photoURL"
              onChange={handleUpload}
            />
          </button>

          {/* --------- Phone ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaPhone
              className={
                inputError.phone[0]
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="phone">Número de teléfono</label>
            <input
              // required
              autoComplete="off"
              className={
                inputError.phone[0] ? styles.updatePageFormInputError : ""
              }
              type="phone"
              id="phone"
              name="phone"
              value={input.phone}
              onChange={handleInputChange}
              onKeyUp={(e) => phoneValidation(e, inputError, setInputError)}
              placeholder="Ingrese su número de teléfono"
            />
            {inputError.phone[0] && (
              <span className={styles.updatePageFormInputErrorMessage}>
                {inputError.phone[1]}
              </span>
            )}
          </div>

          {/* --------- DNI ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaPassport
              className={
                inputError.dni[0]
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="dni">DNI</label>
            <input
              // required
              autoComplete="off"
              className={
                inputError.dni[0] ? styles.updatePageFormInputError : ""
              }
              type="dni"
              id="dni"
              name="dni"
              value={input.dni}
              onChange={handleInputChange}
              onKeyUp={(e) => dniValidation(e, inputError, setInputError)}
              placeholder="Ingrese su DNI"
            />
            {inputError.dni[0] && (
              <span className={styles.updatePageFormInputErrorMessage}>
                {inputError.dni[1]}
              </span>
            )}
          </div>

          {/* --------- Dirección ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaHome
              className={
                inputError.address[0]
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="address">Dirección</label>
            <input
              // required
              autoComplete="off"
              className={
                inputError.address[0] ? styles.updatePageFormInputError : ""
              }
              type="text"
              id="address"
              name="address"
              value={input.address}
              onChange={handleInputChange}
              onKeyUp={(e) => adressValidation(e, inputError, setInputError)}
              placeholder="Ingrese su dirección"
            />
            {inputError.address[0] && (
              <span className={styles.updatePageFormInputErrorMessage}>
                {inputError.address[1]}
              </span>
            )}
          </div>
          {/* Buttons */}
          <div className={styles.updatePageButtonsContainer}>
            <Link to="/user">
              <button type="submit">Cancelar</button>
            </Link>
            <button type="submit">Actualizar perfil</button>
          </div>
        </form>
      </div>
    </section>
  );
}
