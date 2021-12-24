import swal from "sweetalert";

export const regex = {
  name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
  lastName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
  dni: /^[0-9]{8,10}$/,
};

export const nameValidation = (e, inputError, setInputError) => {
  const { name, value } = e.target;
  if (value.length < 3 || value.length > 40) {
    setInputError({
      ...inputError,
      [name]: [true, "El nombre debe tener entre 3 y 40 caracteres."],
    });
  } else if (!regex.name.test(value)) {
    setInputError({
      ...inputError,
      [name]: [true, "El campo solo acepta letras y espacios."],
    });
  } else {
    setInputError({
      ...inputError,
      [name]: [false, ""],
    });
  }
};

export const lastNameValidation = (e, inputError, setInputError) => {
  const { name, value } = e.target;
  if (value.length < 3 || value.length > 40) {
    setInputError({
      ...inputError,
      [name]: [true, "El apellido debe tener entre 3 y 40 caracteres."],
    });
  } else if (!regex.lastName.test(value)) {
    setInputError({
      ...inputError,
      [name]: [true, "El campo solo acepta letras y espacios."],
    });
  } else {
    setInputError({
      ...inputError,
      [name]: [false, ""],
    });
  }
};

export const dniValidation = (e, inputError, setInputError) => {
  const { name, value } = e.target;

  if (value.length < 8 || value.length > 10) {
    setInputError({
      ...inputError,
      [name]: [true, "El DNI debe tener entre 8 y 10 números."],
    });
  } else if (!regex.dni.test(value)) {
    setInputError({
      ...inputError,
      [name]: [true, "El campo solo acepta números."],
    });
  } else {
    setInputError({
      ...inputError,
      [name]: [false, ""],
    });
  }
};

export const validateForm = (
  passengerIndex,
  passengerData,
  validForms,
  setValidForms
) => {
  let isValid = false;

  const { name, lastName, dni } = passengerData;

  //   Campos vacios
  if (name === "" || lastName === "" || dni === "") {
    return swal(
      "Error",
      "Debe completar todos los campos del pasajero " +
        passengerIndex[passengerIndex.length - 1],
      "error"
    );
  }

  //   Campos de nombre y apellido vacios (trim)
  if (name.trim() === "" || lastName.trim() === "") {
    return swal("Error", "Ningún campo puede estar vacío.", "error");
  }

  // Nombre y apellido sin números
  if (!regex.name.test(name) || !regex.lastName.test(lastName)) {
    return swal(
      "Error",
      "Los campos de nombre y apellido no deben contener números ni caracteres especiales y deben tener entre 3 y 40 caracteres.",
      "error"
    );
  }

  //   DNI
  if (!regex.dni.test(dni) || dni.includes(" ")) {
    return swal(
      "Error",
      "El DNI no pude contener letras, espacios ni caracteres especiales, solo puede contener entre 8 y 10 números.",
      "error"
    );
  }

  isValid = true;
  const newValue = [true, passengerData];
  setValidForms({
    ...validForms,
    [passengerIndex]: newValue,
  });
  return isValid;
};
