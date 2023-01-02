import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import alterSearch from "./helpers/naturalprocess"
dotenv.config({ path: 'dotenv/.env.prod' })
dotenv.config({ encoding: 'latin1' })

async function run(search) {
    try {
        const client = await MongoClient.connect("mongodb://127.0.0.1:27017/mackdb");
        const db = client.db('mackdb');
        const mydb = await db.collection('bigData')
        const text = await mydb.createIndex({"title":"text"})
        let myInput = search
        let newImpnut = alterSearch(search) 
        let searchResult = await mydb.find({$text: {$search: myInput}}, {
            projection: {score: {$meta: "textScore"}},
            sort : {score:{$meta:"textScore"}}}
            ).toArray()
        let distanceToCompare = await mydb.find({$text: {$search: newImpnut}}, {
                projection: {score: {$meta: "textScore"}},
                sort : {score:{$meta:"textScore"}}}
                ).toArray()  
        return searchResult ? searchResult : distanceToCompare
                     
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








 
