const  { it,describe } = require("mocha")
const request = require("supertest")
const app = require("../server.js")
const { join } = require("path")
const assert = require("assert")
const {readFileSync} = require('fs');
const confiPath =join(__dirname,"index.txt")
const confiPathError =join(__dirname,"error.txt")
const response_mac =join(__dirname,"response-mac.txt") 

describe("Test Switch",()=>{
    describe("/product/macbook-pro",()=>{
       it("Upload page without error", async ()=>{
            const response = await request(app)
                            .get("/product/macbook-pro")
                            .expect(200)
            const expected = readFileSync(confiPath, "utf-8")          
            assert.deepStrictEqual(response.text,expected);
            });

        it("Cacth the error if get some error",async ()=>{
            const response = await request(app)
                            .get("/product/macbook-proX")
                            .expect(400)
            const expected = readFileSync(confiPathError, "utf-8")
            assert.deepStrictEqual(response.text,expected);
        })

        it("track user input in search field", async()=>{
           
                const expect =`W/"1b9d-7MEtOMgRHk1G70MARHXvP81t/Sc"`
                const response = await request(app)
                            .post("/product/search")
                            .send({
                                autoSearch: "mac",
                                origin: "localhost:3000",
                            });
                assert.deepStrictEqual(response.header.etag,expect.trim());
           
        })
        it("track user input in search field when is empty", async()=>{
           
                const expected = 401
                const response = await request(app)
                            .post("/product/search")
                            .send({
                                autoSearch: "",
                                origin: "localhost:3000",
                            });    
                    assert.deepStrictEqual(response.status,expected);
       
        })
                         
 })

})


 


