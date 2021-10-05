
const queryString_url = window.location.search
console.log (queryString_url)


const urlSearchParams = new URLSearchParams(queryString_url)
const id = urlSearchParams.get("id")
console.log(id)


// async function call() {

//     let response = await fetch("http://localhost:3000/api/teddies/" + id)
    
//       if (response.ok) {
//       return response.json()    
//       }   
  
//       else {
//         throw "Ce produit n'existe pas"
//       }
  
// }

async function run() {
    let get = await fetch("http://localhost:3000/api/teddies/" + id)
    let product = await get.json()
    console.log(product)

    let bearImg = document.getElementById("bearImg")
    bearImg.setAttribute("src", product.imageUrl)

    let bearTitle = document.getElementById("bearTitle")
    bearTitle.innerText = `${product.name}`

    let bearDescription = document.getElementById("bearDescription")
    bearDescription.innerText = `${product.description}`

    for (let i=0; i<10; i++){
        let qtyList = document.createElement("option")
        qtyList.setAttribute("value", i+1)

        let bearQty = document.getElementById("bearQty")
        bearQty.appendChild(qtyList)
    }

    let bearPrice = document.getElementById("bearPrice")
    bearPrice.innerText = `${product.price}`/ 100 + " €"

    let bearCommand = document.getElementById("bearCommand")
    bearCommand.addEventListener('click', function(){
        console.log(product._id)
    })



    

}

run()