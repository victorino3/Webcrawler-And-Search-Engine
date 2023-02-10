const dotenv = require("dotenv")
dotenv.config({ path: "../../dotenv/.env.prod" })
dotenv.config({ encoding: 'latin1' })
const {connected} = require("../DB.js")
const {Schema} = require("mongoose")
 
const bigData = new Schema({

        title: {
            type: String,
        },
        image: {
            type: String,

        }},
    
        {collection: 'bigData'}

);


const bigDataX = connected().model('bigData', bigData);
module.exports =  bigDataX;