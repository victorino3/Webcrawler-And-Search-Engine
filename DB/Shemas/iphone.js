const dotenv = require("dotenv")
dotenv.config({ path: "../../dotenv/.env.prod" })
dotenv.config({ encoding: 'latin1' })
const {connected} = require("../DB.js")
const {Schema} = require("mongoose")

const iphoneX = new Schema({

        title: {
            type: String,
            required: true,

            required: [true, 'title is required']

        },
    },
        { collection: 'iphone' },
    );
    

const iphoneColl = connected().model('iphone', iphoneX); 
module.exports = iphoneColl
