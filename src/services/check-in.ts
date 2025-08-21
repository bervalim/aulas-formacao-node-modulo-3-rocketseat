import { Checkin } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

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
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym){
        throw new ResourceNotFoundError()
    }
    
    const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkinsRepository.create({ userId, gymId });

    return { checkIn };
  }
}