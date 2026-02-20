////////////////////////Featured book logic//////////////////////////////
let quantity = 1;
    let price = 45;
    let descriptionVisible = true;
//function to show description using view more button
    function toggleDescription() {
        const desc = document.getElementById("description");
        descriptionVisible = !descriptionVisible;
        desc.style.display = descriptionVisible ? "block" : "none";
    }
//function to change the quantity like increase and decrease
    function changeQty(value) {
        quantity += value;
        if (quantity < 1) quantity = 1;
        document.getElementById("quantity").innerText = quantity;
        updateTotal();
    }
//function to calculate  total price after increasing quantity
    function updateTotal() {
        let total = quantity * price;
        document.getElementById("total").innerText = total;
    }
//function to add to cart and disaplys book added to cart
    function addToCart() {
        const alertBox = document.getElementById("alertBox");
        alertBox.classList.remove("d-none");

        setTimeout(() => {
            alertBox.classList.add("d-none");
        }, 2000);
    }
//function to make start display ur rating
    function rate(stars) {
        document.getElementById("rating-text").innerText = stars + " / 5";
    }

//////////////////////// blog page logic///////////////////////////////////
// function to display it dynmically
        function openModal(title, content){
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalBody').innerText = content;
            const modal = new bootstrap.Modal(document.getElementById('blogModal'));
            modal.show();
        }

        // Filter i did to type the blog to display the only one 
       function filterBlogs() {
    const input = document.getElementById('search').value.toLowerCase();
    const cards = document.querySelectorAll('.blog-card');

    cards.forEach(card => {

      
        const titleElement = card.querySelector('h4');

        if (!titleElement) return;

        const title = titleElement.innerText.toLowerCase();

        if (title.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
      


        
///////////////////////log in //////////////////////////////////////
//connection of api and supa base
   const API_url="https://dqcddwgtbiowtymwxtur.supabase.co/rest/v1/Log_in"
        const API_key="sb_publishable_TND3y-Rt4NF0o50wJiTRbw_bhBR5WIS"
            const headers={
      "apikey":API_key,
   "Authorization": "Bearer"+API_key,
   "Content-Type":"application/json"
            }
      async function getLogin(){
               let login= await fetch (API_url,{headers})
               let login_res= await login.json()
               console.log(login_res)
               let table=document.getElementById("loginTable")
              
      }
         //  function to add  email and password once logged in
           async function addLogin(e){
   
            let email=document.getElementById("email").value
    let password=document.getElementById("password").value
           
          
      
let login={
   "email":email,
"password": password
}
let result=await fetch(API_url,{method:"post",body:JSON.stringify(login),headers})
        
console.log(result.status)
        
if(result.status==201){
    getLogin()
}
else{
    console.log("error")
}
}
// function log in to verify that email and password exists using api
async function loginUser() {

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  let email = emailInput.value;
  let password = passwordInput.value;

  const message = document.getElementById("message");
  const signupLink = document.getElementById("signupLink");

  // Hide signup link by default since not useful now
  signupLink.classList.add("d-none");

  const response = await fetch(
    API_url + "?email=eq." + email,
    { headers: headers }
  );

  const data = await response.json();

  console.log(data);

  if (data.length === 0) {
    message.textContent = "Account doesn't exist!";
    message.style.color = "red";
    signupLink.classList.remove("d-none");
    
    // Clear input fields
    emailInput.value = "";
    passwordInput.value = "";
    return;
  }

  if (data[0].password !== password) {
    message.textContent = "Incorrect password!";
    message.style.color = "red";

    // Clear input  after incorrect password fields
    emailInput.value = "";
    passwordInput.value = "";
    return;
  }

  message.textContent = "Login successful!";
  message.style.color = "green";

  // Save to localStorage can check on the application bar in inspect
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  // Clear input fields after successful login
  emailInput.value = "";
  passwordInput.value = "";
}
ocument.addEventListener("DOMContentLoaded", function() {
    const modalEl = document.getElementById("signupModal");
    const modal = new bootstrap.Modal(modalEl);
    modal.hide(); 
});

// function to display error message if the email is empty or password is left empty

   function emailVer() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password_error = document.getElementById("password_error");
    let email_error = document.getElementById("email_error");

    email_error.style.color = "red";
    password_error.style.color = "red";

    if (email === "") {
        email_error.textContent = "Email is required";
        email_error.hidden = false;
    } else {
        email_error.hidden = true;
    }

    if (password === "") {
        password_error.textContent = "Password is required";
        password_error.hidden = false;
    } else {
        password_error.hidden = true;
    }

    console.log("done");
}
