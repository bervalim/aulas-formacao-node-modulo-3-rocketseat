import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { UserService } from "@/services/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists.error";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const userService = new UserService(usersRepository);
    await userService.create({ name, email, password });
  } catch (error) {
    if(error instanceof UserAlreadyExistsError){
      return reply.status(409).send({ message: error.message })
    }

    throw  error

  }

  return reply.status(201).send();
}
