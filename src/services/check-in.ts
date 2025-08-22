import { Checkin } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { geoDistanceBetweenCoordinates } from "@/utils/distace-betwenn-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checking-error";

interface CheckinServiceRequest {
    userId: string
    gymId: string,
    userLatitude: number,
    userLongitude: number
}

interface CheckinServiceResponse {
    checkIn: Checkin
}

export class CheckinService {
  constructor(
    private checkinsRepository: CheckinsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async create({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym) {
        throw new ResourceNotFoundError()
    }

    const distance = geoDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const maxDistanceInKilometers = 0.1

    if(distance > maxDistanceInKilometers){
      throw new MaxDistanceError()
    }
    
    const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckinsError();
    }

    const checkIn = await this.checkinsRepository.create({ userId, gymId });

    return { checkIn };
  }
}