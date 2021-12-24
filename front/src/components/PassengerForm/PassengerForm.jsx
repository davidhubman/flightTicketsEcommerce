import { useState } from "react";
import styles from "./PassengerForm.module.scss";
import {
  nameValidation,
  lastNameValidation,
  dniValidation,
  // validateForm,
} from "./validations";
import { FaPassport, FaUserAlt } from "react-icons/fa";

export default function PassengerForm({
  passenger,
  totalPassengers,
  validForms,
  setValidForms,
}) {

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    dni: "",
  });

  const [inputError, setInputError] = useState({
    name: [false, ""],
    lastName: [false, ""],
    dni: [false, ""],
  });

  // const resetForm = () => {
  //   setInput({
  //     name: "",
  //     lastName: "",
  //     dni: "",
  //   });
  //   setInputError({
  //     name: [false, ""],
  //     lastName: [false, ""],
  //     dni: [false, ""],
  //   });
  // };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setValidForms({
      ...validForms,
      [`passenger${passenger}`]: [
        validForms[`passenger${passenger}`][0],
        {
          ...validForms[`passenger${passenger}`][1],
          [e.target.name]: e.target.value,
        },
      ],
    });
  };

  return (
    <form className={styles.form}>
      <h2 className={styles.formTitle}>
        {passenger === 1 && totalPassengers === 1
          ? "Datos del pasajero"
          : `Datos del pasajero ${passenger}`}
      </h2>
      {/* --------- Name ------------ */}
      <div className={styles.formInput}>
        <FaUserAlt
          className={
            inputError.name[0]
              ? styles.formInputIcon + " " + styles.formInputIconError
              : styles.formInputIcon
          }
        />
        <label htmlFor="name">Nombre</label>
        <input
          // required
          autoComplete="off"
          className={inputError.name[0] ? styles.formInputError : ""}
          type="text"
          id="name"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          onKeyUp={(e) => {
            handleInputChange(e);
            nameValidation(e, inputError, setInputError);
          }}
          placeholder="Ingrese su nombre"
        />
        {inputError.name[0] && (
          <span className={styles.formInputErrorMessage}>
            {inputError.name[1]}
          </span>
        )}
      </div>

      {/* --------- Last Name --------- */}
      <div className={styles.formInput}>
        <FaUserAlt
          className={
            inputError.lastName[0]
              ? styles.formInputIcon + " " + styles.formInputIconError
              : styles.formInputIcon
          }
        />
        <label htmlFor="lastName">Apellido</label>
        <input
          // required
          autoComplete="off"
          className={inputError.lastName[0] ? styles.formInputError : ""}
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Ingrese su apellido"
          value={input.lastName}
          onChange={handleInputChange}
          onKeyUp={(e) => {
            handleInputChange(e);
            lastNameValidation(e, inputError, setInputError);
          }}
        />
        {inputError.lastName[0] && (
          <span className={styles.formInputErrorMessage}>
            {inputError.lastName[1]}
          </span>
        )}
      </div>
      {/* --------- DNI ------------ */}
      <div className={styles.formInput}>
        <FaPassport
          className={
            inputError.dni[0]
              ? styles.formInputIcon + " " + styles.formInputIconError
              : styles.formInputIcon
          }
        />
        <label htmlFor="dni">DNI</label>
        <input
          // required
          autoComplete="off"
          className={inputError.dni[0] ? styles.formInputError : ""}
          type="dni"
          id="dni"
          name="dni"
          value={input.dni}
          onChange={handleInputChange}
          onKeyUp={(e) => {
            handleInputChange(e);
            dniValidation(e, inputError, setInputError);
          }}
          placeholder="Ingrese su DNI"
        />
        {inputError.dni[0] && (
          <span className={styles.formInputErrorMessage}>
            {inputError.dni[1]}
          </span>
        )}
      </div>
    </form>
  );
}
