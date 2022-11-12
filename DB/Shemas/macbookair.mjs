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