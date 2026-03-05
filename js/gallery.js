const showcaseImages = [
"show1.png",
"show2.png",
"show3.png",
"show4.png"
];

const wipImages = [
"wip1.png",
"wip2.png",
"wip3.png",
"wip4.png"
];

function loadGallery(list, folder, containerId){

const container = document.getElementById(containerId)

list.forEach((img,i)=>{

const item = document.createElement("div")
item.className="galleryItem fadeIn"

item.innerHTML = `
<img src="${folder}/${img}" loading="lazy" onclick="openImage(this)">
<p class="caption">Artwork ${i+1}</p>
`

container.appendChild(item)

})

}

function openImage(img){
document.getElementById("imageViewer").style.display="flex"
document.getElementById("viewerImg").src=img.src
}

function closeImage(){
document.getElementById("imageViewer").style.display="none"
}