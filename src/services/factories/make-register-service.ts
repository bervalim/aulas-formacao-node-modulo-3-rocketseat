import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserService } from "../register";

export function makeRegisterService() {
    const usersRepository = new PrismaUsersRepository();
    const userService = new UserService(usersRepository);

    return userService
}