
const queryString_url = window.location.search
console.log (queryString_url)


const urlSearchParams = new URLSearchParams(queryString_url)
const id = urlSearchParams.get("id")
console.log(id)


async function call() {

  let response = await fetch("http://localhost:3000/api/teddies/" + id)
  console.log(response)
  
  if (response.ok) {
    return response.json()
  }   

  else if (response.status == 404) {
    //Affichage message d'erreur
    let noExist = document.getElementById("noExist")
    noExist.classList.remove("d-none");

    //Suppression affichage standard
    let bRetour = document.getElementById("bRetour")
    let bProduct = document.getElementById("bProduct")
    bRetour.classList.add("d-none")
    bProduct.classList.add("d-none")

  } 

  else if (response.status == 500) {
    //Affichage message d'erreur
    let noExist = document.getElementById("errorMessage")
    noExist.classList.remove("d-none");

    //Suppression affichage standard
    let bRetour = document.getElementById("bRetour")
    let bProduct = document.getElementById("bProduct")
    bRetour.classList.add("d-none")
    bProduct.classList.add("d-none")
  } 

  else {
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
  bearCommand.addEventListener('click', function(e){


    const resumeArticle = 'bearStore'

    let resume = localStorage.getItem(resumeArticle) === null
    ? []
    : JSON.parse (localStorage.getItem(resumeArticle))

    //Creation de l'objet pour integration
    let bArticle ={
      id:id,
      color:$('#bearColor').val(),
      quantity:$('#bearQty').val()
    }

    //Creation de la boucle d'ajout
    let alreadyExist = false
    for (let bear of resume){
      if (bear.id === bArticle.id && bear.color === bArticle.color){
        bear.quantity = Number(bear.quantity) + Number(bArticle.quantity)
        alreadyExist = true
        break
      }
    }

    if (!alreadyExist){
      resume.push(bArticle)
    }

    localStorage.setItem (resumeArticle, JSON.stringify(resume))
    localStorage.getItem('resumeArticle')

  });
    

}

run()