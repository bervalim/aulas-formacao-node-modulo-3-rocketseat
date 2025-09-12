import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { createController } from "./create";
import { validateController } from "./validate";
import { historyController } from "./history";
import { metricsController } from "./metrics";


export async function checkInsRoutes(app: FastifyInstance) {
   app.addHook('onRequest', verifyJWT)

   app.get('/checkIns/history', historyController)
   app.get('/checkIns/metrics', metricsController)
   app.post('/gyms/:gymId/check-ins', createController)
   app.patch('/checkIns/:checkinId/validate', validateController)
}
