import express from 'express'
import cors from "cors"
import exphbs  from 'express-handlebars'
import run from "../Backend/DB/aggregation.mjs"
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
//app.use('/public', express.static(__dirname + '/public'))
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
        if(!params.name){
            return res.render('error');
        }
        let data = await run(params.name) 
        res.render('main',{data});
    } catch (error) {
        console.log(error)
        res.render('error');
    }
});
app.get('/auto-search', function (req, res) {
    /*db.query(
      'SELECT name FROM countries WHERE name LIKE "%' +
        req.query.term +
        '%"',
      function (err, rows, fields) {
        if (err) throw err
        var DataList = []
        for (i = 0; i < rows.length; i++) {
          DataList.push(rows[i].name)
        }
        res.end(JSON.stringify(DataList))
      },
    )*/
  })

app.listen(port, console.log("listening on port", port))