import dotenv from "dotenv"
dotenv.config({ path: "../../dotenv/.env.prod" })
dotenv.config({ encoding: 'latin1' })
import {connected} from ".././DB.js"
import {Schema} from "mongoose"
 
const bigData = new Schema({

        title: {
            type: String,
        },
        image: {
            type: String,

        }},
    
        {collection: 'bigData'}

);

export const bigDataX = connected().model('bigData', bigData);