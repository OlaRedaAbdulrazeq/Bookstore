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
            const title = card.querySelector('.card-title').innerText.toLowerCase();
            card.style.display = title.includes(input) ? 'block' : 'none';
            });
        }
        function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        }