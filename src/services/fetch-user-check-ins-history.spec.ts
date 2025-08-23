import { expect, it, describe, beforeEach} from "vitest"
import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history";

let checkinRepository: InMemoryCheckinRepository
let sut: FetchUserCheckInsHistoryService

describe('Fetch Check-in History Use Case', () => {
    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new FetchUserCheckInsHistoryService(checkinRepository) 
    })

     it("should be able to fetch check-in history", async () => {
        await checkinRepository.create({
            gymId: 'gym-01',
            userId: 'user-01'
        });

        await checkinRepository.create({
            gymId: 'gym-02',
            userId: 'user-01'
        });

       const { checkIns } = await sut.execute({
         userId: "user-01",
         page: 1
       });

       expect(checkIns).toHaveLength(2);
       expect(checkIns).toEqual([
            expect.objectContaining({gymId: 'gym-01'}),
             expect.objectContaining({gymId: 'gym-02'})
       ])
     });

     it("should be able to fetch paginated check-in history", async () => {
        for (let i = 1; i <= 22; i++){
            await checkinRepository.create({
                gymId: `gym-${i}`,
                userId: 'user-01'
            });
        }

       const { checkIns } = await sut.execute({
         userId: "user-01",
         page: 2
       });

       expect(checkIns).toHaveLength(2);
       expect(checkIns).toEqual([
            expect.objectContaining( { gymId: 'gym-21' }),
            expect.objectContaining({ gymId: 'gym-22' })
       ])
      
     });

})