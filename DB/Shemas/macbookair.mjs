import dotenv from "dotenv"
dotenv.config({ path: "../../dotenv/.env.prod" })
dotenv.config({ encoding: 'latin1' })
import {connected} from ".././DB.js"
import {Schema} from "mongoose"
 
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