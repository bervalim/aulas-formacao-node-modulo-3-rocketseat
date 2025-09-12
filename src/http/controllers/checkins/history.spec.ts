import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { describe } from "node:test";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('Checkin History Controller', ()=> {
    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be to list the history of checkins", async () => {
      const { token } = await createAndAuthenticateUser(app);

      const user = await prisma.user.findFirstOrThrow()

      const gym = await prisma.gym.create({
        data: {
          name: "Javascript Gym",
          latitude: -25.4608646,
          longitude: -49.2765184,
        },
      });

      await prisma.checkin.createMany({
        data: [
          {
            gymId: gym.id,
            userId: user.id,
          },
          {
            gymId: gym.id,
            userId: user.id,
          },
        ],
      });

      const response = await request(app.server)
        .get('/checkIns/history')
        .set("Authorization", `Bearer ${token}`)

      expect(response.statusCode).toEqual(200);
      expect(response.body.checkIns).toEqual([
        expect.objectContaining({
            gymId: gym.id,
            userId: user.id,
        }),
        expect.objectContaining({
            gymId: gym.id,
            userId: user.id,
        }),
      ])
    });
})