import { IToken } from "../../interface/user.interface"
import { serializerObjContact } from "../../serializer/contact.serializer"
import Repository from "../../util/repository.util"

const listOneUserService = async ( { id }:IToken ) => {

    const user = await Repository.user.findOneBy({ id })

    const serializer = await serializerObjContact.validate( user, {
        stripUnknown:true
    } )

    const contacts = await Repository.contact.find({ where:{ user:{ id } }, relations:{ user:true } })

    return {
        message:"Meu perfil",
        amountOfContacts:contacts.length,
        user:serializer
    }
}

export default listOneUserService