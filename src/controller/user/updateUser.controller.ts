import { Request, Response } from "express"
import updateUserService from "../../service/user/updateUser.service"

const updateUserController = async ( req:Request, res:Response ) => {
    
    const data = req.body
    const token = req.token
    const resData = await updateUserService( data, token )
    return res.status(200).json(resData)
}

export default updateUserController