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
