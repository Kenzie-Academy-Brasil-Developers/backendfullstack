import { IToken } from "../../interface/user.interface"
import Repository from "../../util/repository.util"

const removeUserService = async ( { id }:IToken ) => {
    
    await Repository.user.delete( id )

    return {
        message:"Usuario removido"
    }
}

export default removeUserService