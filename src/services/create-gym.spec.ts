import { expect, it, describe, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./create-gym";

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Gym Use Case', () => {
    beforeEach(() => {
         gymsRepository = new InMemoryGymsRepository()
         sut = new CreateGymService(gymsRepository) 
    })

     it('should be able to create a Gym',  async () => {
        const { gym } = await sut.create({
          name: "John Doe Gym",
          description: null,
          phone: null,
          latitude: -25.4608646,
          longitude: -49.2765184,
        });

        expect(gym.id).toEqual(expect.any(String))
    })

  
})