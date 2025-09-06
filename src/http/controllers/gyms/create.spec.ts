import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { describe } from "node:test";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Create Gym Controller', ()=> {
    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be to create a gym', async () => {
       const { token }  = await createAndAuthenticateUser(app)

        const response = await request(app.server)
          .post("/gyms")
          .set("Authorization", `Bearer ${token}`)
          .send({
            name: "Javascript GYm",
            description: "description",
            phone: "41984969334",
            latitude: -25.4608646,
            longitude: -49.2765184,
          });


        expect(response.statusCode).toEqual(200)
        
        
    })
})