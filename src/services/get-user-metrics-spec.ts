import { expect, it, describe, beforeEach } from "vitest"
import { InMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { GetUserMetricsService } from "./get-user-metrics";

let checkinRepository: InMemoryCheckinRepository
let sut: GetUserMetricsService

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinRepository()
    sut = new GetUserMetricsService(checkinRepository) 
  })

  it("should be able to get check-ins count from metrics", async () => {
    await checkinRepository.create({
      gymId: 'gym-01',
      userId: 'user-01'
    });

    await checkinRepository.create({
      gymId: 'gym-02',
      userId: 'user-01'
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  })
})
