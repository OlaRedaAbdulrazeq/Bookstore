# 📚 Bookstore --- Web Application

A responsive and interactive bookstore web application that allows users
to browse, search, filter, and shop for books with user authentication
and a built-in cart system. The project uses HTML, CSS, **Bootstrap**,
and JavaScript, with authentication powered by Supabase.

## 📁 Project Structure

    /assets
       └── Images used throughout the project (UI graphics, book covers, icons)

    /js
       ├── index.js     # JavaScript logic for homepage & shared UI
       └── product.js   # JavaScript logic for product listing, modals, cart, and pagination

    /pages
       ├── index.html   # Main homepage
       └── product.html # Product listing page with search, filters, and pagination

    /styles
       └── All custom CSS files for layout, components, and responsiveness

    index.html          # Entry point of the application

## ✨ Features

### 🔐 Authentication (Supabase)

-   User **sign up** and **log in** using Supabase authentication.
-   Form validation and error feedback.

### 📘 Book Browsing

-   Display a full list of books.
-   Click on any book to open a **static modal** showing detailed
    information.

### 📄 Pagination

-   Product listing includes **same-page pagination**.
-   **14 books per page**.

### 🔍 Search & Filter

-   Search books **by title**.
-   Filter books in ascending/descending order by:
    -   Title
    -   Price

### 🛒 Shopping Cart (Local Storage)

-   Add items to cart.
-   Cart stored in **localStorage**.
-   Static modal for the cart with show/hide functionality using an
    accordion.
-   Increase/decrease quantity.
-   Remove items.
-   Cart persists after page reload.

### 🧭 Navigation

-   Smooth transitions between pages (Home → Products → Book Details).

### 📱 Responsive Layout

-   Mobile, tablet, and desktop friendly.
-   Built using:
    -   **Bootstrap grid system**
    -   **Custom CSS**

## 🛠️ Technologies Used

-   **HTML5**
-   **CSS3**
-   **Bootstrap 5**
-   **Font awsome Icons**
-   **JavaScript (ES6)**
-   **Supabase Authentication**
-   **localStorage API**

## 🚀 Getting Started

### 1️⃣ Clone the Repository

    git clone https://github.com/OlaRedaAbdulrazeq/Bookstore.git

### 2️⃣ Open the Project

-   Open `index.html` manually\
    **OR**
-   Start a Live Server in VS Code for dynamic behavior.

### 3️⃣ Supabase Setup

Update your Supabase credentials in your JS files:

    const URL = "YOUR_URL";
    const apikey = "YOUR_PUBLIC_ANON_KEY";

## 🧪 How to Use the Application

### 🏠 Home Page

-   Access login, signup, or proceed to the products page.

### 📄 Products Page

-   Browse paginated product listings.
-   Use search to find books by title.
-   Apply filters for sorting by price or title.
-   Click a book to view more details in a modal.
-   Add items to cart.

### 🛒 Cart System

-   Opens as a static modal with accordion behavior.
-   Modify quantities or remove items.
-   Cart persists via localStorage.

## 🤝 Contributing

1.  Fork the repository\
2.  Create a new feature branch\
3.  Commit your changes\
4.  Push and open a Pull Request


