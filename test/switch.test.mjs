import  { it,describe } from "mocha"
import request from "supertest"
import {app} from "../server.mjs"
import assert from "assert"
import fs from 'fs';



describe("/product/macbook-pro",()=>{
        it("Upload page without error", async ()=>{
            const response = await request(app)
                            .get("/product/macbook-pro")
                            .expect(200)
            if(fs.existsSync("/home/victorino/Documents/JsExpert/Webcrawler-And-Search-Engine/test/index.txt")){
                            fs.readFile("/home/victorino/Documents/JsExpert/Webcrawler-And-Search-Engine/test/index.txt", 'utf-8', (err, data) => {
                                if (err) throw err;
                                   assert.deepStrictEqual(response.text,data);
                                  });
                            }else{
                            console.log("Not")
                            }
        })
})
