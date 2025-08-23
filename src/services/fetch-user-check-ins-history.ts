import { Checkin } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string,
    page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: Checkin[]
}

export class FetchUserCheckInsHistoryService {
  constructor(
    private checkinsRepository: CheckinsRepository,
  ) {}

  async execute({
    userId,
    page
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(userId, page)

    return { checkIns };
  }
}