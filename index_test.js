
async function call() {

  fetch("http://localhost:3000/api/teddies")
  
  .then (function(response) {
    if (response.ok) {
    return response.json()    
    }    
  })

  .catch (function (erreur) {
      throw "Erreur sur la requête"
    })
}

async function bearProducts(){
  let products = await call()
}

bearProducts()
  .then(function(res) {
    document
      .getElementById("bear")
      .innerText = ''

    for (let product of products) {
      let row = document.createElement('div')
      row.className = "row"

      let col = document.createElement('div')
      col.className = "col-12 col-lg-4"

      let card = document.createElement('div')
      col.className = "col-12 col-lg-4"

      let a = document.createElement('a')
      a.href="${product.name}.html"
      a.className = "stretched-link"

      let img = document.createElement('img')
      img.className = "card-img-top"
      img.src = product.imageUrl
      img.alt = product.className

      let cardBody = document.createElement('div')
      cardBody.className = "card-body mx-auto"

      let cardTitle = document.createElement('h5')
      cardTitle.className = "card-title text-center"
      cardTitle.innerText = "${product.name}"

      let cardText = document.createElement('p')
      cardText.className = "card-text text-center"
      cardTitle.innerText = "${product.description}"

      let priceBear = document.createElement('h3')
      priceBear.className = "cart-title text-center font-weight-bold text-danger"
      cardTitle.innerText = "${product.price}"

      section.appendChild(row)
      row.appendChild (col)
      col.appendChild (card)
      card.appendChild (a)
      a.appendChild (img)
      cardBody.appendChild (card)
      cardTitle.appendChild (cardBody)
      cardText.appendChild (cardBody)
      priceBear.appendChild (cardBody)

      console.log(row)

      }
});

// bearProducts()
//   .then(function(res){
//     console.log(products)

//     // let section = document.getElementById('bear')
//     // section.innerText = ''

//   // for (let product of products) {
//   //   let row = document.createElement('div')
//   //   row.className = "row"

//   //   let col = document.createElement('div')
//   //   col.className = "col-12 col-lg-4"

//   //   let card = document.createElement('div')
//   //   col.className = "col-12 col-lg-4"

//   //   let a = document.createElement('a')
//   //   a.href="${product.name}.html"
//   //   a.className = "stretched-link"

//   //   let img = document.createElement('img')
//   //   img.className = "card-img-top"
//   //   img.src = product.imageUrl
//   //   img.alt = product.className

//   //   let cardBody = document.createElement('div')
//   //   cardBody.className = "card-body mx-auto"

//   //   let cardTitle = document.createElement('h5')
//   //   cardTitle.className = "card-title text-center"
//   //   cardTitle.innerText = "${product.name}"

//   //   let cardText = document.createElement('p')
//   //   cardText.className = "card-text text-center"
//   //   cardTitle.innerText = "${product.description}"

//   //   let priceBear = document.createElement('h3')
//   //   priceBear.className = "cart-title text-center font-weight-bold text-danger"
//   //   cardTitle.innerText = "${product.price}"

//   //   section.appendChild(row)
//   //   row.appendChild (col)
//   //   col.appendChild (card)
//   //   card.appendChild (a)
//   //   a.appendChild (img)
//   //   cardBody.appendChild (card)
//   //   cardTitle.appendChild (cardBody)
//   //   cardText.appendChild (cardBody)
//   //   priceBear.appendChild (cardBody)

//   //   console.log(section)

//     // }

//   });


