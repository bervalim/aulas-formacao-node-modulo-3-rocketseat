import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearByGymsService } from "../fetch-nearby-gyms";

  export function makeFetchNearByGymsService () {
        const gymsRepository = new PrismaGymsRepository();
        const service = new FetchNearByGymsService(gymsRepository);
        return service
  }
  
 