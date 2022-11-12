/*fetch('http://localhost:3000/product',{
    headers: {
    'Content-type': 'application/json',
    },
})
.then(async (response)=>{
    let inputToHtml= await response.json()
    let rootbuilt = document.getElementById("myroot")
    for (let index = 0; index < inputToHtml.length; index++) {
        rootbuilt.innerHTML += "<div class='card' style='width: 18rem;'>"
        +"<img class='card-img-top' src="+inputToHtml[index].image+"></img>"
        +"<div class='card-body'><p class='card-text'>"+inputToHtml[index].title+"</p></div></div></div>"
   }
})

.catch((err)=>console.log(err))*/




