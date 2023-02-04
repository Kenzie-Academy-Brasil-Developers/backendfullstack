import { Request, Response } from "express"
import listContactsInUserService from "../../service/contact/listContactsInUser.service"

const listContactsInUserController = async ( req:Request, res:Response ) => {
    
    const token = req.token
    const resData = await listContactsInUserService( token )
    return res.status(200).json(resData)
}

export default listContactsInUserController