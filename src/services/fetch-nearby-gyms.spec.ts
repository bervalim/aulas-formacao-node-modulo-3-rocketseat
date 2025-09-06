import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { expect, it, describe, beforeEach } from "vitest"
import { FetchNearByGymsService } from "./fetch-nearby-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsService

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsService(gymsRepository)
  })

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      name: "Near Gym",
      description: null,
      phone: null,
      latitude: -25.4608646,
      longitude: -49.2765184,
    });

    await gymsRepository.create({
      name: "Far Gym",
      description: null,
      phone: null,
      latitude: -25.348326,
      longitude: -49.1774364
    });

    const { gyms } = await sut.execute({
      userLatitude: -25.4608646,
      userLongitude: -49.2765184,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Near Gym" })]);
  });

});
