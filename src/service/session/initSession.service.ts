import "dotenv/config"

import AppError from "../../error/appError"
import { IInitSession } from "../../interface/session.interface"
import Repository from "../../util/repository.util"
import { compareSync } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { messageWelcome } from "../../util/date.util"
import { serializerObjContact } from "../../serializer/contact.serializer"

const initSessionService = async ( data:IInitSession ) => {
    
    const hasEmail = await Repository.user.findOneBy({ email:data.email })

    if( !hasEmail ){
        throw new AppError("Email/senha inváida")
    }

    if( !compareSync( data.password, hasEmail.password ) ){
        throw new AppError("Email/senha inváida")
    }

    const token = sign({}, process.env.SECRET_KEY as string, {
        expiresIn:"1d",
        subject:hasEmail.id
    })

    const serializer = await serializerObjContact.validate( hasEmail, {
        stripUnknown:true
    } )

    
    return {
        message: messageWelcome( hasEmail ),
        token,
        user:serializer
    }
}

export default initSessionService