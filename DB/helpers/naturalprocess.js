import  natural from "natural";
let arrayKeys = [
    "maça","mac",
    "apple Tv",
    "Computador",
    "relógio",
    "watch",
    "Computer",
    "macintosh",
    ]
function alterSearch(usersearch){
let userSearch=usersearch 
let newValueToSearch ="";
let distanceToCompare = 0.5
    for (let index = 0; index < arrayKeys.length; index++) {
        //If it returns some value more that 0.2 means that there is no much distance bettewn words
        let distance = natural.JaroWinklerDistance(userSearch,arrayKeys[index])
        if(distance > distanceToCompare){
            newValueToSearch = arrayKeys[index];
        }
    }
return newValueToSearch
}

export {alterSearch}


