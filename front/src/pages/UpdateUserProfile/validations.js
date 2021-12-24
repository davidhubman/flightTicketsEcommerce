import swal from "sweetalert";

export const regex = {
  name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
  lastName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
  // photoURL:
  //   /^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]+(\/[a-zA-Z0-9]+)*(\/[a-zA-Z0-9]+\.[a-zA-Z]+)$/, // URL de imagen.
  phone: /^[0-9]{8,10}$/,
  dni: /^[0-9]{8,10}$/,
  address: /^[(,*.*)a-zA-ZÀ-ÿ0-9_\s]{3,400}$/,
  date: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
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

// export const photoURLValidation = (e, inputError, setInputError) => {
//   const { name, value } = e.target;
//   if (!regex.photoURL.test(value)) {
//     setInputError({
//       ...inputError,
//       [name]: [true, "La URL debe ser una URL de imagen."],
//     });
//   } else {
//     setInputError({
//       ...inputError,
//       [name]: [false, ""],
//     });
//   }
// };

export const phoneValidation = (e, inputError, setInputError) => {
  const { name, value } = e.target;

  if (value.length < 8 || value.length > 10) {
    setInputError({
      ...inputError,
      [name]: [true, "El teléfono debe tener entre 8 y 10 números."],
    });
  } else if (!regex.phone.test(value)) {
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

export const adressValidation = (e, inputError, setInputError) => {
  const { name, value } = e.target;
  if (value.length < 3 || value.length > 40) {
    setInputError({
      ...inputError,
      [name]: [true, "La dirección debe tener entre 3 y 40 caracteres."],
    });
  } else if (!regex.address.test(value)) {
    setInputError({
      ...inputError,
      [name]: [
        true,
        "El campo solo acepta letras, números, espacios, comas y puntos.",
      ],
    });
  } else {
    setInputError({
      ...inputError,
      [name]: [false, ""],
    });
  }
};

// export const dateValidation = (e, inputError, setInputError) => {
//   const { name, value } = e.target;
//   if (!regex.date.test(value)) {
//     setInputError({
//       ...inputError,
//       [name]: [true, "La fecha debe tener el formato dd/mm/yyyy."],
//     });
//   } else {
//     setInputError({
//       ...inputError,
//       [name]: [false, ""],
//     });
//   }
// };

export const validateForm = (input, inputError, setInputError) => {
  let isValid = false;

  // const { name, lastName, photoURL, phone, dni, address, bDate } = input;
  const { name, lastName, photoURL, phone, dni, address } = input;

  //   Campos vacios
  if (
    name === "" ||
    lastName === "" ||
    // photoURL === "" ||
    phone === "" ||
    dni === "" ||
    address === ""
    // bDate === ""
  ) {
    const nameError =
      name === "" ? [true, "Debe completar este campo"] : [false, ""];
    const lastNameError =
      lastName === "" ? [true, "Debe completar este campo"] : [false, ""];
    // const photoURLError =
    //   photoURL === "" ? [true, "Debe cargar una imagen"] : [false, ""];
    const phoneError =
      phone === "" ? [true, "Debe completar este campo"] : [false, ""];
    const dniError =
      dni === "" ? [true, "Debe completar este campo"] : [false, ""];
    const addressError =
      address === "" ? [true, "Debe completar este campo"] : [false, ""];
    // const bDateError =
    //   bDate === "" ? [true, "Debe completar este campo"] : [false, ""];

    setInputError({
      ...inputError,
      name: nameError,
      lastName: lastNameError,
      // photoURL: photoURLError,
      phone: phoneError,
      dni: dniError,
      address: addressError,
      // bDate: bDateError,
    });
    swal("Error", "Debe completar todos los campos", "error");
    return isValid;
  }

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
    swal("Error", "Ningún campo puede estar vacío.", "error");
    return isValid;
  }

  //   Espacios en blanco
  if (
    photoURL.includes(" ") ||
    phone.includes(" ") ||
    dni.includes(" ")
    // bDate.includes(" ")
  ) {
    const photoURLError = photoURL.includes(" ")
      ? [true, "No puede contener espacios"]
      : [false, ""];
    const phoneError = phone.includes(" ")
      ? [true, "No puede contener espacios"]
      : [false, ""];
    const dniError = dni.includes(" ")
      ? [true, "No puede contener espacios"]
      : [false, ""];
    // const bDateError = bDate.includes(" ")
    //   ? [true, "No puede contener espacios"]
    //   : [false, ""];

    setInputError({
      ...inputError,
      photoURL: photoURLError,
      phone: phoneError,
      dni: dniError,
      // bDate: bDateError,
    });
    swal(
      "Error",
      "Los campos de foto de perfil, telefono, DNI y fecha de nacimiento NO deben contener espacios en blanco",
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

  //   Foto de perfil
  if (photoURL === "") {
    // setInputError({
    //   ...inputError,
    //   photoURL: [true, "Debe cargar una imagen"],
    // });
    swal("Error", "Debe cargar una imagen", "error");
    return isValid;
  }

  //   Telefono
  if (!regex.phone.test(phone)) {
    setInputError({
      ...inputError,
      phone: [true, "El campo solo acepta números."],
    });
    swal(
      "Error",
      "El teléfono solo puede contener números y debe tener entre 8 y 10 números.",
      "error"
    );
    return isValid;
  }

  //   DNI
  if (!regex.dni.test(dni)) {
    setInputError({
      ...inputError,
      dni: [true, "El campo solo acepta números."],
    });
    swal(
      "Error",
      "El DNI solo puede contener números y debe tener entre 8 y 10 números.",
      "error"
    );
    return isValid;
  }

  //   Direccion
  if (!regex.address.test(address)) {
    setInputError({
      ...inputError,
      address: [
        true,
        "El campo solo acepta letras, números, espacios, comas y puntos.",
      ],
    });
    swal(
      "Error",
      "La dirección solo acepta letras, números, espacios, comas y puntos.",
      "error"
    );
    return isValid;
  }

  isValid = true;
  return isValid;
};
