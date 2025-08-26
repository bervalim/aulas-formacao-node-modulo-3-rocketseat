import { Checkin } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";


interface ValidateCheckinRequest {
    checkinId: string,
}

interface ValidateCheckinResponse {
    checkIn: Checkin
}

export class ValidateCheckinService {
  constructor(
    private checkinsRepository: CheckinsRepository,
  ) {}

  async execute({
   checkinId
  }: ValidateCheckinRequest): Promise<ValidateCheckinResponse> {
    const checkIn = await this.checkinsRepository.findById(checkinId)

    if(!checkIn) {
        throw new ResourceNotFoundError()
    }
    
    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes')

    if(distanceInMinutesFromCheckinCreation > 20){
        throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkinsRepository.save(checkIn)

    return { checkIn };
  }
}