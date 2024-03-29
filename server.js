const express = require('express')
const cors = require("cors")
const exphbs = require('express-handlebars')
const { run, completeSearch } = require("./DB/aggregation.js")
const { join } = require("path")
const { config } = require("dotenv")
const { ok } = require("assert")
const env = process.env.NODE_ENV || "dev" && "prod"
ok(env === "dev" || env === "prod", "Invalid environment specified")
const confiPath = join(__dirname, "./dotenv", `.env.${env}`)
config({
    path: confiPath,
})
const port = process.env.PORT
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.set('view engine', 'hbs');
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "index" }));


app.get('/product/macbook-pro',(req, res) => {
        res.status(200).render('main');

});
app.get('/product/macbook-proX',(req,res)=> {
        res.status(400).render('error');  
  });


  app.post('/product/search', async (req, res) => {
        const params = req.body
        if (!params.autoSearch) {
            return res.status(401).render('error');
        }
        let data = await run(params.autoSearch)
       
        res.status(200).render('main', { data });
});


app.get('/auto-search', async (req, res) => {
    let data = await completeSearch(req.query.term)
    var DataList = []
    for (let i = 0; i < data.length; i++) {
        DataList.push(data[i].title)
    }
    res.end(JSON.stringify(DataList))
},

)

app.listen(port, console.log("listening on port", port))

module.exports = app