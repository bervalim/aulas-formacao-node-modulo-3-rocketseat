import { Prisma, Checkin } from "@prisma/client";
import { CheckinsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

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

    async findByUserIdOnDate(userId: string, date: Date) {
      const startOfTheDay = dayjs(date).startOf('date');
      const endOfTheDay = dayjs(date).endOf('date')

      const checkinOnSameDate = this.items.find(
        (checkin) => {
          const checkInDate = dayjs(checkin.created_at)
          const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
          return checkin.userId === userId && isOnSameDate
        } 
      );

      if (!checkinOnSameDate) return null;

      return checkinOnSameDate;
    }
    
    async findManyByUserId(userId: string, page: number) {
      return this.items
      .filter((item)=> item.userId === userId)
      .slice((page -1) * 20, page * 20)
    }
    
}
