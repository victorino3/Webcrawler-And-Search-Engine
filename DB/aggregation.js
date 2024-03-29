const { MongoClient } = require("mongodb")
const alterSearch = require("./helpers/naturalprocess.js")

async function run(search) {
    try {
        const client = await MongoClient.connect(process.env.ULR_MONGODB);
        const db = client.db('mackdb');
        const mydb = await db.collection('bigData')
        const text = await mydb.createIndex({"title":"text"})
        let myInput = search
        let searchResult = await mydb.find({$text: {$search:myInput}}, {
            projection: {score: {$meta: "textScore"}},
            sort : {score:{$meta:"textScore"}}}
            ).toArray()
            
        if (searchResult.length < 0) {
            return searchResult
        } 
            
        
        let splitInput = myInput.trim().split(' ')
        let newInput = alterSearch(splitInput[0]) 
        
        let word_1 ="macintosh"
        if(newInput.includes(word_1)){
            let distanceToCompare =await mydb.find({ 'title': new RegExp(newInput.substring(0, 3), 'ig') }).toArray()
            if(Object.keys(searchResult).length > 0){
               
                return searchResult 
            }
            return distanceToCompare
                        
        }else{
            console.log("result "+newInput)
            console.log( Object.keys(searchResult).length)
            let distanceToCompare =await mydb.find({ 'title': new RegExp(newInput.substring(0, 3), 'ig') }).toArray()
            if(Object.keys(searchResult).length > 0){
               
                return searchResult 
            }
            return distanceToCompare
        }
    
         
                     
    } catch (error) {
        console.error(error)
    }


}
async function completeSearch(search) { 
    try {
        const client = await MongoClient.connect(process.env.ULR_MONGODB);
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
module.exports  =  {run,completeSearch}








 
