import { expect, it, describe, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { CheckinService } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checking-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkinRepository: InMemoryCheckinRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinService

describe('Checkin Use Case', () => {
    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckinService(checkinRepository, gymsRepository) 

       await gymsRepository.create({
         id: "gym-01",
         name: "JavaScript Gym",
         description: "",
         phone: "",
         latitude: -25.4608646,
         longitude:- 49.276518,
       })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

     it("should be able to check-in", async () => {
       const { checkIn } = await sut.create({
         gymId: "gym-01",
         userId: "user-01",
         userLatitude: -25.4608646,
         userLongitude: -49.2765184,
       });

       expect(checkIn.id).toEqual(expect.any(String));
     });

      it("should  not be able to check-in twice in the same day", async () => {
        vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

        await sut.create({
          gymId: "gym-01",
          userId: "user-01",
          userLatitude: -25.4608646,
          userLongitude: -49.2765184,
        });

        await expect(() =>
          sut.create({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -25.4608646,
            userLongitude: -49.2765184,
          })
        ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError);
      });

         it("should be able to check-in twice but in different days", async () => {
           vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

           await sut.create({
             gymId: "gym-01",
             userId: "user-01",
             userLatitude: -25.4608646,
             userLongitude: -49.2765184,
           });

           vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0));
           const { checkIn } = await sut.create({
             gymId: "gym-01",
             userId: "user-01",
             userLatitude: -25.4608646,
             userLongitude: -49.2765184,
           });

           expect(checkIn.id).toEqual(expect.any(String));
         });

           it("should not  be able to check-in on distant gym", async () => {
             gymsRepository.items.push({
               id: "gym-02",
               name: "JavaScript Gym",
               description: "",
               phone: "",
               latitude: new Decimal(-25.4414591),
               longitude: new Decimal(-49.2401105),
             });

             await expect(() => 
               sut.create({
                 gymId: "gym-02",
                 userId: "user-01",
                 userLatitude: -25.4608646,
                 userLongitude: -49.2765184,
               })
             ).rejects.toBeInstanceOf(MaxDistanceError);
           });


})