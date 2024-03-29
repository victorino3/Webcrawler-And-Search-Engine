const {readFileSync} = require("fs")
const {macbookPro} = require("../Shemas/macbookpro.js")
const {macbookAir} = require("../Shemas/macbookair.js")
const {bigDataX} = require("../Shemas/bigData.js")
let allimage = "../allImage.txt"
let all_product = "../all_product.txt"

class Recycle {

    static async showData(filepath,fileimage){
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
                    upsert: true 
                })
                
            }
            else {

                await macbookAir.findOneAndUpdate({ title: makeArray[index] }, { title: makeArray[index] }, {
                    new: true,
                    upsert: true 
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
    static async getPattern(filepath,fileImage){
        let file =await this.readFileX(filepath)
        const makeArray = file.split("\n")
        const fileImageText = await this.readFileX(fileImage)
        const fileOfimage=fileImageText.split("\n")
        for (let index = 0; index < makeArray.length; index++) {
            
            if (makeArray[index].includes("Mac Studio")) {
                for (let i = 0; i < fileOfimage.length; i++) {
                    if ( makeArray[index].includes("Mac Studio") && fileOfimage[i].includes("mac_studio_pdp_image_position-1") ) {
                        let spaceRemove = fileOfimage[i].replace("  ","")
                        let titledoc = makeArray[index]
                        let update = {
                            title:titledoc,
                            image:spaceRemove
                        }
                        await bigDataX.findOneAndUpdate({ title: makeArray[index] }, update, {
                            new: true,
                            upsert: true 
                        })
                    }
                    
                }
                
            }

        } 
    }

}

;
(async ()=>{
    const file = await Recycle.showData(all_product,allimage)
})();

