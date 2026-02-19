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