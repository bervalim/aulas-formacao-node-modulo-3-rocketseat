import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { searchController } from "./search";
import { fetchNearByController } from "./nearby";
import { createController } from "./create";

export async function gymRoutes(app: FastifyInstance) {
   app.addHook('onRequest', verifyJWT)

   app.get('/gyms/search',searchController)
   app.get('/gyms/nearby', fetchNearByController)

   app.post('/gyms', createController)
}
