import { writeFileSync, appendFileSync,readFileSync} from "fs"
import {macbookPro} from ".././Shemas/macbookpro.mjs"
import {macbookAir} from ".././Shemas/macbookair.mjs"
import {iphoneColl} from ".././Shemas/iphone.mjs"
import {bigDataX} from ".././Shemas/bigData.mjs"
let MacsFile = "../myMac.txt"
let allimage = "../allImage.txt"
let all_product = "../all_product.txt"

class Recycle {

    static async showData(filepath,fileimage){
        //const file = Recycle.parseToProandAir(filepath)
        //const file = Recycle.iphoneClassify(filepath)
        const file = Recycle.getPattern(filepath,fileimage)
        return file
    }
    
    static async readFileX(filepath){
        return readFileSync(filepath,"utf-8")
    }

    static async parseToProandAir(filepath){
        let file =await  this.readFileX(filepath)
        const makeArray = file.split("\n")
        let i = 0
        let regex =/^MacBook Pro*/
       for (let index = 0; index < makeArray.length; index++) {
            if (regex.test(makeArray[index])) {
                await macbookPro.findOneAndUpdate({ title: makeArray[index] }, { title: makeArray[index] }, {
                    new: true,
                    upsert: true // Make this update into an upsert
                })
                
            }
            else {

                await macbookAir.findOneAndUpdate({ title: makeArray[index] }, { title: makeArray[index] }, {
                    new: true,
                    upsert: true // Make this update into an upsert
                })
            }
        }    
         
    }
    static async iphoneClassify(filepath){
        let file =await  this.readFileX(filepath)
        const makeArray = file.split("\n")
        for (let index = 0; index < makeArray.length; index++) {
            await bigDataX.findOneAndUpdate({ title: makeArray[index] }, { title: makeArray[index] }, {
                new: true,
                upsert: true, // Make this update into an upsert
               
            })
        } 
        
    }
    //Make some search to get matching pattern
    static async getPattern(filepath,fileImage){
        let file =await this.readFileX(filepath)
        const makeArray = file.split("\n")
        const fileImageText = await this.readFileX(fileImage)
        const fileOfimage=fileImageText.split("\n")
        let regex =/^MacBook Air*/
        for (let index = 0; index < makeArray.length; index++) {
            
            if (makeArray[index].includes("Apple Watch SE GPS")) {
                for (let i = 0; i < fileOfimage.length; i++) {
                    if ( makeArray[index].includes("Luz das estrelas") && fileOfimage[i].includes("apple_watch_series_7_gps_41mm_green_aluminum_clover_sport_") ) {
                        let spaceRemove = fileOfimage[i].replace("  ","")
                        let titledoc = makeArray[index]
                        let update = {
                            title:titledoc,
                            image:spaceRemove
                        }
                        await bigDataX.findOneAndUpdate({ title: makeArray[index] }, update, {
                            new: true,
                            upsert: true // Make this update into an upsert
                        })
                       // await dbSchema.create({title:makeArray[index]},{image:fileOfimage[i]})
                    }
                    
                }
                
            }

        } 
    }

}

;
(async ()=>{
    const file = await Recycle.showData(all_product,allimage)
    console.log(file)
})();

