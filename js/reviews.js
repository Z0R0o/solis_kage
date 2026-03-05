const supabase = window.supabase.createClient(
"https://oheqprjthbjmjqqkvsnn.supabase.co",
"sb_publishable_nNCIAZkgDiw6grkQz7OYdw_cjlu_o5qY"
)

let rating = 0

const stars = document.querySelectorAll("#stars span")

stars.forEach((star,i)=>{

star.onclick = () => {

rating = i + 1

stars.forEach(s=>s.classList.remove("active"))

for(let j=0;j<rating;j++){
stars[j].classList.add("active")
}

}

})


async function submitReview(){

const email = document.getElementById("email").value
const comment = document.getElementById("comment").value

if(!rating){
alert("Select rating")
return
}

await supabase.from("reviews").insert([{
email:email,
rating:rating,
comment:comment
}])

document.getElementById("comment").value=""
loadReviews()

}


async function loadReviews(){

const { data } = await supabase
.from("reviews")
.select("*")
.order("created_at",{ascending:false})

const container=document.getElementById("reviews")
container.innerHTML=""

data.forEach(r=>{

const div=document.createElement("div")

div.className="review"

div.innerHTML = `
<div style="color:#ffd43b;font-size:20px">${"★".repeat(r.rating)}</div>
<p>${r.comment}</p>
<small>${r.email}</small>
`

container.appendChild(div)

})

}

loadReviews()
