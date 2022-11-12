import express from 'express'
import cors from "cors"
import exphbs  from 'express-handlebars'
import {macbookPro} from ".././Backend/DB/Shemas/macbookpro.mjs"
import {macbookAir} from ".././Backend/DB/Shemas/macbookair.mjs"
import {iphoneColl} from ".././Backend/DB/Shemas/iphone.mjs"
import {fileURLToPath} from 'url';
import { join } from "path"
import path from 'path';
import { config } from "dotenv"
import { ok } from "assert"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env =process.env.NODE_ENV || "dev" && "prod"
ok(env === "dev" || env === "prod" , "Invalid environment specified")
const confiPath =join(__dirname, "./src", `.env.${env}`)
config({
    path: confiPath,
})
const port =  process.env.PORT
const app = express()

app.use(cors())
//app.use('/public', express.static(__dirname + '/public'))
app.set('view engine', 'hbs');
// define a extensão e a instância do handlebars com o modelo que será interpretado o código
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "index"}));
app.get('/', async(req, res) => {
    res.send("<h1>All Product is on ...</h1>")
});  
//macPro endpoint
app.get('/product/macbook-pro', async(req, res) => {
    try {
        let data = await macbookPro.find({}).lean()
        res.render('main',{data});
    } catch (error) {
        console.log(error)
        res.render('error');
    }
});
//macAir endpoint
app.get('/product/macbook-air', async(req, res) => {
    try {
        let data = await macbookAir.find({}).lean()
        res.render('maccontent',{data});
    } catch (error) {
        console.log(error)
        res.render('error');
    }
    
});
//iphone endpoint
/*
app.get('/product/iphone', async(req, res) => {
    let data = await iphoneColl.find({}).lean()
    res.render('main',{data});
});
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(port, console.log("listening on port", port))