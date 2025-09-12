import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { describe } from "node:test";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('Create Checkin Controller', ()=> {
    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be to create a checkin", async () => {
      const { token } = await createAndAuthenticateUser(app);

      const gym = await prisma.gym.create({
        data: {
          name: "Javascript Gym",
          latitude: -25.4608646,
          longitude: -49.2765184,
        },
      });

      const response = await request(app.server)
        .post(`/gyms/${gym.id}/check-ins`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          latitude: -25.4608646,
          longitude: -49.2765184,
        });

      expect(response.statusCode).toEqual(201);
    });
})