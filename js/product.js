// pagination page logic
let page = 1;
let pageSize = 15;
let isLoading=false;
let isDone = false;
let filterActive = false;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartIcons()

let booksContainer = document.getElementById("showBook");
   const URI="https://nqtbofaqitynzjfedzjq.supabase.co/rest/v1/Books"
    const apikey = 'sb_publishable_kLyliks7VqAZhi4Yn4jYCg_sbBDXmiT'
    const Authorization= 'Bearer '+apikey
    const header ={
        "apikey": apikey,
        "Authorization": Authorization,
        "Content-Type": "application/json"
    }
    //spinner
function spinner(flag){
   let spinner= document.getElementById("spinner");
   if(flag === true){
    spinner.innerHTML=`
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`
   }else{
    spinner.innerHTML=``
   }
}
    //get paginated books
async function getBooks(page,size){
    let offset = (page-1)*size;
    const response =await fetch(`${URI}?select=*&limit=${size}&offset=${offset}`,{headers:header}) 
    return await response.json()
}

    //append books 
function appendBooks(data){
    let booksContainer = document.getElementById("showBook");
        booksContainer.style.cursor="pointer";
        
    for(book of data){
        booksContainer.innerHTML+=`
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 book-card" style="max-width: 15rem" data-id="${book.id}">
                <div class="addtocart-img-wrapper position-relative d-flex justify-content-center align-items-center shadow" style="height: 200px;">
                    <img src="${book.cover}" class="card-img-top object-fit-contain h-100 py-3">

                    <div class="button-overlay d-flex justify-content-center align-items-center position-absolute top-0 left-0 w-100 h-100">
                        <button class="btn bg-orange text-white w-75" >Add to Cart</button>
                    </div>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title text-blue">${book.title}</h5>
                        <p class="card-text text-secondary mb-0">${book.author}</p>
                        <span class="text-orange"><b>$ ${book.price}</b></span>
                </div>
            </div>
        `
    }
}  

    //loadMore function
async function loadMore(){
        if(isLoading || isDone ||filterActive){
            return;
        }
    isLoading=true;
    spinner(true);
    const data = await getBooks(page,pageSize);
       if(data.length === 0){
            isDone = true;
            spinner();
            return;
       }
    appendBooks(data)
       if(data.length<pageSize){
            isDone=true
       }

    page ++;
       //revert to orignial for next ride
    spinner();
    isLoading=false;
}

function scrollEvent(){
    window.addEventListener("scroll",function(){
        const bottomReached = window.innerHeight + this.window.scrollY >= this.document.body.offsetHeight - 200
        bottomReached? loadMore() :'';
    })
}

//calling the scrollEvent() function to track scrolling
scrollEvent();
//calling loadMore() function to begin executing the logic to show the books
loadMore();

//fetch book by id to show its details
async function fetchABook (id){
    try{
        let response = await fetch(`${URI}?id=eq.${id}`,{headers: header})
    return await response.json();
    }catch(e){
        console.log(e.message)
    }
    
}

document.getElementById("showBook").addEventListener("click", async function(e) {
    const card = e.target.closest(".book-card");
    if (!card) return;

    const bookId = card.getAttribute("data-id");
    const bookData = await fetchABook(bookId);
    if (e.target.closest("button")){
         addToCart({id:bookData[0].id ,title:bookData[0].title ,cover:bookData[0].cover ,price:bookData[0].price })
         return
    }
    if (bookData && bookData.length > 0) {
        const book = bookData[0];
        document.getElementById("modalContent").innerHTML = `
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="bookDetailsHeader">${book.title} Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
        <div class="modal-body px-5">
            <div class="container-fluid mt-4">
                <div class="row align-items-center justify-content-center">
                    <div class="col-12 col-lg-6 ">
                        <div class="addtocart-img-wrapper position-relative d-flex justify-content-center align-items-center">
                           <img src=${book.cover} class="py-3" alt="Book Cover">
                          <div class="button-overlay d-flex justify-content-center align-items-end position-absolute top-0 start-0 w-100 h-100">
                            <button class="btn bg-orange text-white w-75 mb-3" id="add-to-cart">Add to Cart</button>
                        </div>
                        </div>    
                    </div>
                    <div class="col-12 col-lg-6 d-flex flex-column">
                        <h3 class="mb-2 text-blue" id="bookTitle">${book.title}</h3>
                        <h6 class="text-dark-orange fw-bold mb-1 text-blue">─────────</h6>
                        <h6 class="mb-2 text-blue" id="authorName">${book.author}</h6>
                        <p class="card-text mb-3 text-secondary " id="BookDescription">${book.description}</p>
                        <p class="fw-bold mb-3 text-orange" id="BookPrice">
                            Price: $ ${book.price}
                        </p>
                    </div>
                </div>
            </div>
      </div>
        `;
        if (e.target.closest("button")){
         addToCart({id:bookData[0].id ,title:bookData[0].title ,cover:bookData[0].cover ,price:bookData[0].price })
    }
        document.getElementById("add-to-cart").addEventListener("click",()=>addToCart(book))
        new bootstrap.Modal(document.getElementById("bookDetails")).show();
    } else {
        alert("Book details not found!");
    }
});

// search by title 

async function search(keyword){
   let response = await fetch(`${URI}?title=ilike.*${keyword}*`,{headers: header})
    return await response.json();
}

let searchTitle = document.getElementById("titleSearch") 
    searchTitle.addEventListener("input",async function(){

        if (searchTitle.value === "") {
        page = 1;
        isDone = false;
        booksContainer.innerHTML = "";
        loadMore();
        return;
    }
    let result = await search(searchTitle.value);
    booksContainer.innerHTML = "";
        appendBooks(result)
    })

async function filterBy(state){
    let response;
    if(state==="high"){
        response = await fetch(`${URI}?order=price.desc`,{headers:header})
       
    }else if(state==="low"){
       response = await fetch(`${URI}?order=price.asc`,{headers:header}) 
      
    }else if(state==="a-z"){
       response =await fetch(`${URI}?select=*&order=title.asc`, { headers: header })
    }else if(state==="z-a"){
       response = await fetch(`${URI}?select=*&order=title.desc`, { headers: header })
    }
   return await response.json()
}

    
document.getElementById("sidebar").addEventListener("click",async function(e){
    if (!["high-low","low-high","A-Z","Z-A"].includes(e.target.id)) return;
    filterActive = true;
    let result;
    if (e.target.id==="high-low"){
        result = await filterBy("high");
    }else if (e.target.id==="low-high"){
        result = await filterBy("low");
    }
    else if (e.target.id==="A-Z"){
        result = await filterBy("a-z");
    }
    else if (e.target.id==="Z-A"){
        result = await filterBy("z-a");
    }   

    booksContainer.innerHTML = "";
        appendBooks(result)
})
    
document.getElementById("filterToggler").addEventListener("click",function(){
   let sidebar= document.getElementById("sidebar");
   sidebar.classList.toggle("d-none");

})

function addToCart(book) {
    const exists = cart.find(item => item.id === book.id);
    let alert = document.getElementById("cart-alert")
    if (exists) {
        exists.quantity += 1;
        
             alert.innerHTML=`
                <div class="alert alert-success" role="alert">
                    Cart Updated Successfully
                </div>`
    } else {
        cart.push({...book, quantity: 1});
         
             alert.innerHTML=`
                <div class="alert alert-success" role="alert">
                    Book Added Successfully
                </div>`
                
    }
    setTimeout(()=>{
        alert.innerHTML=``
        location.reload();
    },2000)
     
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcons(); 
}

function updateCartIcons() {
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("totalPrice");
    const total = document.getElementById("sum");
    const quantity = document.getElementById("quantity");
    
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    if(!totalItems || totalItems===0 ){
        cartCount.hidden=true;
    }else{
        cartCount.textContent = totalItems;
    }
    
    cartTotal.textContent = totalPrice;
    total.textContent=`Price Summary : $${totalPrice}`;
    quantity.textContent=`Total Quantities : ${totalItems}`
}

//drawing the cart modal
    if(cart.length===0){
        document.getElementById("addToCartModal").innerHTML=`Empty Cart`
    }else{
        for (book of cart){
        document.getElementById("modalRow").innerHTML+=`
    <div class="col-12 col-sm-7 g-0 card  flex-md-row justify-content-between align-items-center border-0 shadow mb-3 modal-item">
        <div class="cart-img-wrapper">
            <img src=${book.cover} class="object-fit-contain img-fluid p-2" alt="the book cover">
        </div>
        <div class="card-body align-self-start">
            <h5 class="card-title">${book.title}</h5>
            <p class="text-blue">quantity: ${book.quantity}</p>
            <h6 class="text-orange">total price: $${book.price * book.quantity}</h6>
        </div>
    </div>
`
       }
    }
  


    


