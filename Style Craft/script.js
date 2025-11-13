// Hero Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-slide functionality
setInterval(nextSlide, 5000);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Size Guide Tabs
const sizeTabs = document.querySelectorAll('.size-tab');
const sizeTables = document.querySelectorAll('.size-table');

sizeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and tables
        sizeTabs.forEach(t => t.classList.remove('active'));
        sizeTables.forEach(table => table.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding table
        const tabType = tab.getAttribute('data-tab');
        const targetTable = document.getElementById(`${tabType}-sizes`);
        if (targetTable) {
            targetTable.classList.add('active');
        }
    });
});

// Cart Functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Add animation to cart icon
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
        
        // Show success message
        showNotification('Item added to cart!', 'success');
    });
});

// Wishlist Functionality
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('fas')) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('Removed from wishlist', 'info');
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('Added to wishlist!', 'success');
        }
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing!', 'success');
        newsletterForm.reset();
    }
});

// Search Functionality
const searchInput = document.querySelector('.search-box input');

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = e.target.value;
        if (searchTerm.trim()) {
            showNotification(`Searching for: ${searchTerm}`, 'info');
            // Here you would implement actual search functionality
        }
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Scroll to Top Functionality
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Product Quick View Modal
function createQuickViewModal() {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <div class="modal-header" style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            ">
                <h3 style="margin: 0; color: #2c3e50;">Quick View</h3>
                <button class="modal-close" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                ">&times;</button>
            </div>
            <div class="modal-body">
                <p>Product details would be loaded here...</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
    }
    
    function openModal() {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }
    
    // Add event listeners to quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', openModal);
    });
}

// Style Quiz Functionality
function createStyleQuiz() {
    const quizModal = document.createElement('div');
    quizModal.className = 'style-quiz-modal';
    quizModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    const questions = [
        {
            question: "What's your preferred style?",
            options: ["Casual & Comfortable", "Professional & Polished", "Trendy & Bold", "Classic & Timeless"]
        },
        {
            question: "What colors do you gravitate towards?",
            options: ["Neutrals (Black, White, Gray)", "Bright & Vibrant", "Pastels & Soft Tones", "Earth Tones"]
        },
        {
            question: "How do you like your fits?",
            options: ["Loose & Relaxed", "Fitted & Tailored", "Oversized & Cozy", "Varied - depends on the item"]
        }
    ];
    
    let currentQuestion = 0;
    let answers = [];
    
    function renderQuestion() {
        const question = questions[currentQuestion];
        quizModal.innerHTML = `
            <div class="quiz-content" style="
                background: white;
                border-radius: 15px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                text-align: center;
            ">
                <h3 style="margin-bottom: 30px; color: #2c3e50;">Question ${currentQuestion + 1} of ${questions.length}</h3>
                <h4 style="margin-bottom: 30px; color: #333;">${question.question}</h4>
                <div class="quiz-options" style="display: flex; flex-direction: column; gap: 15px;">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" data-answer="${index}" style="
                            padding: 15px 20px;
                            border: 2px solid #e0e0e0;
                            background: white;
                            border-radius: 10px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            font-size: 16px;
                        ">${option}</button>
                    `).join('')}
                </div>
                <button class="quiz-close" style="
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                ">&times;</button>
            </div>
        `;
        
        // Add event listeners
        quizModal.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                answers[currentQuestion] = parseInt(e.target.getAttribute('data-answer'));
                currentQuestion++;
                
                if (currentQuestion < questions.length) {
                    renderQuestion();
                } else {
                    showResults();
                }
            });
            
            btn.addEventListener('mouseenter', () => {
                btn.style.borderColor = '#667eea';
                btn.style.background = '#f8f9fa';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.borderColor = '#e0e0e0';
                btn.style.background = 'white';
            });
        });
        
        quizModal.querySelector('.quiz-close').addEventListener('click', closeQuiz);
    }
    
    function showResults() {
        quizModal.innerHTML = `
            <div class="quiz-results" style="
                background: white;
                border-radius: 15px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                text-align: center;
            ">
                <h3 style="margin-bottom: 20px; color: #2c3e50;">Your Style Profile</h3>
                <p style="margin-bottom: 30px; color: #666;">Based on your answers, we recommend exploring our curated collection that matches your style preferences.</p>
                <button class="btn btn-primary" onclick="closeQuiz()" style="margin-right: 15px;">View Recommendations</button>
                <button class="btn btn-secondary" onclick="closeQuiz()">Close</button>
            </div>
        `;
    }
    
    function closeQuiz() {
        quizModal.style.opacity = '0';
        quizModal.style.visibility = 'hidden';
        currentQuestion = 0;
        answers = [];
    }
    
    function openQuiz() {
        renderQuestion();
        quizModal.style.opacity = '1';
        quizModal.style.visibility = 'visible';
    }
    
    document.body.appendChild(quizModal);
    
    // Add event listener to style quiz button
    document.querySelector('a[href="#quiz"]').addEventListener('click', (e) => {
        e.preventDefault();
        openQuiz();
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createScrollToTopButton();
    createQuickViewModal();
    createStyleQuiz();
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature, .category-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 20px;
            gap: 15px;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);
