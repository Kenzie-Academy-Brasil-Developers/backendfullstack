import { Request, Response, NextFunction } from "express"
import {  ValidationError } from "yup"
import AppError from "../error/appError"
import { schemaValidIdParams } from "../serializer/index.serializer"

const validIdParamsMiddleware = async ( req:Request, res:Response, next:NextFunction ) => {
    const { id } = req.params

    try {
        await schemaValidIdParams.validate( {id}, { 
            stripUnknown:true,
            abortEarly:false
        } )

        next()
    } catch (error) {
        if(error instanceof ValidationError){
            throw new AppError(error.errors[0] ,400);
        }
    }
}

export default validIdParamsMiddleware