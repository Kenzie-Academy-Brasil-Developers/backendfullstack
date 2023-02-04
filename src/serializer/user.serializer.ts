import * as yup from "yup"
import { hashSync } from "bcryptjs"

export const schemaCreateUser = yup.object().shape({
    fullName: yup
        .string()
        .max(100, "Deve conter no máximo 100 caracteres")
        .required("Deve conter o nome completo"),
    email: yup
        .string()
        .max(150, "Deve conter no máximo 150 caracteres")
        .required("Deve conter um email"),
    password: yup
        .string()
        .max(150, "Deve conter no máximo 150 caracteres")
        .transform( pswd => hashSync(pswd, 10) )
        .required("Deve conter um senha"),
    telephone: yup
        .string()
        .min(12, "Deve conter no minimo 12 caracteres")
        .max(14, "Deve conter no máximo 14 caracteres")
        .required("Deve conter um numero no seguinte formato 'PREFIXO DDD 00000000' ex: 554100000000"),
})

export const schemaUpdateUser = yup.object().shape({
    fullName: yup
        .string()
        .max(100, "Deve conter no máximo 100 caracteres")
        .notRequired(),
    email: yup
        .string()
        .max(150, "Deve conter no máximo 150 caracteres")
        .notRequired(),
    password: yup
        .string()
        .max(150, "Deve conter no máximo 150 caracteres")
        .transform( pswd => hashSync(pswd, 10) )
        .notRequired(),
    telephone: yup
        .string()
        .min(12, "Deve conter no minimo 12 caracteres")
        .max(14, "Deve conter no máximo 14 caracteres")
        .notRequired(),
})
