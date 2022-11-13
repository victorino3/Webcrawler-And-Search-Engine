import dotenv from "dotenv"
dotenv.config({ path: "../../dotenv/.env.prod" })
dotenv.config({ encoding: 'latin1' })
import {connected} from ".././DB.js"
import {Schema} from "mongoose"
const macbookProX = new Schema({

        title: {
            type: String,
        },
        image: {
            type: String,

        },
    },
        { collection: 'macbookPro' },
);
export const macbookPro = connected().model('macbookPro', macbookProX);
