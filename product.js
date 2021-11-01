//Recherche de l'URL
const queryString_url = window.location.search
console.log (queryString_url)

//Recuperation de l'id
const urlSearchParams = new URLSearchParams(queryString_url)
const id = urlSearchParams.get("id")
console.log(id)

//Recuperation des donnée de l'API dédié au produit sélectionné
async function call() {
  try {
    let response = await fetch("http://localhost:3000/api/teddies/" + id)
    console.log(response)
    
    if (response.ok) {
      return response.json()
    }   

    //Test en cas de id non identifié
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
  } catch (error) {
    //Affichage message d'erreur
    let noExist = document.getElementById("errorServer")
    noExist.classList.remove("d-none");

    //Suppression affichage standard
    let bRetour = document.getElementById("bRetour")
    let bProduct = document.getElementById("bProduct")
    bRetour.classList.add("d-none")
    bProduct.classList.add("d-none")
    
    throw "Erreur"
  }
}

//Integration des informations produits
async function run() {
  let product = await call()
  console.log(product)

  //Recuperation de l'image du produit
  let bearImg = document.getElementById("bearImg")
  bearImg.setAttribute("src", product.imageUrl)
  bearImg.alt = `image ourson ${product.name}`

  //Recuperation titre du produit
  let bearTitle = document.getElementById("bearTitle")
  bearTitle.innerText = `${product.name}`

  //Recuperation description du produit
  let bearDescription = document.getElementById("bearDescription")
  bearDescription.innerText = `${product.description}`

  //Recuperation liste de couleur du produit
  let bearColor = document.getElementById("bearColor") 
  for (let color of product.colors){
    let colorList = document.createElement("option")
    colorList.setAttribute("value", color)
    colorList.innerText= color
    bearColor.appendChild(colorList)
  }

  //Creation liste de quantité
  let bearQty = document.getElementById("bearQty")  
  console.log(bearQty)
  for (let i=1; i<=10; i++){  
    let qtyList = document.createElement("option")
    qtyList.setAttribute("value", i)
    qtyList.innerText= i
    bearQty.appendChild(qtyList)
  }
  
  //Recuperation prix du produit
  let bearPrice = document.getElementById("bearPrice")
  bearPrice.innerText = `${product.price}`/ 100 + " €"

  //Commande produit
  let bearCommand = document.getElementById("bearCommand")
  bearCommand.addEventListener('click', function(e){

    //Creation du local storage
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

    //Creation de la boucle d'ajout de quantité
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