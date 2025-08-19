import { expect, it, describe, beforeEach } from "vitest"
import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { CheckinService } from "./check-in";

let checkinRepository: InMemoryCheckinRepository
let sut: CheckinService

describe('Checkin Use Case', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository()
         sut = new CheckinService(checkinRepository) 
    })

     it('should be able to check-in',  async () => {
        const { checkIn } = await sut.create({
           gymId: 'gym-01',
           userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})