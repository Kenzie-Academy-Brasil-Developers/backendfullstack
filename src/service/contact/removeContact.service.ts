import AppError from "../../error/appError"
import { IToken } from "../../interface/user.interface"
import Repository from "../../util/repository.util"

const removeContactService = async ( idContact:string, { id }:IToken ) => {

    const hasContact = await Repository.contact.findOne({ where:{ id:idContact, user:{ id } }, relations:{ user:true } })

    if( !hasContact ){
        throw new AppError("Contato não encontrado", 404)
    }

    await Repository.contact.delete( idContact )
    
    return {
        message:"Contato removido"
    }
}

export default removeContactService