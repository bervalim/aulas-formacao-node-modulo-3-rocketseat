import { expect, it, describe } from "vitest"
import { UserService } from "./register"
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";


describe('Register Use Case', () => {
     it('should be able to register',  async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new UserService(usersRepository) 

        const { user } = await registerService.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration',  async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new UserService(usersRepository) 

        const { user } = await registerService.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with the same email twice',  async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerService = new UserService(usersRepository) 

        const email = 'johndoe@example.com'

        await registerService.create({
            name: 'John Doe',
            email,
            password: '123456'
        })

        await expect(() =>
          registerService.create({
            name: "John Doe",
            email,
            password: "123456",
          })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    })


})