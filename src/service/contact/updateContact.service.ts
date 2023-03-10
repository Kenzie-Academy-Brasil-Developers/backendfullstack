import AppError from "../../error/appError"
import { IUpdateContact } from "../../interface/contact.interface"
import { IToken } from "../../interface/user.interface"
import { serializerObjContact } from "../../serializer/contact.serializer"
import Repository from "../../util/repository.util"

const updateContactService = async ( idContact:string, data:IUpdateContact, { id }:IToken ) => {
    
    const hasContact = await Repository.contact.findOne({ where:{ id:idContact, user:{ id } }, relations:{ user:true } })

    if( !hasContact ){
        throw new AppError("Contato não encontrado", 404)
    }

    if( data?.email ){
        const contactEmail = await Repository.contact.findOne({where:{ email:data.email }, relations:{ user:true }})

        if( contactEmail && contactEmail.user.id === id && contactEmail.id !== idContact ){
            throw new AppError("Email já cadastrado")
        }
    }

    if( data?.telephone ){
        const contactTelephone = await Repository.contact.findOne({where:{ telephone:data.telephone }, relations:{ user:true }})

        if( contactTelephone && contactTelephone.user.id === id && contactTelephone.id !== idContact ){
            throw new AppError("Telefone já cadastrado")
        }
    }

    await Repository.contact.update( idContact, data )

    const contact = await Repository.contact.findOneBy({ id:idContact })

    const serializer = await serializerObjContact.validate( contact, {
        stripUnknown:true
    } )

    return {
        message:"Contato atualizado",
        contact:serializer
    }
}

export default updateContactService