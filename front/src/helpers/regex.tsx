export type Regex = {
    "adress": RegExp,
    "name": RegExp;
    "dni": RegExp;
    "lastName": RegExp;
    "email": RegExp;
    "password": RegExp;
    "bDate": RegExp;
    "confirmPassword": RegExp;
    "phone": RegExp;
    "photoURL": RegExp;
};

const regex = (): Regex => {
    return {
        "dni": /^.{6,12}$/, // 6 a 16 digitos.
        "bDate": /^.{6,16}$/, // 6 a 16 digitos.
        "email": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "name": /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
        "lastName": /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
        "adress": /^[a-zA-ZÀ-ÿ\s]{6,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
        "password": /^.{6,16}$/, // 6 a 16 digitos.
        "confirmPassword": /^.{6,16}$/, // 6 a 16 digitos.
        "phone": /^[0-9]{8,9}$/, // 8 a 9 digitos.
        "photoURL": /^[a-zA-ZÀ-ÿ\s]{6,50}$/, // Letras y espacios, pueden llevar acentos, máximo 50 caracteres.
    };
};

export default regex();