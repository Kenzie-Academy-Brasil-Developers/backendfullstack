import AppDataSource from "../data-source";
import Contact from "../entities/contact.entity";
import Users from "../entities/users.entity";

export default class Repository {
    static user = AppDataSource.getRepository(Users)
    static contact = AppDataSource.getRepository(Contact)
}