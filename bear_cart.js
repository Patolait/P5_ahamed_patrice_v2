//Recuperation des donnée du local storage
let bearCart = JSON.parse(localStorage.getItem('bearStore'));
console.log(bearCart)

//Recuperation données APi dédiées aux produits du localStorage
let get = async (id) => {
  let response = await fetch(`http://localhost:3000/api/teddies/${id}`)
  if( response.ok ) {
    return response.json()
  } 
  else {
    throw "Erreur sur la requête"
  }
}

//Affichage des éléments du panier
let getBear = async () =>{

  let products = {}

  //Alerte en cas de panier vide
  if (bearCart === null){
    //Affichage message d'alert
    let emptyBear = document.getElementById("emptyBear")
    emptyBear.classList.remove("d-none");

    //Mise en cache des éléments du panier
    let bearTable = document.getElementById("bearTable")
    let bearConfirme = document.getElementById("bearConfirme")
    let bearReturn = document.getElementById("bearReturn")
    bearTable.classList.add("d-none");
    bearConfirme.classList.add("d-none");
    bearReturn.classList.add("d-none");
  }

  let bearTable = document.getElementById("bearResume")
  bearTable.innerText = ''

  //Boucle d'ajout des produits
  for (let bear of bearCart){

    let bearLine = document.createElement('tr')
    bearTable.appendChild (bearLine)

    //Recuperation des données de l'API pour chaque produit
    if(products[bear.id] === undefined){
      let res = await fetch (`http://localhost:3000/api/teddies/${bear.id}`)
      let product = await res.json()
      products[bear.id] = product
    } 
    console.log(products)    


  
    //Recuperation des informations à afficher
    let bPrice = products[bear.id].price / 100
    // let bearInformation = [
    //   products[bear.id].imageUrl,
    //   bear.id,
    //   products[bear.id].name,
    //   products[bear.id].description,
    //   bear.color,
    //   `${bPrice} €`,
    //   bear.quantity,
    //   `${bPrice * bear.quantity} €`
    // ]
    // console.log (bearInformation)


    //Image
    let bearColImg = document.createElement('td')
    // bearColImg.className = "w-10% p-10%"
    let bearCartImg = document.createElement('img')
    bearCartImg.className = "img-fluid mx-auto d-block"
    bearCartImg.setAttribute("src", products[bear.id].imageUrl)
    bearCartImg.alt = products[bear.id].name
    bearLine.appendChild (bearColImg)
    bearColImg.appendChild (bearCartImg)

    //Référence
    let bearColRef = document.createElement('td')
    bearColRef.className = "w-25 h-25"
    let bearCartRef = document.createElement('p')
    bearCartRef.className = "text-center text-lg-left"
    bearLine.appendChild (bearColRef)
    bearColRef.appendChild (bearCartRef)
    bearCartRef.innerText=`${bear.id}`

    //Modèle
    let bearColTitle = document.createElement('td')
    bearColTitle.className = "w-25 h-25"
    let bearCartTitle = document.createElement('h5')
    bearCartTitle.className = "text-center text-lg-left"
    bearLine.appendChild (bearColTitle)
    bearColTitle.appendChild (bearCartTitle)
    bearCartTitle.innerText=`${products[bear.id].name}`

    // //Description
    // let bearColDescription = document.createElement('td')
    // bearColDescription.className = "w-25 h-25"
    // let bearCartDescription = document.createElement('p')
    // bearCartDescription.className = "text-center text-lg-left"
    // bearLine.appendChild (bearColDescription)
    // bearColDescription.appendChild (bearCartDescription)
    // bearCartDescription.innerText=`${products[bear.id].description}`

    //Color
    let bearColColor = document.createElement('td')
    bearColColor.className = "w-25 h-25"
    let bearCartColor = document.createElement('p')
    bearColColor.className = "text-center text-lg-left"
    bearLine.appendChild (bearColColor)
    bearColColor.appendChild (bearCartColor)
    bearCartColor.innerText=`${bear.color}`

    //Qty
    let bearColQty = document.createElement('td')
    bearColQty.className = "w-25 h-25"
    let bearQtyList = document.createElement("select")
    for (let i=`${bear.quantity}`; i<=10 ; i++){  
      let bearCartQty = document.createElement('option')
      bearCartQty.setAttribute("value", i)
      bearCartQty.innerText= i
      bearQtyList.appendChild(bearCartQty)
    }
    // let bearCartQty = document.createElement('option')
    // bearCartQty.innerText= `${bear.quantity}`
    bearLine.appendChild (bearColQty)
    bearColQty.appendChild(bearQtyList)
    
    // let bearCartQty = document.createElement('p')
    // bearCartQty.className = "text-center text-lg-center"
    // bearLine.appendChild (bearColQty)
    // bearColQty.appendChild (bearCartQty)
    // bearCartQty.innerText=`${bear.quantity}`

    //Price
    let bearColPrice = document.createElement('td')
    let bearCartPrice = document.createElement('h5')
    bearCartPrice.className = "text-center text-lg-right font-weight-bold"
    bearLine.appendChild (bearColPrice)
    bearColPrice.appendChild (bearCartPrice)
    bearCartPrice.innerText=`${bPrice} €`

    

    //Total ligne
    let bearColTotalLine = document.createElement('td')
    bearColTotalLine.className = "w-25 h-25"
    let bearCartTotalLine = document.createElement('h4')
    bearCartTotalLine.className = "text-center text-lg-right text-danger font-weight-bold"
    bearLine.appendChild (bearColTotalLine)
    bearColTotalLine.appendChild (bearCartTotalLine)
    bearCartTotalLine.innerText=`${bPrice * bear.quantity} €`
    let bearTotalPrice = 0
    let bearTotal = bPrice * bear.quantity + bearTotalPrice
    console.log(bearTotal)

    //Delete
    let bearColDelete = document.createElement('td')
    bearColDelete.className = "text-right"
    let bearLink = document.createElement('button')
    let bearCartDelete = document.createElement('i')
    bearCartDelete.className = "fas fa-trash-alt"
    bearLine.appendChild (bearColDelete)
    bearColDelete.appendChild (bearLink)
    bearLink.appendChild (bearCartDelete)
    //Evennement suppression
    bearCartDelete.addEventListener('click', function(){
      bearTable.removeChild(bearLine);
      localStorage.removeItem(bear.id);
    })

    
    bearTotalPrice = bearTotalPrice + bPrice * bear.quantity

    //Calcul Total
    let bearTotalTab = document.getElementById("totalPrice")
    bearTotalTab.innerText = ''

    let bearPriceLine = document.createElement('tr')
    bearTotalTab.appendChild (bearPriceLine)

    //Total world
    let bearColTotalAll = document.createElement('td')
    bearColTotalAll.setAttribute("colspan","5")
    let bearCartTotalAll = document.createElement('h3')
    bearCartTotalAll.className = "text-center text-lg-right font-weight-bold"
    bearCartTotalAll.innerText = "Total"
    bearPriceLine.appendChild (bearColTotalAll)
    bearColTotalAll.appendChild (bearCartTotalAll)

    //TotalPrice
    
    let bearColTotalPrice = document.createElement('td')
    bearColTotalPrice.setAttribute("colspan","2")
    let bearCartTotalPrice = document.createElement('h2')
    bearCartTotalPrice.className = "text-center text-lg-right font-weight-bold text-danger"
    bearPriceLine.appendChild (bearColTotalPrice)
    bearColTotalPrice.appendChild (bearCartTotalPrice)
    bearCartTotalPrice.innerText=`${bearTotalPrice} €`

    

    

  }



  



  

  // //Description
  // let bearColDescription = document.createElement('td')
  // let bearCartDescription = document.createElement('p')
  // bearCartDescription.className = "text-center text-lg-left"
  // bearLine.appendChild (bearColDescription)
  // bearColDescription.appendChild (bearCartDescription)



  // //Qty
  // let bearColQty = document.createElement('td')
  // let bearCartQty = document.createElement('p')
  // bearCartQty.className = "text-center text-lg-center"
  // bearLine.appendChild (bearColQty)
  // bearColQty.appendChild (bearCartQty)

  // //Price
  // let bearColPrice = document.createElement('td')
  // let bearCartPrice = document.createElement('h4')
  // bearCartPrice.className = "text-center text-lg-right font-weight-bold"
  // bearLine.appendChild (bearColPrice)
  // bearColPrice.appendChild (bearCartPrice)

  // //Delete
  // let bearColDelete = document.createElement('td')
  // bearColDelete.className = "text-right"
  // let bearCartDelete = document.createElement('i')
  // bearCartDelete.className = "fas fa-trash-alt"
  // bearLine.appendChild (bearColDelete)
  // bearColDelete.appendChild (bearCartDelete)


  // //Prix total
  // let bearTotalTab = document.getElementById("totalPrice")
  // bearTotalTab.innerText = ''

  // let bearPriceLine = document.createElement('tr')
  // bearTotalTab.appendChild (bearPriceLine)
  
  // //numero ligne
  // let bearTotalRow = document.createElement('th')
  // bearTotalRow.scope = "row"
  // bearPriceLine.appendChild (bearTotalRow)

  // //Total
  // let bearColTotal = document.createElement('td')
  // bearColTotal.setAttribute("colspan","4")

  // let bearCartTotal = document.createElement('h3')
  // bearCartTotal.className = "text-center text-lg-right font-weight-bold"
  // bearTotalTab.innerText = "Total"
  // bearPriceLine.appendChild (bearColTotal)
  // bearColTotal.appendChild (bearCartTotal)

  // //TotalPrice
  // let bearColTotalPrice = document.createElement('td')
  // bearColTotalPrice.setAttribute("colspan","2")

  // let bearCartTotalPrice = document.createElement('h2')
  // bearColTotalPrice.className = "text-center text-lg-right font-weight-bold text-danger"
  // bearPriceLine.appendChild (bearColTotal)
  // bearColTotal.appendChild (bearCartTotal)



  // for (let bear of bearCart) {


  

  //   bearCartTitle.innerText=`${bear.id}`
  //   bearCartColor.innerText=`${bear.color}`
  //   bearCartQty.innerText=`${bear.quantity}`

    


  
  // }
}


getBear()