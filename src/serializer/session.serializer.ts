import * as yup from "yup"

export const schemaInitSession = yup.object().shape({
    email: yup
        .string()
        .email("Email inválido")
        .required("Deve conter um email"),
    password: yup
        .string()
        .required("Deve conter uma senha"),
})