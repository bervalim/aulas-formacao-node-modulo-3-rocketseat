import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeValidateCheckInsService } from "@/services/factories/make-validate-checkin-service";

export async function validateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
    const validateCheckInParamsSchema = z.object({
        checkinId: z.uuid()
    });

    const { checkinId } =  validateCheckInParamsSchema.parse(request.params)

    const validateCheckInService = makeValidateCheckInsService();

    await validateCheckInService.execute({
       checkinId
    })
    return reply.status(204).send();

}
