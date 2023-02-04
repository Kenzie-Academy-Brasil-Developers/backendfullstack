import { IToken, IUpdateUser } from "../../interface/user.interface"
import { serializerObjContact } from "../../serializer/contact.serializer"
import Repository from "../../util/repository.util"

const updateUserService = async ( data:IUpdateUser, { id }:IToken ) => {

    await Repository.user.update( id, data )

    const user = await Repository.user.findOneBy({ id })

    const serializer = await serializerObjContact.validate( user, {
        stripUnknown:true
    } )

    return {
        message:"Usuario atualizado",
        user:serializer
    }
}

export default updateUserService