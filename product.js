
const queryString_url = window.location.search
console.log (queryString_url)


const urlSearchParams = new URLSearchParams(queryString_url)
const id = urlSearchParams.get("id")
console.log(id)


async function call() {

    let response = await fetch("http://localhost:3000/api/teddies/" + id)
    
      if (response.ok) {
      return response.json()    
      }   
  
      else {
          if(response.code == 404){
            let noExist = document.getElementById("noExist")
            noExist.classList.remove("d-none")
   
          }
          else {
            throw "Ce produit n'existe pas"
          }
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

    let bearArticle = {
      modele: product._id,
      quantite: bearQty.value,
      couleur: bearColor.value,
    };

    let resumeArticle = [bearArticle];
    console.log(resumeArticle)
      // console.log(product._id)
      // console.log(bearQty.value)
      // document.getElementById("bearColor");
      // if(bearColor.value === ""){
      //   alert('Veuillez séléctionner une couleur');
      // }
      // else{
      //   console.log(bearColor.value)
      // }
  });

  // let addToCart = function() {
  //   let productId = getProductId( this )
  //   if( productId > 0 ) {
  //     updateQuantity( productId )
  //     updateCartLabel()
  //   }
  // }
  // let cart = JSON.parse(localStorage.getItem("resumeArticleList"))

  // if (cart) {
  //   let articleInCart = false

  //   for (let i = 0; i< cart.lenght; i++) {
  //     if (cart[i].modele == resumeArticle.modele && cart[i].couleur == resumeArticle.couleur){
  //       cart[i].quantite = cart[i].quantite + 1
  //       articleInCart = true
  //     }
  //   }

  //   if (!articleInCart){
  //     cart.push(articleInCart)
  //   }

  //   localStorage.setItem("resumeArticleList", JSON.stringify(cart))
  // }

  // else{
  //   cart = []
  //   cart.push(resumeArticle)
  //   localStorage.setItem ("resumeArticleList", JSON.stringify(cart))
  // }
    



    

}

run()