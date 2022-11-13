import { MongoClient } from "mongodb"
import { writeFileSync, appendFileSync} from "fs"
import dotenv from "dotenv"
dotenv.config({ path: 'dotenv/.env.prod' })
dotenv.config({ encoding: 'latin1' })

function replacePlusAndN(string){
    let data_1= string.replace("+","")
    let data_2=data_1.replace("\n","")
    let bigtext="'Limpar Tudo''''Salvo indicação em contrário, os descontos e campanhas apresentados são válidos para o dia 03-11-2022, salvo erro tipográfico ou de imagem e até ruptura de stock. Todos os valores incluem IVA à taxa legal em vigor e podem ser alterados sem aviso prévio.''As imagens podem não corresponder ao produto descrito. A iStore declina qualquer responsabilidade sobre eventuais erros nas descrições e/ou referências dos produtos. Recomendamos sempre a confirmação das imagens e características no site do fabricante. Por questões técnicas, as cores apresentadas podem diferir ligeiramente das cores reais.'"
    let data_3=data_2.replace(bigtext,"")
    let otherBig="Salvo indicação em contrário, os descontos e campanhas apresentados são válidos para o dia 03-11-2022, salvo erro tipográfico ou de imagem e até ruptura de stock. Todos os valores incluem IVA à taxa legal em vigor e podem ser alterados sem aviso prévio.As imagens podem não corresponder ao produto descrito. A iStore declina qualquer responsabilidade sobre eventuais erros nas descrições e/ou referências dos produtos. Recomendamos sempre a confirmação das imagens e características no site do fabricante. Por questões técnicas, as cores apresentadas podem diferir ligeiramente das cores reais."
    //let data_4=data_3.replaceAll("," ")
    return data_3
}
export default async function run() {
    try {
        const client = await MongoClient.connect("mongodb://127.0.0.1:27017/mackdb");
        const db = client.db('mackdb');
        const mydb = await db.collection('bigData')
        /*const content = await mydb.find({}).toArray()
        content.map((line) =>{
            appendFileSync("allImage.txt",line.image+"\r\n")
        }
        )*/
        const text = await mydb.createIndex({"title":"text"})
        //title_text my index
        let myInput = "watch 45mm"
        let searchResult = await mydb.find({$text: {$search: myInput}}, {
            projection: {score: {$meta: "textScore"}},
            sort : {score:{$meta:"textScore"}}}
            ).toArray()
        console.log(searchResult)
        

        
       

    } catch (error) {
        console.error(error)
    }


}

run()






 
