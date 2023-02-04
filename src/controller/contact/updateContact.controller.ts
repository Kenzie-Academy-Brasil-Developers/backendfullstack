import { Request, Response } from "express"
import updateContactService from "../../service/contact/updateContact.service"

const updateContactController = async ( req:Request, res:Response ) => {
    
    const data = req.body
    const token = req.token
    const { id:idContact } = req.params
    const resData = await updateContactService( idContact, data, token )
    return res.status(200).json(resData)
}

export default updateContactController