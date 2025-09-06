import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service";

export async function historyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)

  });

  const { page } = checkInsHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInHistoryService = makeFetchUserCheckInsHistoryService();
  
  const { checkIns } = await fetchUserCheckInHistoryService.execute({
    userId: request.user.sub,
    page
  })
  return reply.status(200).send({ checkIns });

}
