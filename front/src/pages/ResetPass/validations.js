import swal from "sweetalert";

export const regex = {
  email:
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
};

export const emailValidation = (e, inputError, setInputError) => {
  const { value } = e.target;
  if (value.includes(" ")) {
    setInputError({
      email: [true, "No puede contener espacios en blanco"],
    });
    return;
  }
  if (!regex.email.test(value)) {
    setInputError({
      email: [
        true,
        "Debe tener un formato de correo electrónico válido, ejemplo: correo10.sky@dev.com",
      ],
    });
    return;
  }
  setInputError({ email: [false, ""] });
};

export const validateForm = (email, setInputError) => {
  let isValid = false;

  // Campo vacio
  if (email === "") {
    const emailError =
      email === "" ? [true, "Debe completar este campo"] : [false, ""];
    setInputError({
      email: emailError,
    });
    swal("Error", "Debe completar todos los campos", "error");
    return isValid;
  }

  //   Espacios en blanco
  if (email.includes(" ")) {
    const emailError = email.includes(" ")
      ? [true, "No puede contener espacios en blanco"]
      : [false, ""];
    setInputError({
      email: emailError,
    });
    swal("Error", "El correo no debe contener espacios en blanco", "error");
    return isValid;
  }

  //   Formato de correo electrónico
  if (!regex.email.test(email)) {
    const emailError = !regex.email.test(email)
      ? [
          true,
          "Debe tener un formato de correo válido. Ej; correo10.sky@dev.com",
        ]
      : [false, ""];
    setInputError({
      email: emailError,
    });
    swal(
      "Error",
      "Debe tener un formato de correo electrónico válido",
      "error"
    );
    return isValid;
  }

  isValid = true;
  return isValid;
};
