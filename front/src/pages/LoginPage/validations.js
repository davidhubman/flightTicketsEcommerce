import swal from "sweetalert";

export const regex = {
  email:
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  password: /^.{6,12}$/, // 6 a 16 digitos.
  strictPassword:
  /^.{6,}$/,
  // strictPassword:
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
  // 6 caracteres, 1 letra minúscula, 1 letra mayúscula, 1 número y 1 caracter especial.
};

export const passwordValidation = (e, inputError, setInputError) => {
  const { id, value } = e.target;
  if (value.length < 6) {
    setInputError({
      ...inputError,
      [id]: [true, "Debe tener como minimo 6 caracteres"],
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
        "Debe tener como minimo 6 caracteres",
      ],
    });
    return;
  }
  setInputError({ ...inputError, [id]: [false, ""] });
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
        "Debe tener un formato de correo electrónico válido, ejemplo: correo10.sky@dv.com",
      ],
    });
    return;
  }
  setInputError({ ...inputError, [id]: [false, ""] });
};

export const validateForm = (email, password, setInputError) => {
  let isValid = false;

  //   Campos vacios
  if (email === "" || password === "") {
    const emailError =
      email === "" ? [true, "Debe completar este campo"] : [false, ""];
    const passwordError =
      password === "" ? [true, "Debe completar este campo"] : [false, ""];
    setInputError({
      email: emailError,
      password: passwordError,
    });
    swal("Error", "Debe completar todos los campos", "error");
    return isValid;
  }

  //   Espacios en blanco
  if (email.includes(" ") || password.includes(" ")) {
    const emailError = email.includes(" ")
      ? [true, "No puede contener espacios en blanco"]
      : [false, ""];
    const passwordError = password.includes(" ")
      ? [true, "No puede contener espacios en blanco"]
      : [false, ""];
    setInputError({
      email: emailError,
      password: passwordError,
    });
    swal("Error", "Los campos no deben contener espacios en blanco", "error");
    return isValid;
  }

  //   Formato de correo electrónico
  if (!regex.email.test(email)) {
    swal(
      "Error",
      "Debe tener un formato de correo electrónico válido",
      "error"
    );
    return isValid;
  }

  //  Formato de contraseña
  if (!regex.strictPassword.test(password)) {
    swal(
      "Error",
      "Debe tener como minimo 6 caracteres",
      "error"
    );
    return isValid;
  }

  isValid = true;
  return isValid;
};
