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

let bearCart = JSON.parse(localStorage.getItem('bearStore'));
console.log(bearCart)

//Creation ligne
const bearTabRow   = (cssClass) =>{
  let row       =  document.createElement('tr')
  row.className = cssClass
  return row
}

const bearTabCol = (cssClass, attribut, value) =>{
  let col       = document.createElement('td')
  col.className = cssClass
  col.setAttribute(attribut,value)
  return col
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
  return price
}

// Recuperation element Id
const getId = (id) =>{
  let idElement = document.getElementById(`${id}`)
  return idElement
}

const create = (element, cssClass, text) =>{
  let creation = document.createElement(element)
  creation.className = cssClass
  creation.innerText = `${text}`
  return creation
}

//Insertion éléments
const innerElement = (idElement) =>{
  let element = document.getElementById(idElement)
  element.innerText = ''
  return element
}

//Page produit

//Notification 
const notify = ( id, message, success ) => {
  let innerMessage = document.getElementById(id)
	let div       = document.createElement( 'div' )
  innerMessage.appendChild(div)
	div.innerText = message
	div.className = `alert alert-${success ? 'success' : 'danger'} notification`
	// document.getElementsByTagName( 'body' )[0].appendChild( div )

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

//Total
totalArticle = 0
const generateTotal = () =>{
  if (totalArticle = 0){
    getId("cartQty").innerText = "(0)"
  }
  else{
    getId("cartQty").innerText = `(${totalArticle})`
  }
  
}

//Generation liste
const generateSelect = ( name, id, options, defaultValue = null, cssClass = '' ) => {
	let select       = document.createElement( 'select' )
	select.name      = name
	select.id        = id
	select.className = cssClass

	for( let value in options ) {
		let option       = document.createElement( 'option' )
		option.value     = value
		option.innerText = options[value]
		select.appendChild( option )
	}

	if( defaultValue !== null ) {
		select.value = defaultValue
	}

	return select
}

const deleteProduct = (productId, productColor) =>{
  for (let productIndex in bearCart){
    let product = bearCart[productIndex]
    if (product.id === productId && product.color === productColor){
      bearCart.splice(productIndex, 1)
    }
  }
  localStorage.setItem ('bearStore', JSON.stringify(bearCart))
}


let runIndex   = async () =>{
  let products = await callApi('/')
  console.log(products)

  generateTotal ()
  
  let article = innerElement('bear')

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

    let price = bearPrice(3, 'card-title text-center font-weight-bold text-danger', `${product.price}`)
    cardBody.appendChild(price)
  }
}

let updateProduct = (file, productId, productColor, newQty, tab, storage) =>{
  let alreadyExist = false
  for (let product of file){
    if (product.id === productId && product.color === productColor){
      product.qty = product.qty + newQty
      alreadyExist = true
    }
    if (! alreadyExist){
      file.push(tab)
    }
    localStorage.setItem (storage, JSON.stringify(file))
    localStorage.getItem (storage)
  }
  console.log (file)
}

let updateCartQty = (productId, productColor, newQty) =>{
  let modified = false
  for (let product of bearCart){
    if (product.id === productId && product.color === productColor){
      product.qty = product.qty + newQty
      modified = true
    }
    localStorage.setItem ('bearStore', JSON.stringify(bearCart))
    localStorage.getItem ('bearStore')
  }
  console.log (bearCart)
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

  //Modif du DOM
  imgIntegration('bearImg', product.imageUrl, `${product.name}`)
  elementIntegration('bearTitle', `${product.name}`)
  elementIntegration('bearDescription', `${product.description}`)
  generateOption('bearColor', product.colors)
  generateQty('bearQty', 10)
  generatePrice('bearPrice', `${product.price}`)
  getId("bearCommand").addEventListener('click', function(e){
    //Message de validation 
    alert("Le(s) produit(s) à été rajouté à votre panier")


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
    // updateProduct (resume, 'bArticle.id', 'bArticle.color', Number(bArticle.quantity), bArticle, 'resumeArticle')
    let alreadyExist = false
    let total = 0

    // updateProduct(resume, bArticle.id, bArticle.color, bArticle.quantity, bArticle, resumeArticle)
    for (let bear of resume){
      if (bear.id === bArticle.id && bear.color === bArticle.color){
        bear.quantity = Number(bear.quantity) + Number(bArticle.quantity)
        alreadyExist = true
        
        break
      }
      total += Number(bear.quantity)
      totalArticle = total
      getId("cartQty").innerText = `(${totalArticle})` 
    }
    

    if (!alreadyExist){
      resume.push(bArticle)
    }

    localStorage.setItem (resumeArticle, JSON.stringify(resume))
    localStorage.getItem('resumeArticle')

  });

}

let runCart = async () =>{
  
  //Recuperation des donnée du local storage
  let bearCart = JSON.parse(localStorage.getItem('bearStore'));
  console.log(bearCart)

  let get = async (id) => {
  let product = await callApi(`/${id}`)
  console.log(product)
  }


  let getBear = async () =>{

    let cartTable = getId( 'bearRow' )
    let hasFirstRow = false
    for( let i = 0 ; i < cartTable.childNodes.length ; i++ ) {
      let child = cartTable.childNodes[i]
      if( ! hasFirstRow && child.tagName === 'tr' ) {
        hasFirstRow = true
      }
      else {
        child.remove()
        i--
      }
    }

    let products = {}
    let bearTotalPrice = 0

    //Alerte en cas de panier vide
    if (bearCart === null){
    //Affichage message d'alert
    let emptyBear = getId("emptyBear")
    emptyBear.classList.remove("d-none");

    //Mise en cache des éléments du panier
    let bearTable = getId("bearTable")
    let bearConfirme = getId("bearConfirme")
    let bearReturn = getId("bearReturn")
    bearTable.classList.add("d-none");
    bearConfirme.classList.add("d-none");
    bearReturn.classList.add("d-none");
    }

    let bearTable = getId("bearResume")
    bearTable.innerText = ''

    

    //Boucle ajout produit
    for (let bear of bearCart){
      

      if(products[bear.id] ===undefined){
        products[bear.id] = await callApi(`/${bear.id}`)
      }
      console.log(products)  

      let product = products[bear.id]

      let bPrice = products[bear.id].price/100

      let cartLine = bearTabRow()
      bearTable.appendChild (cartLine)


      //Image panier
      let colImg = bearTabCol ()
      cartLine.appendChild(colImg)
      let cartImg = bearImg('img-fluid mx-auto d-block', product.imageUrl, `${product.name}`)
      colImg.appendChild (cartImg)

      //Référence panier
      let colRef = bearTabCol('w-25 h-25')
      cartLine.appendChild(colRef)
      let cartRef = bearDescription ('text-center text-lg-left small', `${bear.id}`)
      colRef.appendChild(cartRef)

      //Modele panier
      let colTitle = bearTabCol('w-25 h-25')
      cartLine.appendChild(colTitle)
      let cartTitle = bearTitle(5, 'text-center text-lg-left', `${product.name}`)
      colTitle.appendChild(cartTitle)

      //Couleur element panier
      let colColor = bearTabCol('w-25 h-25')
      cartLine.appendChild(colColor)
      let cartColor = bearDescription ('text-center text-lg-left', `${bear.color}`)
      colColor.appendChild(cartColor)

      //Quantité
      let bearOptionsQty = {
        1 : '1',
        2 : '2',
        3 : '3',
        4 : '4',
        5 : '5',
        6 : '6',
        7 : '7',
        8 : '8',
        9 : '9',
        10: '10'
      }
      let colQty = bearTabCol('w-25 h-25')
      cartLine.appendChild(colQty)
      let listQty = generateSelect('quantity', '', bearOptionsQty, bear.quantity)
      listQty.addEventListener('change', (e) =>{
        updateCartQty (bear.id, bear.color, listQty.value)
        
        // let modified = false
        // for (let product of bearCart){
        //   if(product.id === bear.id && product.color === bear.color){
        //     bear.quantity = listQty.value
        //     modified = true
        //   }
        // }

        localStorage.setItem (bear.quantity, JSON.stringify('bearStore'))
        localStorage.getItem('bearStore')

        console.log(e)

      })
      colQty.appendChild(listQty)

      //Prix panier
      let colPrice = bearTabCol('w-25 h-25')
      cartLine.appendChild(colPrice)
      let cartPrice = bearTitle(5, 'text-center text-lg-right font-weight-bold', `${bPrice}€`)
      colPrice.appendChild(cartPrice)

      //Total ligne
      let colTotalLine = bearTabCol('w-25 h-25')
      cartLine.appendChild(colTotalLine)
      let cartTotalLine = bearTitle(4, 'text-center text-lg-right text-danger font-weight-bold', `${bPrice * bear.quantity}€`)
      colTotalLine.appendChild(cartTotalLine)

      //Delete line
      let colDelete = bearTabCol()
      cartLine.appendChild(colDelete)
      let deleteLink = document.createElement('button')
      colDelete.appendChild(deleteLink)
      let cartDelete = document.createElement('i')
      cartDelete.className = "fas fa-trash-alt"
      deleteLink.appendChild (cartDelete)

      //Evennement suppression
      cartDelete.addEventListener('click', (e) =>{
          cartLine.remove()
          deleteProduct(bear.id, bear.color)
          
      })

      bearTotalPrice = bearTotalPrice + bPrice * bear.quantity

      //Total Price
      let totalAll = getId('totalPrice')
      totalAll.innerText = ''

      let priceLine = bearTabRow()
      totalAll.appendChild (priceLine)

      let colTotalAll = bearTabCol('','colspan',6)
      // colTotalAll.setAttribute("colspan","5")
      priceLine.appendChild (colTotalAll)
      let cartTotalAll = bearTitle(3, 'text-lg-right font-weight-bold', "Total")
      colTotalAll.appendChild(cartTotalAll)

      let colPriceAll = bearTabCol('', 'colspan', 2)
      // colTotalAll.setAttribute("colspan","2")
      priceLine.appendChild (colPriceAll)
      let cartPriceAll = bearTitle(2, 'text-center, text-lg-right font-weight-bold text-danger', `${bearTotalPrice} €`)
      colPriceAll.appendChild (cartPriceAll)

      getId("bearConfirme").addEventListener('click', (e) =>{
        e.preventDefault();
        console.log(e)

        //retirer bouton confirmer
        getId("bearConfirme").classList.add("d-none")
        getId("formulaire").classList.remove("d-none")
      })



      // let order = getId("validOrder")
      // order.addEventListener('click', (e) =>{
      //   e.preventDefault();
      //   fetch("https://mockbin.com/request", {
      //     method: "POST",
      //     headers: {
      //     'Accept': 'application/json', 
      //     'Content-Type': 'application/json'
      //     },
      //   }
      // })




      
      

      

    }

  }

  getBear()
  



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
