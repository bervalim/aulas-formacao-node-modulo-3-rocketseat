import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists.error"
import { User } from "@prisma/client"

interface IRegisterUser {
    name: string,
    email: string,
    password: string
}

interface IRegisterResponse {
    user: User
}

export class UserService {
    constructor(private usersRepository: UsersRepository){}

    async create({ name, email, password}: IRegisterUser): Promise<IRegisterResponse> {
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)
            
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({ name, email, password: passwordHash })

        return { user }
    }
}
