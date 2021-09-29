
async function call() {

  let response = await fetch("http://localhost:3000/api/teddies")
  
    if (response.ok) {
    return response.json()    
    }   

    else {
      throw "Erreur sur la requête"
    }

}

async function bearProducts(){
  let products = await call()
  console.log(products)
  return products
}

bearProducts()
  .then(function(res) {

    let article = document.getElementById("bear")
    article.innerText = ''

    for (let product of res) {
      let col = document.createElement('div')
      col.className = "col-12 col-lg-4"

      let card = document.createElement('div')
      card.className = "my-5 mb-3"

      let a = document.createElement('a')
      a.href=`${product.name}.html`
      a.className = "stretched-link"

      let img = document.createElement('img')
      img.className = "card-img-top"
      img.src = product.imageUrl
      img.alt = product.className

      let cardBody = document.createElement('div')
      cardBody.className = "card-body mx-auto"

      let cardTitle = document.createElement('h5')
      cardTitle.className = "card-title text-center"
      cardTitle.innerText = `${product.name}`

      let cardText = document.createElement('p')
      cardText.className = "card-text text-center"
      cardText.innerText = `${product.description}`

      let priceBear = document.createElement('h3')
      priceBear.className = "cart-title text-center font-weight-bold text-danger"
      priceBear.innerText = `${product.price}`

      article.appendChild (col)
      col.appendChild (card)
      card.appendChild (a)
      a.appendChild (img)
      card.appendChild (cardBody)
      cardBody.appendChild (cardTitle)
      cardBody.appendChild (cardText)
      cardBody.appendChild (priceBear)

      console.log(article)

      }
});

