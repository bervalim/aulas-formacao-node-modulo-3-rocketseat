import { expect, it, describe, beforeEach, afterEach, vi } from "vitest"
import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { ValidateCheckinService } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

let checkinRepository: InMemoryCheckinRepository
let sut: ValidateCheckinService

describe('Checkin Use Case', () => {
    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new ValidateCheckinService(checkinRepository) 
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

     it("should be able to validate the check-in", async () => {
        const createdCheckIn = await checkinRepository.create({
            gymId: 'gym-01',
            userId: 'user-01'
        })
        
        const {checkIn} = await sut.execute({
            checkinId: createdCheckIn.id
       });

       expect(checkIn.validated_at).toEqual(expect.any(Date));
       expect(checkinRepository.items[0].validated_at).toEqual(expect.any(Date))
     });

     it("should be able to validate an inexistent check-in", async () => {
       await expect(() =>
         sut.execute({
           checkinId: "inexistent-checkin-id",
         })
       ).rejects.toBeInstanceOf(ResourceNotFoundError)
     });

     it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

        const createdCheckIn = await checkinRepository.create({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        vi.advanceTimersByTime(1000 * 60 * 21)
        
        await expect(() =>
         sut.execute({
           checkinId: createdCheckIn.id,
         })
       ).rejects.toBeInstanceOf(LateCheckInValidationError)

     })

})