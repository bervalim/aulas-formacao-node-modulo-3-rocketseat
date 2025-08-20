import { expect, it, describe, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { CheckinService } from "./check-in";

let checkinRepository: InMemoryCheckinRepository
let sut: CheckinService

describe('Checkin Use Case', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new CheckinService(checkinRepository) 

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

     it("should be able to check-in", async () => {
       const { checkIn } = await sut.create({
         gymId: "gym-01",
         userId: "user-01",
       });

       expect(checkIn.id).toEqual(expect.any(String));
     });

      it("should  not be able to check-in twice in the same day", async () => {
        vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

        await sut.create({
          gymId: "gym-01",
          userId: "user-01",
        });

        await expect(() =>
          sut.create({
            gymId: "gym-01",
            userId: "user-01",
          })
        ).rejects.toBeInstanceOf(Error);
      });

         it("should be able to check-in twice but in different days", async () => {
           vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

           await sut.create({
             gymId: "gym-01",
             userId: "user-01",
           });

           vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));
           const { checkIn } = await sut.create({
             gymId: "gym-01",
             userId: "user-01",
           });

           expect(checkIn.id).toEqual(expect.any(String));
         });


})