//Fonction

//Categorie choisie
const category = 'teddies'

//Appel url
const bearUrl = `http://localhost:3000/api/${category}`

/**
 * Appel API pour recuperer des informations du server
 * @param  bearWay string route attendue
 * @returns {Promise} 
 */
const callApi = async (bearWay) => {
  let response = await fetch( bearUrl + bearWay)

  if (response.ok){
    return response.json()

    if (response.status == 404) {
      //Affichage message d'erreur
      let noExist = document.getElementById("noExist")
      noExist.classList.remove("d-none");

      //Suppression affichage standard
      let bRetour = document.getElementById("bRetour")
      let bProduct = document.getElementById("bProduct")
      bRetour.classList.add("d-none")
      bProduct.classList.add("d-none")
    } 
  }
  else {
    //Affichage message d'erreur
    let noExist = document.getElementById("errorServer")
    noExist.classList.remove("d-none");

    //Suppression affichage standard
    let bRetour = document.getElementById("bRetour")
    let bProduct = document.getElementById("bProduct")
    bRetour.classList.add("d-none")
    bProduct.classList.add("d-none")
    
    throw "Erreur sur la requête"
  }
}

//Creation colonne
const bearCol   = (cssClass) =>{
  let div       = document.createElement('div')
  div.className = cssClass
  return div
}

//Creation lien
const bearLink   = ( href, cssClass ) => {
	let link       = document.createElement( 'a' )
	link.href      = href
	link.className = cssClass
	return link
}

//Image produit
const bearImg   = ( cssClass, src, alt ) =>{
  let img       = document.createElement('img')
  img.className = cssClass
  img.src       = src
  img.alt       = alt
  return img
}

//Titre produit
const bearTitle   = (titleLevel,cssClass, content) =>{
  let title       = document.createElement(`h${titleLevel}`)
  title.className = cssClass
  title.innerText = content
  return title
}

//Description produit
const bearDescription   = (cssClass, content) =>{
  let description       = document.createElement('p')
  description.className = cssClass
  description.innerText = content
  return description
}
//Prix produit
const bearPrice   = (priceLevel, cssClass, content) =>{
  let price       = document.createElement(`h${priceLevel}`)
  price.className = cssClass
  price.innerText = content / 100 + "€"
}

//Page produit

//Notification 
const notify = ( message, success ) => {
	let div       = document.createElement( 'div' )
	div.innerText = message
	div.className = `alert alert-${success ? 'success' : 'danger'} notification`
	document.getElementsByTagName( 'body' )[0].appendChild( div )

	setTimeout( () => {
		$( div ).fadeOut( 500 )
	}, 8500 )
}

//Integration image
const imgIntegration   = ( id, src, alt ) =>{
  let img       = document.getElementById(id)
  img.src       = src
  img.alt       = "image ourson " +  alt
  return img
}

//Integration  element
const elementIntegration = (id, content) =>{
  let elmt = document.getElementById(id)
  elmt.innerText = content
}

//Generation selection
const generateOption = (element, options) =>{
  let select = document.getElementById(element)
  for (let value of options){
    let option = document.createElement("option")
    option.value = value
    option.innerText = value
    select.appendChild(option)

  }
}

//Generation quantité
const generateQty = (element, number) =>{
  let select = document.getElementById(element)
  for (let i=1; i<=number; i++){
    let quantity = document.createElement("option")
    quantity.value = i
    quantity.innerText = i
    select.appendChild(quantity)

  }
}

//Generation du prix
const generatePrice = (element,number) =>{
  let price = document.getElementById(element)
  price.innerText = number / 100 + "€"
}

let runIndex   = async () =>{
  let products = await callApi('/')
  console.log(products)
  
  let article = document.getElementById("bear")
  article.innerText = ''

  for (let product of products) {
    let col = bearCol('col-12 col-lg-4')
    article.appendChild(col)

    let card = bearCol('card my-5 mb-3')
    col.appendChild(card)

    let link = bearLink("./bear_1.html?id=" + product._id, 'stretched-link')
    card.appendChild(link)

    let img = bearImg('card-img-top', product.imageUrl, `image ourson ${product.name}`)
    link.appendChild(img)

    let cardBody = bearCol('card-body mx-auto')
    card.appendChild(cardBody)

    let title = bearTitle(5, 'card-title text-center', `${product.name}`)
    cardBody.appendChild(title)

    let description = bearDescription('card-text text-center', `${product.description}`)
    cardBody.appendChild(description)

    // let price = bearPrice(3, 'card-title text-center font-weight-bold text-danger', `${product.price}`)
    // cardBody.appendChild(price)
  }

}

let runProduct = async () =>{
  //Recherche de l'url
const queryString_url = window.location.search

//Recuperation de l'id
const urlSearchParams = new URLSearchParams(queryString_url)
const id = urlSearchParams.get("id")

// notify( 'Votre produit a bien été ajouté au panier', true )

let product = await callApi(`/${id}`)
console.log(product)

let imgProduct = imgIntegration('bearImg', product.imageUrl, `${product.name}`)

let titleProduct = elementIntegration('bearTitle', `${product.name}`)

let descriptionProduct = elementIntegration('bearDescription', `${product.description}`)

let colorProduct = generateOption('bearColor', product.colors)

let quantityProduct = generateQty('bearQty', 10)

let priceProduct = generatePrice('bearPrice', `${product.price}`)

}
runProduct

let bearProduct = async () =>{
  

  

  let img = bearImg('card-img-top', product.imageUrl, `image ourson ${product.name}`)
    link.appendChild(img)


}



// //Accès aux données de l' API
// async function call() {
//   let response = await fetch("http://localhost:3000/api/teddies")

//   if (response.ok) {
//     return response.json()    
//   }

//   else {
//     throw "Erreur sur la requête"
//   }
// }

//Recuperation des données de l'API
// async function bearProducts(){
//   let products = await call()
//   console.log(products)
//   return products
// }

// //Integration des produits
// bearProducts()

// .then(function(res) {
//   let article = document.getElementById("bear")
//   article.innerText = ''

//   for (let product of res) {
//     let col = document.createElement('div')
//     col.className = "col-12 col-lg-4"
//     article.appendChild (col)

//     let card = document.createElement('div')
//     card.className = "my-5 mb-3"
//     col.appendChild (card)

//     //ID Produit
//     let a = document.createElement('a')
//     a.href="./bear_1.html?id=" + product._id
//     a.className = "stretched-link"
//     card.appendChild (a)

//     //Image produit
//     let img = document.createElement('img')
//     img.className = "card-img-top"
//     img.src = product.imageUrl
//     img.alt = `image ourson ${product.name}`
//     a.appendChild (img)

//     let cardBody = document.createElement('div')
//     cardBody.className = "card-body mx-auto"
//     card.appendChild (cardBody)

//     //Titre du produit
//     let cardTitle = document.createElement('h5')
//     cardTitle.className = "card-title text-center"
//     cardTitle.innerText = `${product.name}`
//     cardBody.appendChild (cardTitle)

//     //Description du produit
//     let cardText = document.createElement('p')
//     cardText.className = "card-text text-center"
//     cardText.innerText = `${product.description}`
//     cardBody.appendChild (cardText)

//     //Prix produit
//     let priceBear = document.createElement('h3')
//     priceBear.className = "cart-title text-center font-weight-bold text-danger"
//     priceBear.innerText = `${product.price}`/ 100 + " €" //Conversion prix en Euro
//     cardBody.appendChild (priceBear)

//     console.log(article)
//     console.log(product._id)

//   }
// });


