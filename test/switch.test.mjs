import  { it,describe } from "mocha"
import request from "supertest"
import {app} from "../server.mjs"
import assert from "assert"
import fs from 'fs';
const file = "index.txt"


describe("API test for all case",()=>{
    describe("/product/macbook-pro",()=>{
        it("Upload page without error", async ()=>{
            const response = await request(app)
                            .get("/product/macbook-pro")
                            .expect(200)

            fs.readFile("../test/index.txt", 'utf-8', (err, data) => {
                if (err) throw err;
                //assert.deepEqual(response.txt,data)
                console.log(data)
              });
            
        })
    })
})