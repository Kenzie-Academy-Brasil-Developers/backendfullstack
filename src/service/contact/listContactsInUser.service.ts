import { IToken } from "../../interface/user.interface"
import { serializerManyContacts } from "../../serializer/contact.serializer"
import { paginate } from "../../util/pagination"
import Repository from "../../util/repository.util"

const listContactsInUserService = async ( { id }:IToken, query:object ) => {

    const contacts = await Repository.contact.find({
        where:{ user:{ id } },
        relations:{ user:true }
    })

    const serializer = await serializerManyContacts.validate( contacts, {
        stripUnknown:true
    } )
    
    return {
        message:"Todos os contatos",
        ...paginate({ 
            list:serializer!.reverse(), 
            query 
        })
    }
}

export default listContactsInUserService