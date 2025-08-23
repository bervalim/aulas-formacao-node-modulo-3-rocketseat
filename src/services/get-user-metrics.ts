import { CheckinsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsRequest {
    userId: string
}

interface GetUserMetricsResponse {
    checkInsCount: number
}

export class GetUserMetricsService {
  constructor(
    private checkinsRepository: CheckinsRepository,
  ) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkinsRepository.countByUserId(userId)

    return { checkInsCount };
  }
}