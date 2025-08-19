import { expect, it, describe, beforeEach } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileService } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
      usersRepository = new InMemoryUsersRepository();
      sut = new GetUserProfileService(usersRepository);
    });

     it('should be able to get user profile ',  async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('123456',6)
        })

        const { user } = await sut.execute({
             userId: createdUser.id
        }
        )

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')
    })

    it('should not able to get user profile with wrong id',  async () => {
        expect(() => sut.execute({
            userId: 'non-existing-id'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)

    })
     
})