let bearCart = JSON.parse(localStorage.getItem('bearStore'));

for (let i of bearStore){
  
}

async function call() {

  let response = await fetch("http://localhost:3000/api/teddies/")
  console.log(response)
  
  if (response.ok) {
    return response.json()
  }   

  else {
    throw "Ce produit n'existe pas"
  }
}

let getBear = async () =>{

  let bproduct = await call()

  let bearTable = document.getElementById("bearResume")
  bearTable.innerText = ''

  let bearLine = document.createElement('tr')
  bearTable.appendChild (bearLine)
  
  //numero ligne
  let bearCartClassement = document.createElement('th')
  bearCartClassement.scope = "row"
  bearLine.appendChild (bearCartClassement)

  //Image
  let bearColImg = document.createElement('td')
  let bearCartImg = document.createElement('img')
  bearCartImg.className = "img-fluid mx-auto d-block"
  bearCartImg.src = bproduct.imageUrl
  bearCartImg.alt = bproduct.className
  bearLine.appendChild (bearColImg)
  bearColImg.appendChild (bearCartImg)

  //Modèle
  let bearColTitle = document.createElement('td')
  let bearCartTitle = document.createElement('h5')
  bearCartTitle.className = "text-center text-lg-left"
  bearLine.appendChild (bearColTitle)
  bearColTitle.appendChild (bearCartTitle)

  //Description
  let bearColDescription = document.createElement('td')
  let bearCartDescription = document.createElement('p')
  bearCartDescription.className = "text-center text-lg-left"
  bearLine.appendChild (bearColDescription)
  bearColDescription.appendChild (bearCartDescription)

  //Color
  let bearColColor = document.createElement('td')
  let bearCartColor = document.createElement('p')
  bearColColor.className = "text-center text-lg-left"
  bearLine.appendChild (bearColColor)
  bearColColor.appendChild (bearCartColor)

  //Qty
  let bearColQty = document.createElement('td')
  let bearCartQty = document.createElement('p')
  bearCartQty.className = "text-center text-lg-center"
  bearLine.appendChild (bearColQty)
  bearColQty.appendChild (bearCartQty)

  //Price
  let bearColPrice = document.createElement('td')
  let bearCartPrice = document.createElement('h4')
  bearCartPrice.className = "text-center text-lg-right font-weight-bold"
  bearLine.appendChild (bearColPrice)
  bearColPrice.appendChild (bearCartPrice)

  //Delete
  let bearColDelete = document.createElement('td')
  bearColDelete.className = "text-right"
  let bearCartDelete = document.createElement('i')
  bearCartDelete.className = "fas fa-trash-alt"
  bearLine.appendChild (bearColDelete)
  bearColDelete.appendChild (bearCartDelete)


  //Prix total
  let bearTotalTab = document.getElementById("totalPrice")
  bearTotalTab.innerText = ''

  let bearPriceLine = document.createElement('tr')
  bearTotalTab.appendChild (bearPriceLine)
  
  //numero ligne
  let bearTotalRow = document.createElement('th')
  bearTotalRow.scope = "row"
  bearPriceLine.appendChild (bearTotalRow)

  //Total
  let bearColTotal = document.createElement('td')
  bearColTotal.setAttribute("colspan","4")

  let bearCartTotal = document.createElement('h3')
  bearCartTotal.className = "text-center text-lg-right font-weight-bold"
  bearTotalTab.innerText = "Total"
  bearPriceLine.appendChild (bearColTotal)
  bearColTotal.appendChild (bearCartTotal)

  //TotalPrice
  let bearColTotalPrice = document.createElement('td')
  bearColTotalPrice.setAttribute("colspan","2")

  let bearCartTotalPrice = document.createElement('h2')
  bearColTotalPrice.className = "text-center text-lg-right font-weight-bold text-danger"
  bearPriceLine.appendChild (bearColTotal)
  bearColTotal.appendChild (bearCartTotal)



  for (let bear of bearCart) {


  

    bearCartTitle.innerText=`${bear.id}`
    bearCartColor.innerText=`${bear.color}`
    bearCartQty.innerText=`${bear.quantity}`

    


  
  }
}


getBear()