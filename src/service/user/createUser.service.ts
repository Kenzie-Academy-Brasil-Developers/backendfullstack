import AppError from "../../error/appError"
import { ICreateUser } from "../../interface/user.interface"
import { serializerObjContact } from "../../serializer/contact.serializer"
import Repository from "../../util/repository.util"

const createUserService = async ( data:ICreateUser ) => {

    const hasUser = await Repository.user.findOneBy({ email:data.email })

    if( hasUser ){
        throw new AppError("Usuario já existe", 403)
    }

    const createdUser = Repository.user.create( data )
    await Repository.user.save( createdUser )

    const serializer = await serializerObjContact.validate( createdUser, {
        stripUnknown:true
    } )

    return {
        message:"Usuario criado",
        user:serializer
    }
}

export default createUserService