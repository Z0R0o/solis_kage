const supabaseUrl = "https://oheqprjthbjmjqqkvsnn.supabase.co";
const supabaseKey = "sb_publishable_nNCIAZkgDiw6grkQz7OYdw_cjlu_o5q";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

let selectedRating = 0;

const stars = document.querySelectorAll("#stars span");

stars.forEach(star => {

star.addEventListener("click", () => {

selectedRating = star.dataset.star;

stars.forEach(s => s.classList.remove("active"));

for(let i=0;i<selectedRating;i++){
stars[i].classList.add("active");
}

});

});

document.getElementById("postReview").addEventListener("click", async () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const comment = document.getElementById("comment").value;

if(!email || !password || !comment || selectedRating == 0){
alert("Fill everything");
return;
}

let { data:userData } = await supabaseClient.auth.signInWithPassword({
email: email,
password: password
});

if(!userData){
await supabaseClient.auth.signUp({
email: email,
password: password
});
}

await supabaseClient
.from("reviews")
.insert([
{
rating: selectedRating,
comment: comment,
email: email
}
]);

alert("Review posted");

loadReviews();

});

async function loadReviews(){

const { data } = await supabaseClient
.from("reviews")
.select("*")
.order("id",{ascending:false});

const container = document.getElementById("reviewsContainer");

container.innerHTML = "";

data.forEach(review => {

const div = document.createElement("div");

let stars = "";

for(let i=0;i<review.rating;i++){
stars += "★";
}

div.className = "review-card";

div.innerHTML = `
<div class="review-stars">${stars}</div>
<p>${review.comment}</p>
<span class="review-email">${review.email}</span>
`;

container.appendChild(div);

});

}

loadReviews();
