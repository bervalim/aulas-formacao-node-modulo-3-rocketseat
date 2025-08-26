import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

interface FetchNearByGymsRequest {
   userLatitude: number,
   userLongitude: number
}

interface FetchNearByGymsResponse {
    gyms: Gym[]
}

export class FetchNearByGymsService {
    constructor(private gymsRepository: GymsRepository){}

    async execute({userLatitude, userLongitude }: FetchNearByGymsRequest): Promise<FetchNearByGymsResponse> {
        const gyms = await this.gymsRepository.findManyNearBy({latitude: userLatitude, longitude: userLongitude})

        return { gyms }
    }
}
