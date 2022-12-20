import synonyms from 'synonyms';
import WordPOS from 'wordpos'
let wordpos = new WordPOS();
const inputUser = "Mac Book Pro 16 16GB / 512GB M1 Pro CPU 10-core GPU 16-core / Prateado";
let resultWord = wordpos.getNouns(inputUser)
resultWord
.then((result) => {
    for (const iterator of result) {
        console.log(synonyms(iterator));
    }
}).catch((err) => {
    
});
let keys = Object.keys(resultWord)

/*for (const iterator of resultWord) {
    console.log(synonyms(iterator));
}
let word = synonyms(inputUser);
console.log(word)*/