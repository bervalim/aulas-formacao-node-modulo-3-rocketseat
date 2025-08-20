import { Checkin } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-ins-repository";

interface CheckinServiceRequest {
    userId: string
    gymId: string
}

interface CheckinServiceResponse {
    checkIn: Checkin
}

export class CheckinService {
  constructor(private checkinsRepository: CheckinsRepository) {}

  async create({
    userId,
    gymId,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

    if(checkInOnSameDay){
        throw new Error()
    }
    
    const checkIn = await this.checkinsRepository.create({ userId, gymId });

    return { checkIn };
  }
}