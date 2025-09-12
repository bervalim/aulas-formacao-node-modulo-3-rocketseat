import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { describe } from "node:test";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";


describe('Validate Checkin Controller', ()=> {
    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be to validate a checkin", async () => {
      const { token } = await createAndAuthenticateUser(app, true);

      const user = await prisma.user.findFirstOrThrow();

      const gym = await prisma.gym.create({
        data: {
          name: "Javascript Gym",
          latitude: -25.4608646,
          longitude: -49.2765184,
        },
      });

      let checkIn = await prisma.checkin.create({
        data: {
            gymId: gym.id,
            userId: user.id
        }
      })
      console.log('checkin',checkIn.id)

      const response = await request(app.server)
        .patch(`/checkIns/${checkIn.id}/validate`)
        .set("Authorization", `Bearer ${token}`)
        .send()

      expect(response.statusCode).toEqual(204);

      checkIn = await prisma.checkin.findUniqueOrThrow({
        where: {
            id: checkIn.id
        }
      })

      expect(checkIn.validated_at).toEqual(expect.any(Date))
    });
})