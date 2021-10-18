let bearCart = JSON.parse(localStorage.getItem('resumeArticle'));

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
      //Affichage message d'erreur
      let noExist = document.getElementById("errorMessage")
      noExist.classList.remove("d-none");
  
      //Suppression affichage standard
      let bRetour = document.getElementById("bRetour")
      let bProduct = document.getElementById("bProduct")
      bRetour.classList.add("d-none")
      bProduct.classList.add("d-none")
    } 
  
    else {
      throw "Ce produit n'existe pas"
    }
  }