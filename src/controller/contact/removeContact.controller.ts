import { Request, Response } from "express"
import removeContactService from "../../service/contact/removeContact.service"

const removeContactController = async ( req:Request, res:Response ) => {
    
    const token = req.token
    const { id:idContact } = req.params
    const resData = await removeContactService( idContact, token )
    return res.status(200).json(resData)
}

export default removeContactController