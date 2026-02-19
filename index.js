






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