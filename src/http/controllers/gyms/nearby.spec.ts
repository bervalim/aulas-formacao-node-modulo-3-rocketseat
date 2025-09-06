import { afterAll, beforeAll, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { describe } from "node:test";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Nearby Gyms Controller', ()=> {
    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be to search nearby gyms', async () => {
       const { token } = await createAndAuthenticateUser(app);

       await request(app.server)
         .post("/gyms")
         .set("Authorization", `Bearer ${token}`)
         .send({
           name: "Javascript Gym",
           description: "description",
           phone: "41984969334",
           latitude: -25.4608646,
           longitude: -49.2765184,
         });

         await request(app.server)
           .post("/gyms")
           .set("Authorization", `Bearer ${token}`)
           .send({
             name: "Typescript Gym",
             description: "description",
             phone: "41984969334",
             latitude: -25.348326,
             longitude: -49.1774364,
           });

         const response = await request(app.server)
           .get("/gyms/nearby")
           .set("Authorization", `Bearer ${token}`)
           .query({
             latitude: -25.4608646,
             longitude: -49.2765184,
           });


       expect(response.statusCode).toEqual(200);
       expect(response.body.gyms).toHaveLength(1)
       expect(response.body.gyms).toEqual([
        expect.objectContaining({
            name: 'Javascript Gym'
        })
       ])
       
        
        
    })
})