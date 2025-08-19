import { Prisma, Checkin } from "@prisma/client";
import { CheckinsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckinRepository implements CheckinsRepository {

    public items: Checkin[] = []

    async create(data: Prisma.CheckinUncheckedCreateInput) {
         const checkin =  {
           id: randomUUID(),
           userId: data.userId,
           gymId: data.gymId,
           validated_at: data.validated_at ? new Date(data.validated_at) : null,
           created_at: new Date(),
         };

         this.items.push(checkin)

         return checkin
    }
    
}
