import { Router } from "express"
import addContactController from "../controller/contact/addContact.controller"
import listContactsInUserController from "../controller/contact/listContactsInUser.controller"
import removeContactController from "../controller/contact/removeContact.controller"
import updateContactController from "../controller/contact/updateContact.controller"
import paginationMiddleware from "../middleware/pagination.middleware"
import removeEmptyMiddleware from "../middleware/removeEmpty.middleware"
import validDataMiddleware from "../middleware/validData.middleware"
import validIdParamsMiddleware from "../middleware/validIdParms.middleware"
import validTokenMiddleware from "../middleware/validToken.middleware"
import { schemaCreateContact, schemaUpdateContact } from "../serializer/contact.serializer"

export const contactRouter = Router()

contactRouter.post("",
    validTokenMiddleware,
    validDataMiddleware(schemaCreateContact),
    addContactController
)
contactRouter.get("",
    validTokenMiddleware,
    paginationMiddleware,
    listContactsInUserController
)
contactRouter.patch("/:id",
    validTokenMiddleware,
    validIdParamsMiddleware,
    removeEmptyMiddleware,
    validDataMiddleware(schemaUpdateContact),
    updateContactController
)
contactRouter.delete("/:id",
    validTokenMiddleware,
    validIdParamsMiddleware,
    removeContactController
)