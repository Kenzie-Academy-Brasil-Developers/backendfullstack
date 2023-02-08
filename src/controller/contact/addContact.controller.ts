import { Request, Response } from "express"
import addContactService from "../../service/contact/addContact.service"

const addContactController = async ( req:Request, res:Response ) => {
    
    const token = req.token
    const data = req.body
    const resData = await addContactService( data, token )
    return res.status(201).json(resData)
}

export default addContactController