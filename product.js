
const queryString_url = window.location.search
console.log (queryString_url)


const urlSearchParams = new URLSearchParams(queryString_url)
const id = urlSearchParams.get("id")
console.log(id)


async function call() {

    let response = await fetch("http://localhost:3000/api/teddies/" + id)
    
      if (response.ok) {
      return response.json()    
      }   
  
      else {
        //   if(response.code == 404){
        //       //Message d'erreur
            
        //   }
        //   esle {
            throw "Ce produit n'existe pas"
          }

        
  
}

async function run() {
    let product = await call()
    console.log(product)

    let bearImg = document.getElementById("bearImg")
    bearImg.setAttribute("src", product.imageUrl)

    let bearTitle = document.getElementById("bearTitle")
    bearTitle.innerText = `${product.name}`

    let bearDescription = document.getElementById("bearDescription")
    bearDescription.innerText = `${product.description}`

    let bearColor = document.getElementById("bearColor") 
    for (let color of product.colors){
        let colorList = document.createElement("option")
        colorList.setAttribute("value", color)
        colorList.innerText= color

        bearColor.appendChild(colorList)
    }

    let bearQty = document.getElementById("bearQty")  
    console.log(bearQty)
    for (let i=1; i<=10; i++){
        
        let qtyList = document.createElement("option")
        qtyList.setAttribute("value", i)
        qtyList.innerText= i

        bearQty.appendChild(qtyList)

    }
    
    let bearPrice = document.getElementById("bearPrice")
    bearPrice.innerText = `${product.price}`/ 100 + " €"

    let bearCommand = document.getElementById("bearCommand")
    bearCommand.addEventListener('click', function(){
        console.log(product._id + colorList + qtyList)
    })



    

}

run()