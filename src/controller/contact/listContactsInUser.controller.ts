import { Request, Response } from "express"
import listContactsInUserService from "../../service/contact/listContactsInUser.service"

const listContactsInUserController = async ( req:Request, res:Response ) => {
    
    const token = req.token
    const query = req.query
    const resData = await listContactsInUserService( token, query )
    return res.status(200).json(resData)
}

export default listContactsInUserController