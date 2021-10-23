//Accès aux données de l' API
async function call() {
  let response = await fetch("http://localhost:3000/api/teddies")

  if (response.ok) {
  return response.json()    
  }

  else {
    throw "Erreur sur la requête"
  }
}

//Recuperation des données de l'API
async function bearProducts(){
  let products = await call()
  console.log(products)
  return products
}

//Integration des produits
bearProducts()

.then(function(res) {
  let article = document.getElementById("bear")
  article.innerText = ''

  for (let product of res) {
    let col = document.createElement('div')
    col.className = "col-12 col-lg-4"
    article.appendChild (col)

    let card = document.createElement('div')
    card.className = "my-5 mb-3"
    col.appendChild (card)

    //ID Produit
    let a = document.createElement('a')
    a.href="./bear_1.html?id=" + product._id
    a.className = "stretched-link"
    card.appendChild (a)

    //Image produit
    let img = document.createElement('img')
    img.className = "card-img-top"
    img.src = product.imageUrl
    img.alt = `image ourson ${product.name}`
    a.appendChild (img)

    let cardBody = document.createElement('div')
    cardBody.className = "card-body mx-auto"
    card.appendChild (cardBody)

    //Titre du produit
    let cardTitle = document.createElement('h5')
    cardTitle.className = "card-title text-center"
    cardTitle.innerText = `${product.name}`
    cardBody.appendChild (cardTitle)

    //Description du produit
    let cardText = document.createElement('p')
    cardText.className = "card-text text-center"
    cardText.innerText = `${product.description}`
    cardBody.appendChild (cardText)

    //Prix produit
    let priceBear = document.createElement('h3')
    priceBear.className = "cart-title text-center font-weight-bold text-danger"
    priceBear.innerText = `${product.price}`/ 100 + " €" //Conversion prix en Euro
    cardBody.appendChild (priceBear)

    console.log(article)
    console.log(product._id)

  }
});


