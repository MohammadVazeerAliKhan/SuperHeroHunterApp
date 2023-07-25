let count = 0;
// Display data on homepage
const heroesFavDiv = document.querySelector('.favHeroCards');

// Displaying data on fav page
function displayDataOnFavPage(heroData,stopper){
  count += 1;
  // Create the heroCard element
  let heroCard = document.createElement('div');
  heroCard.innerHTML="";
  //Set attributes for the heroCard element
  heroCard.setAttribute('id', heroData.id); 
  heroCard.setAttribute('name', heroData.name);
  heroCard.setAttribute('class', 'favPageCard');

  // Creating image URL to add to li element
  let imgHero = document.createElement('img');
  let imgSrc = heroData.thumbnail;
  imgHero.setAttribute('src', imgSrc.path + '.' + imgSrc.extension);
  imgHero.setAttribute('height','300px');
  imgHero.setAttribute('width','250px');

  // Create a div and add name, description, remove button
  let heroFavDetails = document.createElement('div');
  heroFavDetails.setAttribute('class','favHeroDetails');

  // Create name for hero
  let nameHero = document.createTextNode(`${heroData.name}`);

  // create description for a hero
  let descHero = document.createTextNode(`${heroData.description}`);

  //create remove button
  let rmBtn = document.createElement('button');
  rmBtn.innerHTML = 'Remove';
  rmBtn.setAttribute('class','removeData');
  rmBtn.setAttribute('id',heroData.id);


  // appending to herodetails div
  heroFavDetails.appendChild(nameHero);
  heroFavDetails.appendChild(descHero);
  heroFavDetails.appendChild(rmBtn);


  //Append the img and naeme to the heroCard
  heroCard.appendChild(imgHero);
  heroCard.appendChild(heroFavDetails);

  // Append heroCard to ul heroesHomeDiv
  heroesFavDiv.appendChild(heroCard);

  if (count ===  stopper){
    removeData();
  }
}


function removeData(){
  const removeButtons = document.querySelectorAll('.removeData');
  removeButtons.forEach((ele)=> {
    ele.addEventListener('click',() => {
      let curr_fav = JSON.parse(localStorage.getItem('favList'));
      curr_fav = curr_fav.filter((item) => item !== ele.id);
      localStorage.setItem('favList',JSON.stringify(curr_fav));
      heroesFavDiv.innerHTML='';
      window.alert('Hero has been removed from your fav list.');
      location.reload();
    });
  });
}



// Load Data on Home Page after fetching from API
function loadFavPageData(cfl){
  heroesFavDiv.innerHTML = '';
  cfl.forEach(async (ele) => {
    let url = `https://gateway.marvel.com/v1/public/characters/${ele}?ts=1690010738084&apikey=fa7487ca125810d9de6f1eb74d9490c3&hash=7a746b546016a371b6fb3c21b2d5f322`;
    let response = await fetch(url);
    let resData = await response.json();
    let heroData = resData.data.results;
    displayDataOnFavPage(heroData[0], cfl.length);
  });
  // createEventListeners();
}

//load data from fav list
function loadData(){
  heroesFavDiv.innerHTML = '';

  let curr_fav_list = JSON.parse(localStorage.getItem('favList'));
  // If there is nothing added in fav list, it will ask us to add super heroes to favorites
  if (curr_fav_list.length == 0){
    heroesFavDiv.innerHTML = '';
    heroesFavDiv.style.color = 'black';
    heroesFavDiv.style.fontSize = '2rem';
    heroesFavDiv.style.fontWeight = '700';

    heroesFavDiv.innerHTML = 'You dont have any fav super heroes yet. Add super heroes to favorite list from ' + `<a href='../index.html' title='Go to Home Page'> HOME </a>` + ' to see them all at one place here';
  }
  // else load the data from api for the heroes present in favList
  else{
    heroesFavDiv.innerHTML = '';

    loadFavPageData(curr_fav_list);
  }
}

window.onload =loadData();