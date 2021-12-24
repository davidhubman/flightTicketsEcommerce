import swal from "sweetalert";

export const regex = {
  name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
  lastName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
  email:
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  strictPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
  // 6 - 12 caracteres, 1 letra minúscula, 1 letra mayúscula, 1 número y 1 caracter especial.
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

export const emailValidation = (e, inputError, setInputError) => {
  const { id, value } = e.target;
  if (value.includes(" ")) {
    setInputError({
      ...inputError,
      [id]: [true, "No puede contener espacios en blanco"],
    });
    return;
  }
  if (!regex.email.test(value)) {
    setInputError({
      ...inputError,
      [id]: [
        true,
        "Debe tener un formato de correo electrónico válido, ejemplo: correo10.sky@dev.com",
      ],
    });
    return;
  }
  setInputError({ ...inputError, [id]: [false, ""] });
};

export const passwordValidation = (e, inputError, setInputError) => {
  const { id, value } = e.target;
  if (value.length < 6 || value.length > 12) {
    setInputError({
      ...inputError,
      [id]: [true, "Debe tener como minimo 6 caracteres y máximo 12"],
    });
    return;
  }
  if (value.includes(" ")) {
    setInputError({
      ...inputError,
      [id]: [true, "No puede contener espacios en blanco"],
    });
    return;
  }
  if (!regex.strictPassword.test(value)) {
    setInputError({
      ...inputError,
      [id]: [
        true,
        "Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial",
      ],
    });
    return;
  }
  setInputError({ ...inputError, [id]: [false, ""] });
};

export const confirmPasswordValidation = (
  e,
  inputError,
  setInputError,
  password
) => {
  const { id, value } = e.target;
  if (value !== password) {
    setInputError({
      ...inputError,
      [id]: [true, "Las contraseñas no coinciden"],
    });
    return;
  }
  setInputError({ ...inputError, [id]: [false, ""] });
};

export const validateForm = (input, inputError, setInputError) => {
  let isValid = false;
  const { name, lastName, email, password, confirmPassword } = input;

  //   Campos de nombre y apellido vacios (trim)
  if (name.trim() === "" || lastName.trim() === "") {
    const nameError =
      name === "" ? [true, "Debe completar este campo"] : [false, ""];
    const lastNameError =
      lastName === "" ? [true, "Debe completar este campo"] : [false, ""];
    setInputError({
      ...inputError,
      name: nameError,
      lastName: lastNameError,
    });
    swal("Error", "Los campos de nombre y apellido son obligatorios", "error");
    return isValid;
  }
  //   Campos vacios
  if (
    email === "" ||
    password === "" ||
    name === "" ||
    lastName === "" ||
    confirmPassword === ""
  ) {
    const emailError =
      email === "" ? [true, "Debe completar este campo"] : [false, ""];
    const passwordError =
      password === "" ? [true, "Debe completar este campo"] : [false, ""];
    const nameError =
      name === "" ? [true, "Debe completar este campo"] : [false, ""];
    const lastNameError =
      lastName === "" ? [true, "Debe completar este campo"] : [false, ""];
    const confirmPasswordError =
      confirmPassword === ""
        ? [true, "Debe completar este campo"]
        : [false, ""];
    setInputError({
      ...inputError,
      email: emailError,
      password: passwordError,
      name: nameError,
      lastName: lastNameError,
      confirmPassword: confirmPasswordError,
    });
    swal("Error", "Debe completar todos los campos", "error");
    return isValid;
  }

  //   Espacios en blanco
  if (
    email.includes(" ") ||
    password.includes(" ") ||
    confirmPassword.includes(" ")
  ) {
    const emailError = email.includes(" ")
      ? [true, "No puede contener espacios en blanco"]
      : [false, ""];
    const passwordError = password.includes(" ")
      ? [true, "No puede contener espacios en blanco"]
      : [false, ""];
    const confirmPasswordError = confirmPassword.includes(" ")
      ? [true, "No puede contener espacios en blanco"]
      : [false, ""];
    setInputError({
      ...inputError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    swal(
      "Error",
      "Los campos de contraseña y correo NO deben contener espacios en blanco",
      "error"
    );
    return isValid;
  }

  // Nombre sin numeros
  if (!regex.name.test(name)) {
    setInputError({
      ...inputError,
      name: [true, "El campo solo acepta letras y espacios."],
    });
    swal(
      "Error",
      "El nombre no puede contener números ni caracteres especiales ",
      "error"
    );
    return isValid;
  }

  // Apellido sin numeros
  if (!regex.lastName.test(lastName)) {
    setInputError({
      ...inputError,
      lastName: [true, "El campo solo acepta letras y espacios."],
    });
    swal(
      "Error",
      "El apellido no puede contener números ni caracteres especiales ",
      "error"
    );
    return isValid;
  }

  //   Formato de correo electrónico
  if (!regex.email.test(email)) {
    const emailError = [
      true,
      "Debe tener un formato de correo electrónico válido, ejemplo: correo10.sky@dev.com",
    ];
    setInputError({ ...inputError, email: emailError });
    swal(
      "Error",
      "Debe tener un formato de correo electrónico válido",
      "error"
    );
    return isValid;
  }

  //  Formato de contraseña
  if (!regex.strictPassword.test(password)) {
    const passwordError = [
      true,
      "Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial",
    ];
    setInputError({ ...inputError, password: passwordError });
    swal(
      "Error",
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial",
      "error"
    );
    return isValid;
  }

  //   Contraseñas iguales
  if (password !== confirmPassword) {
    const confirmPasswordError = [true, "Las contraseñas no coinciden"];
    setInputError({ ...inputError, confirmPassword: confirmPasswordError });
    swal("Error", "Las contraseñas no coinciden", "error");
    return isValid;
  }

  isValid = true;
  return isValid;
};
