import "dotenv/config"

import AppError from "../../error/appError"
import { IInitSession } from "../../interface/session.interface"
import Repository from "../../util/repository.util"
import { compareSync } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { messageWelcome } from "../../util/date.util"

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

    return {
        message: messageWelcome( hasEmail ),
        token,
        user:hasEmail
    }
}

export default initSessionService