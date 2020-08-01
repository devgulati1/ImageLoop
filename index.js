// unsplash api

const imageContainer=document.getElementById("image-container")
const loader=document.querySelector("#loader")
let totalPhotos=0
let loadedPhotos=0
let ready=false
let photosArr=[];
const count=30
const apiKey="1-hwuuJSyT0C4e0ivvcYYbUHQINXO5akLUm2qwOW0MU"
const api=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`



// function to set attribute
function setAttribute(element,attribute){
    for(const key in attribute){
        element.setAttribute(key,attribute[key])
    }
}
//Loaded func
function loaded(){
    console.log("loaded")
    loadedPhotos++
    if(loadedPhotos===totalPhotos){
        ready=true
        loader.hidden=true
        console.log("ready::",ready)
    }
   
   
    
}

function displayPhotos(){
    //Run for Each img
    loadedPhotos=0;
    totalPhotos=photosArr.length
    console.log("totalphotos",totalPhotos)
photosArr.forEach(photos=>{
    const item=document.createElement("a")
    
    setAttribute(item,{
        href:photos.links.html,
        target:"_blank"
    })
    // create img tag
    const imageTag=document.createElement("img")
   
    setAttribute(imageTag,{
        src:photos.urls.regular,
        alt:photos.alt_description,
        title:photos.alt_description,
    })
    imageTag.addEventListener("load",loaded)
    
    item.appendChild(imageTag)
    imageContainer.appendChild(item)
})
}
 

//function to get photos

async function getPhotos(){
    try{
    const response=await fetch(api)
      photosArr=await response.json()
    console.log(photosArr)
     displayPhotos();
    }catch(error){
        console.log("error occured",error)
    }
}


// Load more Pics
window.addEventListener("scroll",()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        displayPhotos()
    }
})

//onload
getPhotos()