
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
    let alertMessage = document.getElementById("alertMessage")
    alertMessage.innerText = "La reqête n'a pu aboutir"
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

  // let selectColor = document.getElementById("bearColor");
  // selectColor.addEventListener('change', (eventColor) => {
  //   document.getElementById("bearCommand")
  //   bearCommand.addEventListener('click', function(e){
  //     if(!eventColor.target.value){
  //       alert('Veuillez séléctionner une couleur');
  //     }
  //     else{
  //       console.log(eventColor.target.value)
  //     }

  //   })
    // resultColor.onclick = console.log(eventColor.target.value) 
  // });

  // function changeEventHandler(event){
  //   if(!event.taget.value) {
  //     alert('Veuillez secletionner une couleur')
  //   }
  //   else{
  //     console.log(event.target.value)
  //   }
  // }


  let bearQty = document.getElementById("bearQty")  
  console.log(bearQty)
  for (let i=1; i<=10; i++){
      
      let qtyList = document.createElement("option")
      qtyList.setAttribute("value", i)
      qtyList.innerText= i

      bearQty.appendChild(qtyList)

  }

  // let selectQty = document.getElementById("bearQty");
  // selectQty.addEventListener('change', (eventQty) => {
  //   document.getElementById("bearCommand")
  //   bearCommand.addEventListener('click', function(eventQty){
  //       console.log(eventQty.target.value)
  //     })
  // });
  
  let bearPrice = document.getElementById("bearPrice")
  bearPrice.innerText = `${product.price}`/ 100 + " €"

  let bearCommand = document.getElementById("bearCommand")
  bearCommand.addEventListener('click', function(e){
    // class elementList{
    //   constructor(idProduct, qtyProduct, colorProduct, priceProduct){
    //     this.idProduct = idProduct;
    //     this.qtyProduct = qtyProduct;
    //     this.colorProduct = colorProduct;
    //     this.priceProduct = priceProduct;
    //   }
    // }
    // let firstProduct = new elementList (product._id, bearQty.value, bearColor.value, bearPrice.value);
    // console.log(elementList)

    // let bearArticle = {
    //   modele: product._id,
    //   quantite: bearQty.value,
    //   couleur: bearColor.value,
    // };

    // let articleTab = [bearArticle];
    // console.log(articleTab)

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

  //Local Storage
  //Creation du locale storage
  

    

}

run()