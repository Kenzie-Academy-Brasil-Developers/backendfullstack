import { IToken } from "../../interface/user.interface"
import Repository from "../../util/repository.util"

const listOneUserService = async ( { id }:IToken ) => {

    const user = await Repository.user.findOneBy({ id })

    return {
        message:"Meu perfil",
        user
    }
}

export default listOneUserService