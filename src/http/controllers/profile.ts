import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
   await request.jwtVerify()
   return reply.status(200).send();
}
