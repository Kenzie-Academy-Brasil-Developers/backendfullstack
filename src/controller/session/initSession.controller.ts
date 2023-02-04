import { Request, Response } from "express"
import initSessionService from "../../service/session/initSession.service"

const initSessionController = async ( req:Request, res:Response ) => {
    
    const data = req.body
    const resData = await initSessionService( data )
    return res.status(200).json(resData)
}

export default initSessionController