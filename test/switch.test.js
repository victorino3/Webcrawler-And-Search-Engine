const  { it,describe } = require("mocha")
const request = require("supertest")
const app = require("../server.js")
const { join } = require("path")
const assert = require("assert")
const {readFileSync} = require('fs');
const confiPath =join(__dirname,"index.txt")
const confiPathError =join(__dirname,"error.txt")
//let file = "/home/victorino/Documents/JsExpert/Webcrawler-And-Search-Engine/test/index.txt"

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
            const expect = "mac"
            const response = await request(app)
                            .get("http://localhost:3000/auto-search?key=%QUERY")
                            .expect((req)=>{
                                console.log(req.query)
                            })
            
            //assert.deepStrictEqual(response.text,expected);
        })
                         
 })

})


 


