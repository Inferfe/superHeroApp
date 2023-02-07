const search=document.getElementById('searchInput')
const img=document.getElementById('heroImage')
const searchBtn = document.getElementById("searchButton");
const text=document.querySelector('p')
const baseUrl='https://www.superheroapi.com/api.php/100403009648749'
const randomBtn=document.getElementById('newHeroButton')
const heroName=document.getElementById('hero-name')
const heroInfo=document.querySelector('.hero-information')
const emojis = ["🧠", "💪", "⚡️", "🏋️‍♀️", "📊", "⚔️"];
const clear = () => {
  search.value = "";
  text.innerText = "";
  return;
};
const showHero=function(json){
     const powerStats = Object.entries(json.powerstats);
     heroName.textContent = json.name;
     img.innerHTML = `<img src='${json.image.url}' alt="">`;
     heroInfo.innerHTML=''
     powerStats.forEach(
       ([info, number],i) => (heroInfo.innerHTML += `<h1>${emojis[i]}${info}:${number}</h1>`)
     );

     clear();
}

const getSuperHero=()=>{
    if(!isFinite(+search.value)){
    fetch(`${baseUrl}/search/${search.value}`)
    .then((response) => response.json())
    .then((json) =>{
     if(!json.results)  {
        text.textContent='No hero found!'
        img.innerHTML = "";
        search.value = "";
        heroName.innerText=''
        heroInfo.innerHTML=''
        return;

    } else{
        const hero=json.results[0]
        showHero(hero)
        
 }
})
} else{
    fetch(`${baseUrl}/${search.value}`)
    .then((response) => response.json())
    .then((json) => showHero(json))
 }

}

const getRandomHero=()=>{
    const random = Math.floor(Math.random() * 732);
fetch(`${baseUrl}/${random}`)
  .then((response) => response.json())
  .then((json) => showHero(json));
}

//implementing searching hero by name
searchBtn.addEventListener('click',getSuperHero)

// implementing showing random hero

randomBtn.addEventListener('click',getRandomHero)


