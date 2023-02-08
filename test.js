import fs from 'fs';
import {app} from "./test/index.txt"
if(fs.existsSync("../")){
    console.log("yes")
}
console.log("Not")
