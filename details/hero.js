
const heroDetails = document.querySelector('.heroDetails');


console.log(localStorage.getItem('details'));


// Content to display in a Details page
function displayDataOnHeroPage(heroData){
  heroDetails.innerHTML= ""
  // console.log(heroData);

  // Adding Image
  let imgHero = document.createElement('img');
  let imgSrc = heroData["thumbnail"];
  // console.log('imgSrc:', imgSrc); // Add this line to check the value of imgSrc
  imgHero.setAttribute('src', imgSrc.path + '.' + imgSrc.extension);
  imgHero.setAttribute('height','400px');
  imgHero.setAttribute('width','400px');

  heroDetails.appendChild(imgHero);


  // Adding Name
  let name = document.createElement('h1');
  name.innerHTML = `I am your ${heroData.name}`;
  heroDetails.appendChild(name)


  // Adding Description
  let descHero = document.createElement('p');
  descHero.innerHTML = `About me : ${heroData.description}`;
  heroDetails.appendChild(descHero);

  // Adding Comics
  let comicHero = document.createElement('p');
  comicHero.innerHTML = `Comics : ${heroData.comics.available}`;
  heroDetails.appendChild(comicHero);

  // Adding Series
  let seriesHero = document.createElement('p');
  seriesHero.innerHTML = `Series : ${heroData.series.available}`;
  heroDetails.appendChild(seriesHero);

  // ADding Storeis
  let storyHero = document.createElement('p');
  storyHero.innerHTML = `Stories : ${heroData.stories.available}`;
  heroDetails.appendChild(storyHero);

  // ADding Events
  let eventHero = document.createElement('p');
  eventHero.innerHTML = `Events : ${heroData.events.available}`;
  heroDetails.appendChild(eventHero);

}


async function showHeroDetails(){

  // let charId =  localStorage.getItem('id');
  let charId = localStorage.getItem('details');
  // http://gateway.marvel.com/v1/public/characters/1011334?ts=1690010738084&apikey=fa7487ca125810d9de6f1eb74d9490c3&hash=7a746b546016a371b6fb3c21b2d5f322
  console.log(charId);
  let url = `https://gateway.marvel.com/v1/public/characters/${charId}?ts=1690010738084&apikey=fa7487ca125810d9de6f1eb74d9490c3&hash=7a746b546016a371b6fb3c21b2d5f322`;

  let response = await fetch(url);
  let resData = await response.json();
  let heroDetials = resData.data.results;
  displayDataOnHeroPage(heroDetials[0]);
}

window.onload = showHeroDetails();