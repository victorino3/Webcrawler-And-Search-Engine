import express from 'express'
import cors from "cors"
import exphbs  from 'express-handlebars'
import {run,completeSearch} from "./DB/aggregation.mjs"
import {fileURLToPath} from 'url';
import { join } from "path"
import path from 'path';
import { config } from "dotenv"
import { ok } from "assert"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env =process.env.NODE_ENV || "dev" && "prod"
ok(env === "dev" || env === "prod" , "Invalid environment specified")
const confiPath =join(__dirname, "./dotenv", `.env.${env}`)
config({
    path: confiPath,
})
const port =  process.env.PORT
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.set('view engine', 'hbs');
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "index"}));

app.get('/product/macbook-pro', async(req, res) => {
    try {
        res.render('main');
    } catch (error) {
        console.log(error)
        res.render('error');
    }
    
});

app.post('/product/search', async(req, res) => {
    try {
        const params = req.body
        if(!params.autoSearch){
            return res.render('error');
        }
        let data = await run(params.autoSearch) 
        res.render('main',{data});
    } catch (error) {
        console.log(error)
        res.render('error');
    }
});

app.get('/auto-search',async (req, res) => {
    let data = await completeSearch(req.query.term) 
        var DataList = []
        for (let i = 0; i < data.length; i++) {
          DataList.push(data[i].title)
        }
        res.end(JSON.stringify(DataList))
      },
    
)

app.listen(port, console.log("listening on port", port))
export {app}