import { Checkin, Prisma } from "@prisma/client";
import { CheckinsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckinsRepository {
  async findById(id: string) {
    const checkin = await prisma.checkin.findUnique({ where: { id } });
    return checkin;
  }

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkin = await prisma.checkin.create({
      data,
    });
    return checkin;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkin.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkin.count({
      where: {
        userId,
      },
    });

    return count;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkin.findFirst({
        where:{
            userId,
            created_at: {
                gte: startOfTheDay.toDate(),
                lte: endOfTheDay.toDate()
            }
        }
    })

    return checkIn
  }

  async save(data: Checkin) {
    const checkin = await prisma.checkin.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkin;
  }
}
