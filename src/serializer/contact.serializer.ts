import * as yup from "yup"
import { formatDateTimeZoneBr } from "../util/date.util"

export const schemaCreateContact = yup.object().shape({
    fullName: yup
        .string()
        .max(100, "Deve conter no máximo 100 caracteres")
        .required("Deve conter o nome completo"),
    email: yup
        .string()
        .max(150, "Deve conter no máximo 150 caracteres")
        .email("Email inválido")
        .required("Deve conter um email"),
    telephone: yup
        .string()
        .min(12, "Deve conter no minimo 12 caracteres")
        .max(14, "Deve conter no máximo 14 caracteres")
        .required("Deve conter um numero no seguinte formato 'PREFIXO DDD 00000000' ex: 554100000000"),
})

export const schemaUpdateContact = yup.object().shape({
    fullName: yup
        .string()
        .max(100, "Deve conter no máximo 100 caracteres")
        .notRequired(),
    email: yup
        .string()
        .max(150, "Deve conter no máximo 150 caracteres")
        .email("Email inválido")
        .notRequired(),
    telephone: yup
        .string()
        .min(12, "Deve conter no minimo 12 caracteres")
        .max(14, "Deve conter no máximo 14 caracteres")
        .notRequired(),
})

export const serializerObjContact = yup.object().shape({
    updatedAt: yup
        .string()
        .transform( date => formatDateTimeZoneBr(date) )
        .notRequired(),
    createdAt: yup
        .string()
        .transform( date => formatDateTimeZoneBr(date) )
        .notRequired(),
    telephone: yup
        .string()
        .notRequired(),
    email: yup
        .string()
        .notRequired(),
    fullName: yup
        .string()
        .notRequired(),
    id: yup
        .string()
        .notRequired(),
})

export const serializerManyContacts = yup.array( serializerObjContact )