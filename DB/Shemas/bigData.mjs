import {connected} from ".././DB.js"
import {Schema} from "mongoose"
 
const bigData = new Schema({

        title: {
            type: String,
        }},
    
        {collection: 'bigData'}

);

export const bigDataX = connected().model('bigData', bigData);