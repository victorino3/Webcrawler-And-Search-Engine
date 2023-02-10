const dotenv = require("dotenv")
dotenv.config({ path: "../../dotenv/.env.prod" })
dotenv.config({ encoding: 'latin1' })
const {connected} = require("../DB.js")
const {Schema} = require("mongoose")
 
const macbookAirX = new Schema({

        title: {
            type: String,
        },
        image: {
            type: String,

        }},
    
        {collection: 'macbookAir'}

);

export const macbookAir = connected().model('macbookAir', macbookAirX);