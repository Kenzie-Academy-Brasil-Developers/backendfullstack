import { Request, Response, NextFunction } from "express"

const removeEmptyMiddleware = ( req:Request, res:Response, next:NextFunction ) => {
    
    const data = req.body

    const newData = Object.entries(data).filter( ([_, value]) => typeof value == 'boolean' ? true : value ? true : false )

    req.body = Object.fromEntries(newData)

    next()
}

export default removeEmptyMiddleware