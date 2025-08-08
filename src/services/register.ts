import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

interface IRegisterUser {
    name: string,
    email: string,
    password: string
}

export async function registerService({ name, email, password}: IRegisterUser){
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if (userWithSameEmail) {
            throw new Error('Email Already Exists')
        }

        const prismaUsersRepository = new PrismaUsersRepository()

        await prismaUsersRepository.create({ name, email, password: passwordHash })

    
}