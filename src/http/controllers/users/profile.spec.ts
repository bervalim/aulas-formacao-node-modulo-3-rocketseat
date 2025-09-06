import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { describe } from "node:test";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Profile Controller', ()=> {
    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be to get user profile', async () => {
       const { token }  = await createAndAuthenticateUser(app)

        const profileResponse = await request(app.server)
            .get("/me")
            .set('Authorization', `Bearer ${token}` )


        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({email: 'johndoe@example.com'}))
        
        
    })
})