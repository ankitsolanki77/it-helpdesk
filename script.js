// IT HelpDesk Portal JavaScript

// Function to redirect to Microsoft Forms
function redirectToForm(button) {
    // Get the parent service card
    const serviceCard = button.closest('.service-card');
    
    // Get the URL from the data attribute
    const formUrl = serviceCard.getAttribute('data-url');
    
    if (!formUrl) {
        console.error('No form URL found for this service');
        showNotification('Error: Form URL not found', 'error');
        return;
    }
    
    // Add loading state
    button.classList.add('loading');
    button.innerHTML = '<span>Redirecting...</span><i class="fas fa-spinner fa-spin"></i>';
    
    // Disable all buttons temporarily
    const allButtons = document.querySelectorAll('.service-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });
    
    // Show notification
    showNotification('Redirecting to Microsoft Forms...', 'info');
    
    // Redirect after a short delay for better UX
    setTimeout(() => {
        try {
            // Open in new tab for better user experience
            window.open(formUrl, '_blank');
            
            // Reset button state after redirect
            setTimeout(() => {
                resetButtonState(button);
                resetAllButtons();
            }, 1000);
            
        } catch (error) {
            console.error('Error redirecting to form:', error);
            showNotification('Error redirecting to form. Please try again.', 'error');
            resetButtonState(button);
            resetAllButtons();
        }
    }, 500);
}

// Function to reset button state
function resetButtonState(button) {
    button.classList.remove('loading');
    button.innerHTML = '<span>Start Request</span><i class="fas fa-arrow-right"></i>';
}

// Function to reset all buttons
function resetAllButtons() {
    const allButtons = document.querySelectorAll('.service-btn');
    allButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
    });
}

// Function to show notifications
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
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Helper function to get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Helper function to get notification color
function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#27ae60';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        default: return '#3498db';
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Allow Enter key to activate focused buttons
    if (event.key === 'Enter' && event.target.classList.contains('service-btn')) {
        event.preventDefault();
        redirectToForm(event.target);
    }
});

// Add click tracking for analytics (optional)
function trackServiceClick(serviceName) {
    // This can be extended to integrate with analytics services
    console.log(`Service clicked: ${serviceName}`);
    
    // Example: Google Analytics tracking
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'service_click', {
    //         'service_name': serviceName
    //     });
    // }
}

// Enhanced redirect function with tracking
function redirectToFormWithTracking(button) {
    const serviceCard = button.closest('.service-card');
    const serviceName = serviceCard.querySelector('h3').textContent;
    
    // Track the click
    trackServiceClick(serviceName);
    
    // Proceed with redirect
    redirectToForm(button);
}

// Add service card click tracking
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add click event to entire card for better UX
        card.addEventListener('click', function(event) {
            // Only trigger if not clicking on the button directly
            if (!event.target.closest('.service-btn')) {
                const button = card.querySelector('.service-btn');
                if (button) {
                    redirectToFormWithTracking(button);
                }
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
});

// Add loading state management
function showLoadingState() {
    document.body.classList.add('loading');
}

function hideLoadingState() {
    document.body.classList.remove('loading');
}

// Add error handling for network issues
window.addEventListener('online', function() {
    showNotification('Connection restored', 'success');
});

window.addEventListener('offline', function() {
    showNotification('You are currently offline', 'warning');
});

// Add service worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `${title}: ${description}`);
        
        // Add keyboard support
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const button = card.querySelector('.service-btn');
                if (button) {
                    redirectToFormWithTracking(button);
                }
            }
        });
    });
});

// Export functions for potential external use
window.ITHelpDeskPortal = {
    redirectToForm,
    showNotification,
    trackServiceClick
};
