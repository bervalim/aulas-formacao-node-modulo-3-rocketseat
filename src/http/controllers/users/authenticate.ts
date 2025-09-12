import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { InvalidCredentialError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    
    const authenticateService = makeAuthenticateService()
    const { user } = await authenticateService.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    return reply.setCookie('refreshToken',refreshToken,{
      // Informa quais rotas poderão ter acesso a esse cookie
      path:'/',
      secure: true, // Diz que o cookie só deve ser enviado em conexões HTTPS,
      //  Só poderá ser acessado pelo mesmo dóminio
      sameSite: true,
      // só poderá ser acessado pelo back-end da nossa aplicação
      httpOnly: true
    }).status(200).send({ token });

  } catch (error) {
    if(error instanceof InvalidCredentialError){
      return reply.status(400).send({ message: error.message })
    }
    throw  error
  }

}
