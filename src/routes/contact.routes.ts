import { Router } from "express"
import addContactController from "../controller/contact/addContact.controller"
import listContactsInUserController from "../controller/contact/listContactsInUser.controller"
import removeContactController from "../controller/contact/removeContact.controller"
import updateContactController from "../controller/contact/updateContact.controller"
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
    listContactsInUserController
)
contactRouter.patch("/:id",
    validIdParamsMiddleware,
    validTokenMiddleware,
    updateContactController
)
contactRouter.delete("/:id",
    validIdParamsMiddleware,
    validTokenMiddleware,
    validDataMiddleware(schemaUpdateContact),
    removeContactController
)