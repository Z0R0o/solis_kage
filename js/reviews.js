const supabase = window.supabase.createClient(
"https://oheqprjthbjmjqqkvsnn.supabase.co",
"sb_publishable_nNCIAZkgDiw6grkQz7OYdw_cjlu_o5q"
)

let rating = 0
let currentUser = null


document.addEventListener("DOMContentLoaded", ()=>{

setupStars()
loadReviews()

})



/* STAR SYSTEM */

function setupStars(){

const stars = document.querySelectorAll(".star")

stars.forEach((star,i)=>{

star.addEventListener("click",()=>{

rating = i+1

stars.forEach(s=>s.classList.remove("active"))

for(let j=0;j<rating;j++){
stars[j].classList.add("active")
}

})

})

}



/* REGISTER */

async function register(){

const email = document.getElementById("regEmail").value
const username = document.getElementById("regUser").value
const password = document.getElementById("regPass").value

const {data,error} = await supabase
.from("users")
.insert([{email,username,password}])
.select()

if(error){
alert("Account exists or error")
return
}

alert("Account created")
login()

}



/* LOGIN */

async function login(){

const email = document.getElementById("loginEmail").value
const password = document.getElementById("loginPass").value

const {data} = await supabase
.from("users")
.select("*")
.eq("email",email)
.eq("password",password)
.single()

if(!data){

alert("Invalid login")
return

}

currentUser = data

alert("Logged in as "+data.username)

}



/* SUBMIT REVIEW */

async function submitReview(){

if(!currentUser){

alert("Login first")
return

}

const comment = document.getElementById("comment").value

const {error} = await supabase
.from("reviews")
.insert([{

user_id:currentUser.id,
rating:rating,
comment:comment

}])

if(error){

alert("Error posting")
return

}

loadReviews()

}



/* LOAD REVIEWS */

async function loadReviews(){

const {data} = await supabase
.from("reviews")
.select(`
id,
rating,
comment,
users(username)
`)
.order("created_at",{ascending:false})

const container = document.getElementById("reviews")

if(!container) return

container.innerHTML=""

data.forEach(r=>{

const stars = "★".repeat(r.rating)+"☆".repeat(5-r.rating)

let deleteBtn=""

if(currentUser && currentUser.email==="jjatinderpalsingh99155@gmai.com"){

deleteBtn = `<div class="reviewDelete" onclick="deleteReview('${r.id}')">Delete</div>`

}

container.innerHTML += `

<div class="reviewCard">

<div class="reviewUser">${r.users.username}</div>

<div class="reviewStars">${stars}</div>

<div class="reviewComment">${r.comment}</div>

${deleteBtn}

</div>

`

})

}



/* DELETE REVIEW (ADMIN) */

async function deleteReview(id){

await supabase
.from("reviews")
.delete()
.eq("id",id)

loadReviews()

}
