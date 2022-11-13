import dotenv from "dotenv"
dotenv.config({ path: "../../dotenv/.env.prod" })
dotenv.config({ encoding: 'latin1' })
import {connected} from ".././DB.js"
import {Schema} from "mongoose"

const iphoneX = new Schema({

        title: {
            type: String,
            required: true,

            required: [true, 'title is required']

        },
    },
        { collection: 'iphone' },
    );
    

export const iphoneColl = connected().model('iphone', iphoneX); 
