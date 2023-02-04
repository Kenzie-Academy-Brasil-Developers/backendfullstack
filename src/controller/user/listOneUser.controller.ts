import { Request, Response } from "express"
import listOneUserService from "../../service/user/listOneUser.service"

const listOneUserController = async ( req:Request, res:Response ) => {
    
    const token = req.token
    const resData = await listOneUserService( token )
    return res.status(200).json(resData)
}

export default listOneUserController