import AppError from "../../error/appError"
import { IAddContact } from "../../interface/contact.interface"
import { IToken } from "../../interface/user.interface"
import { serializerObjContact } from "../../serializer/contact.serializer"
import Repository from "../../util/repository.util"

const addContactService = async ( data:IAddContact, { id }:IToken ) => {

    const hasContactEmail = await Repository.contact.findOne({ where:{ email:data.email, user:{ id } }, relations:{ user:true } })

    if( hasContactEmail ){
        throw new AppError("Já existe um contato com esse email")
    }

    const hasContactTelephone = await Repository.contact.findOne({ where:{ telephone:data.telephone, user:{ id } }, relations:{ user:true } })

    if( hasContactTelephone ){
        throw new AppError("Já existe um contato com esse telefone")
    }

    const userToken = await Repository.user.findOneBy({ id })
    data.user = userToken!

    const createdContact = Repository.contact.create( data )
    await Repository.contact.save( createdContact )

    const serializer = await serializerObjContact.validate( createdContact, {
        stripUnknown:true
    } )

    return {
        message:"Contato adicionado",
        contact:serializer
    }
}

export default addContactService