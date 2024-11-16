// script.js
// Book Data
const books = [
    {
        id: 1,
        title: "Advanced Mathematics for Engineering",
        author: "Robert Johnson",
        price: 49.99,
        rating: 4.5,
        image: "img/book1.jpg"
    },
    {
        id: 2,
        title: "Modern Computer Programming",
        author: "Sarah Williams",
        price: 59.99,
        rating: 5,
        image: "img/book2.jpg"
    },
    // Add more books...
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    updateCartCount();
    
    if (window.location.pathname.includes('payment.html')) {
        displayOrderSummary();
    }
});

// Display Books
function displayBooks() {
    const booksGrid = document.getElementById('booksGrid');
    if (!booksGrid) return;

    booksGrid.innerHTML = books.map(book => `
        <div class="book-card" data-aos="fade-up">
            <div class="book-img-wrapper">
                <img src="${book.image}" alt="${book.title}" class="book-img">
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">By ${book.author}</p>
                <div class="rating">
                    ${generateRatingStars(book.rating)}
                    <span class="rating-text">(${book.rating}/5)</span>
                </div>
                <p class="book-price">$${book.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${book.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Generate Rating Stars
function generateRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - rating < 1) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Add to Cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showCartNotification();
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Show Cart Notification
function showCartNotification() {
    const notification = document.querySelector('.cart-success');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
}

if (searchInput) {
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    
    const booksGrid = document.getElementById('booksGrid');
    if (filteredBooks.length === 0) {
        booksGrid.innerHTML = '<p class="no-results">No books found matching your search.</p>';
    } else {
        displayFilteredBooks(filteredBooks);
    }
}

function displayFilteredBooks(filteredBooks) {
    const booksGrid = document.getElementById('booksGrid');
    booksGrid.innerHTML = filteredBooks.map(book => `
        // Same book card template as in displayBooks()
    `).join('');
}

// Payment Page Functionality
function displayOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!orderItems || !orderTotal) return;

    const total = cart.reduce((sum, book) => sum + book.price, 0);
    
    orderItems.innerHTML = cart.map(book => `
        <div class="order-item">
            <img src="${book.image}" alt="${book.title}">
            <div class="order-item-details">
                <h3>${book.title}</h3>
                <p>$${book.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
    
    orderTotal.textContent = `$${total.toFixed(2)}`;
}

// Handle Payment Form Submission
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add payment processing logic here
        alert('Payment successful! Thank you for your purchase.');
        cart = [];
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
}