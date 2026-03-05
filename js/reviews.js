const supabase = window.supabase.createClient(
"https://oheqprjthbjmjqqkvsnn.supabase.co",
"sb_publishable_nNCIAZkgDiw6grkQz7OYdw_cjlu_o5q"
)

let rating = 0


/* STAR SELECTION */

document.addEventListener("DOMContentLoaded", () => {

const stars = document.querySelectorAll(".star")

stars.forEach(star => {

star.addEventListener("click", () => {

rating = star.dataset.value

stars.forEach(s=>{
s.classList.remove("active")
})

for(let i=0;i<rating;i++){
stars[i].classList.add("active")
}

})

})

loadReviews()

})



/* SUBMIT REVIEW */

async function submitReview(){

const email = document.getElementById("email").value
const comment = document.getElementById("comment").value
const status = document.getElementById("status")

if(!email || !comment || rating == 0){
status.innerText="Fill all fields"
return
}

const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailCheck.test(email)){
status.innerText="Invalid email"
return
}

const {error} = await supabase
.from("reviews")
.insert([{email,rating,comment}])

if(error){

if(error.message.includes("duplicate")){
status.innerText="You already reviewed"
}else{
status.innerText="Error posting review"
}

return
}

status.innerText="Review posted!"

loadReviews()

}



/* LOAD REVIEWS */

async function loadReviews(){

const {data} = await supabase
.from("reviews")
.select("*")
.order("created_at",{ascending:false})

const container = document.getElementById("reviews")

container.innerHTML=""

data.forEach(r=>{

const stars = "★".repeat(r.rating) + "☆".repeat(5-r.rating)

container.innerHTML += `

<div class="galleryItem">

<p><b>${stars}</b></p>

<p>${r.comment}</p>

<p class="caption">${r.email}</p>

</div>

`

})

}
