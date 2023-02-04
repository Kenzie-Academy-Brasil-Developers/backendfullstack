import { Request, Response } from "express"
import removeUserService from "../../service/user/removeUser.service"

const removeUserController = async ( req:Request, res:Response ) => {
    
    const token = req.token
    const resData = await removeUserService( token )
    return res.status(200).json(resData)
}

export default removeUserController