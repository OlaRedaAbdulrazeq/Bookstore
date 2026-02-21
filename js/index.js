//////////////////////////sign up logic//////////////////////////
let form = document.getElementById("signup");
const URI="https://nqtbofaqitynzjfedzjq.supabase.co/rest/v1/"
const apikey = 'sb_publishable_kLyliks7VqAZhi4Yn4jYCg_sbBDXmiT'
    const Authorization= 'Bearer '+apikey
    const header ={
        "apikey": apikey,
        "Authorization": Authorization,
        "Content-Type": "application/json"
    }
// get email from database if found
async function searchEmail(email){
    let enteredEmail = email
    const emailURL = `${URI}Users?email=eq.${enteredEmail}`
   
    try{
        let response = await fetch(emailURL,{headers:header});
        let result = await response.json();
        if(result.length>0){
            return true
        }else{
            return false
        }
    }catch(e){
        console.log(e.message)
    }
}

// name validation
let validateName=function(){
    let name = document.getElementById("name");
    let errorMsg=document.getElementById("name-error");
    let regex=/^[A-Za-z]{2,}( [A-Za-z]{2,})*$/
    let validName=function(){
    if(!name.value.trim()){
        errorMsg.textContent='required field';
        name.classList.add("is-invalid");
        return false;
    }else if(!regex.test(name.value)){
        errorMsg.textContent='invalid name format';
        name.classList.add("is-invalid");
        return false;
    }else{
        errorMsg.textContent = '';
        name.classList.remove("is-invalid");
        name.classList.add("is-valid");
        return true;
    }
    }
    name.addEventListener("input",validName)
   return validName; 
}
//email validation
let validateEmail = function(){
    let email = document.getElementById("email")
    let errorMsg=document.getElementById("email-error");
    let validEmail = function(){
        let regex=/^[a-z][a-z0-9]*@[a-z]+\.com$/
        if (!email.value.trim()){
            errorMsg.textContent="required field";
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
            return false
        }else if(!regex.test(email.value)){
            errorMsg.textContent="invalid email format";
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
            return false
        }else{
            errorMsg.textContent="";
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
            return true
        }
    }
    let foundEmail =async function(){
        let isFound=await searchEmail(email.value);
       if(isFound){
            errorMsg.textContent="Email already registered";
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
            return false;
       }else{
            errorMsg.textContent="";
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
            return true
       }
    }
    email.addEventListener("input",validEmail);
    email.addEventListener("blur",function(){
        if(validEmail()){
            foundEmail();
        }
    })
    return {
        isValidEmail: validEmail,
        isFoundEmail: foundEmail
    };
}
//password validation
let validatePassword=function(){
    let password= document.getElementById("password");
    let errorMsg= document.getElementById("password-error");
    let regex=/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/
    let validPassword=function(){
        if(!password.value.trim()){
            errorMsg.textContent='required field';
            password.classList.add("is-invalid");
            return false;
        }else if(password.value.length<6){
            errorMsg.textContent='password must be at least 6 characters';
            password.classList.add("is-invalid");
            return false;
        }else if(!regex.test(password.value)){
            errorMsg.textContent='password must include at least one special character';
            password.classList.add("is-invalid");
            return false;
        }else{
            errorMsg.textContent='';
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");
            return true;
        }
    }
    password.addEventListener("input",validPassword);

    return validPassword;

}
//confirm-password validation
let confirmPassword =function(){
    let confirm = document.getElementById("confirm-password");
    let errorMsg=document.getElementById("confirm-password-error");
    let validConfirm = function(){
        let pass=document.getElementById("password").value;
        if(!confirm.value.trim()){
            errorMsg.textContent="required field";
            confirm.classList.add("is-invalid");
            return false;
        }else if(pass !==confirm.value){
            errorMsg.textContent="unmatched passwords";
            confirm.classList.add("is-invalid");
            return false;
        }else{
            errorMsg.textContent="";
            confirm.classList.remove("is-invalid");
            confirm.classList.add("is-valid");
            return true;
        }
    }
    confirm.addEventListener("input",validConfirm)
    return validConfirm;
}

let nameIsValid=validateName();
let {isValidEmail,isFoundEmail}=validateEmail();
let passwordIsValid =validatePassword();
let confirmedPassword=confirmPassword();
form.addEventListener("submit",async function(e){
    e.preventDefault();
    let alert=document.getElementById("alert")
    if(nameIsValid()&&isValidEmail()&& await isFoundEmail()&&passwordIsValid()&&confirmedPassword()){
        const userData ={
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    let response = await fetch(URI+"Users",{method:"post",headers:header,body:JSON.stringify(userData)})
        
        if(response.status===201){
            form.submit();
            alert.innerHTML=`
            <div class="alert alert-success" role="alert">
                successfully registered
            </div>
            `  
        setTimeout(() => {
            alert.innerHTML ="";
        }, 3000);
        }
    }else{
            alert.innerHTML=`
            <div class="alert alert-danger" role="alert">
                failed to register
            </div>
            `  
        setTimeout(() => {
            alert.innerHTML = "";
        }, 3000);
    }

})
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
    async function getLogin(){
               let login= await fetch (`${URI}Users`,{headers:header})
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
let result=await fetch(`${URI}Users`,{method:"post",body:JSON.stringify(login),headers})
        
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

  const response = await fetch(`${URI}Users?email=eq.${email}`,{ headers: headers });

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
