import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { expect, it, describe, beforeEach } from "vitest"
import { SearchGymsService } from "./search-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      name: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -25.4608646,
      longitude: -49.2765184,
    });

    await gymsRepository.create({
      name: "Typescript Gym",
      description: null,
      phone: null,
      latitude: -25.4608646,
      longitude: -49.2765184,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Javascript Gym" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -25.4608646,
        longitude: -49.2765184,
      });
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Javascript Gym 21" }),
      expect.objectContaining({ name: "Javascript Gym 22" }),
    ]);
  });
});
