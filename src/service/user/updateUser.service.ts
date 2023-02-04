import { IToken, IUpdateUser } from "../../interface/user.interface"
import Repository from "../../util/repository.util"

const updateUserService = async ( data:IUpdateUser, { id }:IToken ) => {

    await Repository.user.update( id, data )

    const user = await Repository.user.findOneBy({ id })

    return {
        message:"Usuario atualizado",
        user
    }
}

export default updateUserService