// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer for Deals
    function updateCountdown() {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3); // 3 days from now
        
        const now = new Date();
        const diff = targetDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartBadge = document.querySelector('.badge');
    let cartCount = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartBadge.textContent = cartCount;
            
            // Animation effect
            this.textContent = 'Added!';
            this.style.backgroundColor = '#4ecdc4';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 2000);
            
            // Show notification
            showNotification('Item added to cart successfully!');
        });
    });
    
    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            showNotification(`Searching for: ${searchTerm}`);
            // In a real application, this would redirect to search results page
            searchInput.value = '';
        }
    }
    
    // Notification System
    function showNotification(message) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#4ecdc4',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '5px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Product Card Hover Effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
    
    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Navigation would take you to the ' + this.textContent + ' section');
        });
    });
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter');
    const newsletterInput = newsletterForm.querySelector('input');
    const newsletterButton = newsletterForm.querySelector('button');
    
    newsletterButton.addEventListener('click', function() {
        const email = newsletterInput.value.trim();
        if (email && validateEmail(email)) {
            showNotification('Thank you for subscribing to our newsletter!');
            newsletterInput.value = '';
        } else {
            showNotification('Please enter a valid email address');
        }
    });
    
    // Email Validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Hero CTA Button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        showNotification('Redirecting to featured products...');
    });
    
    // Deal Button
    const dealButton = document.querySelector('.deal-button');
    dealButton.addEventListener('click', function() {
        showNotification('Redirecting to sale items...');
    });
    
    // Header Icons
    const headerIcons = document.querySelectorAll('.icon-item');
    headerIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconName = this.querySelector('span:last-child').textContent;
            showNotification(`Opening ${iconName} section...`);
        });
    });
    
    // Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            showNotification(`Browsing ${categoryName} collection...`);
        });
    });
    
    // Initialize animations
    initializeAnimations();
});

// Animation functions
function initializeAnimations() {
    // Fade in elements when they come into view
    const fadeElements = document.querySelectorAll('.category-card, .product-card, .deal-banner');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Staggered animation for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Window resize handler
window.addEventListener('resize', function() {
    // Adjust elements based on screen size if needed
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Form submission prevention
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Form submission would be processed in a real application');
    });
});