import { MongoClient } from "mongodb"
import {alterSearch} from "./helpers/naturalprocess.js"

async function run(search) {
    try {
        const client = await MongoClient.connect("mongodb://127.0.0.1:27017/mackdb");
        const db = client.db('mackdb');
        const mydb = await db.collection('bigData')
        const text = await mydb.createIndex({"title":"text"})
        let myInput = search
        let searchResult = await mydb.find({$text: {$search: myInput}}, {
            projection: {score: {$meta: "textScore"}},
            sort : {score:{$meta:"textScore"}}}
            ).toArray()

        let splitInput = myInput.trim().split(' ')
        let newInput = alterSearch(splitInput[0]) 
        let word_1 ="macintosh"
        let word_2 =""
        
        if(newInput.includes(word_1)){
            console.log(searchResult)
            let distanceToCompare =await mydb.find({ 'title': new RegExp(newInput.substring(0, 3), 'ig') }).toArray()
            console.log(distanceToCompare)
            if(searchResult.length > -1){
                return distanceToCompare
            }
            
           
        }
        return searchResult
        
                     
    } catch (error) {
        console.error(error)
    }


}
async function completeSearch(search) { 
    try {
        const client = await MongoClient.connect("mongodb://127.0.0.1:27017/mackdb");
        const db = client.db('mackdb');
        const mydb = await db.collection('bigData')
        const text = await mydb.createIndex({"title":"text"})
        let myInput = search
        const autoComplete = await mydb.find({title:{$regex: myInput, $options: 'i'}}).toArray()
        return autoComplete
    } catch (error) {
        console.error(error)
    }
    

}
export {run,completeSearch}








 
