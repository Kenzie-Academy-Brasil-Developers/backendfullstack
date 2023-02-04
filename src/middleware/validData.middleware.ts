import { Request, Response, NextFunction } from "express"
import { SchemaOf, ValidationError } from "yup"
import AppError from "../error/appError"

const validDataMiddleware = (  serializer:SchemaOf<any> ) => async ( req:Request, res:Response, next:NextFunction ) => {
    const data = req.body

    const validData = Object.fromEntries(Object.entries(data).filter( property => property[1] ))

    try {
        const resData = await serializer.validate( validData, { 
            stripUnknown:true,
            abortEarly:false
        } )
    
        req.body = resData

        next()
    } catch (error) {
        if(error instanceof ValidationError){
            throw new AppError(error.errors as any, 400);
        }
    }
}

export default validDataMiddleware