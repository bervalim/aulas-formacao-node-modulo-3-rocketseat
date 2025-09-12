import { FastifyRequest, FastifyReply } from "fastify";

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify({ onlyCookie: true });

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        // Dados do usuáro logado
        // Vem do jwt verify
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      // Informa quais rotas poderão ter acesso a esse cookie
      path: "/",
      secure: true, // Diz que o cookie só deve ser enviado em conexões HTTPS,
      //  Só poderá ser acessado pelo mesmo dóminio
      sameSite: true,
      // só poderá ser acessado pelo back-end da nossa aplicação
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}
