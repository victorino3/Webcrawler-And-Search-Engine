const  { it,describe } = require("mocha")
const request = require("supertest")
const app = require("../server.js")
const assert = require("assert")
const {readFileSync} = require('fs');
let file = "/home/victorino/Documents/JsExpert/Webcrawler-And-Search-Engine/test/index.txt"

describe("Test Switch",()=>{
    describe("/product/macbook-pro",()=>{
        it("Upload page without error", async ()=>{
            const response = await request(app)
                            .get("/product/macbook-pro")
                            .expect(200)
            const expected = readFileSync(file, "utf-8")
                            
            assert.deepStrictEqual(response.text,expected);
            });
                         
 })

})


 


