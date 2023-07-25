// For generatng hash using md5
const ts = '1690010738084';

const publickey = 'fa7487ca125810d9de6f1eb74d9490c3';

const hash = '7a746b546016a371b6fb3c21b2d5f322';

const heroesHomeDiv = document.querySelector('.heroCards');

const searchtext = document.querySelector('#searchtext');

const searchList = document.querySelector('.searchListitems');


// Handle Local Storage
localStorage.setItem('details','');
if (localStorage.getItem('favList') == null || localStorage.getItem('favList') == undefined ){
  localStorage.setItem('favList',JSON.stringify([]));
}


// Load data from api and suggest for a user
function displayDataOnSearchResults(heroes){
  searchList.innerHTML= ""
  for (hero= 0; hero<heroes.length; hero++){
    // Create the heroCard element
    let heroCard = document.createElement('div');
    heroCard.innerHTML="";
    //Set attributes for the heroCard element
    heroCard.setAttribute('id', heroes[hero].id); 
    heroCard.setAttribute('name', heroes[hero].name);
    heroCard.setAttribute('class', 'searchedHero');

    // Creating image URL to add to li element
    let imgHero = document.createElement('img');
    let imgSrc = heroes[hero].thumbnail;
    imgHero.setAttribute('src', imgSrc.path + '.' + imgSrc.extension);
    imgHero.setAttribute('height','60px');
    imgHero.setAttribute('width','60px');
    imgHero.style.borderRadius = '50%' ;

    // Create name for hero
    let nameHero = document.createElement('a');
    nameHero.innerHTML = `${heroes[hero].name}`;
    nameHero.style.backgroundColor = 'black';
    nameHero.style.color = 'cyan';
    nameHero.style.border = 'none';
    nameHero.style.fontSize = '1.2rem';
    nameHero.style.cursor = 'pointer';
    nameHero.setAttribute('class','heroPageLink');
    nameHero.setAttribute('name',`${heroes[hero].id}`);
    nameHero.setAttribute('href','./details/hero.html');

    

    // Create a button to add to fav list
    let addbtn = document.createElement('a');
    let found = false;
    let curr_favList = JSON.parse((localStorage.getItem('favList')));
    for (let i = 0; i< curr_favList.length; i++){
      if (heroes[hero].id === parseInt(curr_favList[i])){
        addbtn.innerHTML= 'Remove';
        found = true;
        break;
      }
    }
    if(!found){
      addbtn.innerHTML = 'Add';
    }
    addbtn.style.backgroundColor = 'cyan';
    addbtn.style.color = 'black';
    addbtn.style.border = 'none';
    addbtn.style.fontSize = '1.2rem'; 
    addbtn.style.cursor = 'pointer';
    addbtn.setAttribute('class', 'addSbtn');
    addbtn.setAttribute('name',`${heroes[hero].id}`);



    //Append the img and naeme to the heroCard li element
    heroCard.appendChild(imgHero);
    heroCard.appendChild(nameHero);
    heroCard.appendChild(addbtn);

    // Append heroCard to ul searchList
    searchList.appendChild(heroCard);
  }
  searchHeroList();
}

// Details page redirection from name of super hero n search list

function searchHeroList(){
  const heroPageLinks = document.querySelectorAll('.heroPageLink');
  heroPageLinks.forEach((ele) => {
    ele.addEventListener('click', () =>{
      localStorage.setItem('details',ele.name);
      console.log(localStorage.getItem('details'));
    });
  });


  const searchAddbtns = document.querySelectorAll('.addSbtn');
  searchAddbtns.forEach((ele) => {
    ele.addEventListener('click', () =>{
      // console.log(ele.innerHTML);
      let curr_list = JSON.parse(localStorage.getItem('favList'));

      if (ele.innerHTML == 'Add'){
        window.alert(`Hero Added to your favorite List`);
        console.log(curr_list);
        curr_list.push(ele.name);
        localStorage.setItem('favList',JSON.stringify(curr_list));
        console.log(localStorage.getItem('favList'))
        ele.innerHTML = 'Remove';

      }
      else{
        window.alert(`Hero Removed from your favorite List`);
        curr_list = curr_list.filter((e) => e !== ele.name);
        console.log(curr_list);
        localStorage.setItem('favList',JSON.stringify(curr_list));        
        console.log(localStorage.getItem('favList'))
        ele.innerHTML = 'Add';
      }

      localStorage.setItem('details',ele.id);
      console.log(localStorage.getItem('details'));
    });
  });

}


// // Redirect to a hero details page on click
// const heroPageLinks = document.querySelectorAll('.heroPageLink');
// heroPageLinks.forEach((heroPageLink) => {
//   heroPageLink.addEventListener('click', addLocalStorage);
// });



// Handling add to favourites button events


function updateFavList(event){
  console.log('I am clicked');
  const element = event.target;
  const nameAttribute = element.getAttribute("name");
  console.log(nameAttribute);

  if (element.innerHTML == 'Add'){
    window.alert('Added to your Favorite Super Hero List');
    // element.disabled = true;
    favHero.push(nameAttribute);
  }
  else{
    element.innerHTML == 'Add'
    favHero = favHero.filter((ele) => ele != nameAttribute);
  }
}

const addFavbtns = document.querySelectorAll('.addbtn');
addFavbtns.forEach((favbtn) => {
  addFavbtns.addEventListener('click', updateFavList);
});




// For searching Heroes Data
async function searchData(){
  let findText = searchtext.value;
  if (findText.length > 0){
    let url = `https://gateway.marvel.com/v1/public/characters?ts=1690010738084&apikey=fa7487ca125810d9de6f1eb74d9490c3&hash=7a746b546016a371b6fb3c21b2d5f322&nameStartsWith=${findText}`;
    let response = await fetch(url);
    let resData = await response.json();
    let heroesList = resData.data.results;
    heroesHomeDiv.style.opacity = 0.5;

    displayDataOnSearchResults(heroesList);
  }
  else{
    searchList.innerHTML= "";
    heroesHomeDiv.style.opacity = 1;
  }  
}

//Display data on homepage

function displayDataOnHomePage(heroes){
  heroesHomeDiv.innerHTML= ""
  for (hero= 0; hero<heroes.length; hero++){
    // Create the heroCard element
    let heroCard = document.createElement('div');
    heroCard.innerHTML="";
    //Set attributes for the heroCard element
    heroCard.setAttribute('id', heroes[hero].id); 
    heroCard.setAttribute('name', heroes[hero].name);
    heroCard.setAttribute('class', 'hero');
    heroCard.setAttribute('href','./details/hero.html');

    // Creating image URL to add to li element
    let imgLink = document.createElement('a');
    imgLink.setAttribute('href','./details/hero.html');

    let imgHero = document.createElement('img');
    let imgSrc = heroes[hero].thumbnail;
    imgHero.setAttribute('src', imgSrc.path + '.' + imgSrc.extension);
    imgHero.setAttribute('height','300px');
    imgHero.setAttribute('width','280px');
    imgHero.setAttribute('id', heroes[hero].id); 
    imgHero.setAttribute('class','imgHero');

    // Appending img to its anchor tag
    imgLink.appendChild(imgHero);


    // Create name for hero
    let nameHero = document.createTextNode(`${heroes[hero].name}`);


    //Create add button that adds heroes to fav list
    let addbtn = document.createElement('a');
    let found = false;
    let curr_favList = JSON.parse((localStorage.getItem('favList')));
    for (let i = 0; i< curr_favList.length; i++){
      if (heroes[hero].id === parseInt(curr_favList[i])){
            addbtn.innerHTML= 'Remove';
            found = true;
            break;
      }
    }
    if(!found){
      addbtn.innerHTML = 'Add';
    }
    addbtn.setAttribute('class', 'addHbtn');
    addbtn.setAttribute('name',`${heroes[hero].id}`);
    addbtn.setAttribute('id',`${heroes[hero].id}`);


    //Append the img and naeme to the heroCard li element
    heroCard.appendChild(imgLink);
    heroCard.appendChild(nameHero);
    heroCard.appendChild(addbtn);


    // Append heroCard to ul heroesHomeDiv
    heroesHomeDiv.appendChild(heroCard);
  }
  defaultHeroList();
}


// creating and altering detials in local storage to send particular hero id to details page
function defaultHeroList(){
  const heroesHome = document.querySelectorAll('.imgHero');
  heroesHome.forEach((ele) => {
    ele.addEventListener('click', () =>{
      localStorage.setItem('details',ele.id);
      console.log(localStorage.getItem('details'));
    });
  });


  const homeAddbtns = document.querySelectorAll('.addHbtn');
  homeAddbtns.forEach((ele) => {
    ele.addEventListener('click', () =>{
      // console.log(ele.innerHTML);
      let curr_list = JSON.parse(localStorage.getItem('favList'));

      if (ele.innerHTML == 'Add'){
        window.alert(`Hero Added to your favorite List`);
        console.log(curr_list);
        curr_list.push(ele.name);
        localStorage.setItem('favList',JSON.stringify(curr_list));
        console.log(localStorage.getItem('favList'))
        ele.innerHTML = 'Remove';
      }

      else{
        window.alert(`Hero Removed from your favorite List`);
        curr_list = curr_list.filter((e) => e !== ele.name);
        console.log(curr_list);
        localStorage.setItem('favList',JSON.stringify(curr_list));        
        console.log(localStorage.getItem('favList'))
        ele.innerHTML = 'Add';
      }

    });
  });
}

// Load Data on Home Page after fetching from API
async function loadHomePageData(){
  let url = `https://gateway.marvel.com/v1/public/characters?ts=1690010738084&apikey=fa7487ca125810d9de6f1eb74d9490c3&hash=7a746b546016a371b6fb3c21b2d5f322`;
  let response = await fetch(url);
  let resData = await response.json();
  let heroesList = resData.data.results;
  displayDataOnHomePage(heroesList);
}

window.onload = loadHomePageData;