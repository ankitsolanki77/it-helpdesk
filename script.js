// IT HelpDesk Portal JavaScript

// User Role Configuration
// Change this to control which services are visible to different user types
const USER_ROLES = {
    // Regular users see: Shared Mailbox Access, DL Modification, Application Access (3 services)
    'user': ['shared-mailbox', 'dl-modification', 'application-access'],
    
    // Admin users see: All 5 services
    'admin': ['onboarding', 'offboarding', 'shared-mailbox', 'dl-modification', 'application-access']
};

// Current user role - Determined by Office 365 group membership
let currentUserRole = null; // Will be set by Office 365 authentication
let isOffice365Enabled = true; // ✅ Office 365 integration ENABLED

// Service mapping for role-based access
const SERVICE_MAPPING = {
    'onboarding': 'data-role="all"',
    'offboarding': 'data-role="admin"',
    'shared-mailbox': 'data-role="all"',
    'dl-modification': 'data-role="admin"',
    'application-access': 'data-role="all"'
};

// Function to initialize role-based access control
function initializeRoleBasedAccess() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const serviceRole = card.getAttribute('data-role');
        const serviceName = getServiceName(card);
        
        // Check if current user has access to this service
        if (currentUserRole === 'admin' || serviceRole === 'all' || 
            USER_ROLES[currentUserRole]?.includes(serviceName)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update grid layout after hiding cards
    updateGridLayout();
}

// Function to get service name from card
function getServiceName(card) {
    const title = card.querySelector('h3').textContent.toLowerCase();
    return title.replace(/\s+/g, '-');
}

// Function to update grid layout
function updateGridLayout() {
    const visibleCards = document.querySelectorAll('.service-card[style*="block"], .service-card:not([style*="none"])');
    const grid = document.querySelector('.services-grid');
    
    // Adjust grid columns based on number of visible cards
    if (visibleCards.length <= 2) {
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    } else if (visibleCards.length === 3) {
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    } else {
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    }
}

// Function to change user role (for testing purposes)
function changeUserRole(newRole) {
    currentUserRole = newRole;
    initializeRoleBasedAccess();
    
    // Show notification
    const roleText = newRole === 'admin' ? 'Administrator' : 'Regular User';
    showNotification(`Switched to ${roleText} view`, 'info');
}

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
document.addEventListener('DOMContentLoaded', async function() {
    // Hide services initially
    hideServicesUntilAuthentication();
    
    // Initialize authentication and role-based access control
    await initializeAuthentication();
    
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
    
    // Add authentication and role management interface
    addAuthenticationInterface();
});

// Hide services until user is authenticated
function hideServicesUntilAuthentication() {
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        servicesGrid.style.display = 'none';
    }
}

// Show services after authentication
function showServicesAfterAuthentication() {
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        servicesGrid.style.display = 'grid';
    }
}

// Initialize authentication system
async function initializeAuthentication() {
    console.log('Initializing authentication system...');
    console.log('Office365Enabled:', isOffice365Enabled);
    
    if (isOffice365Enabled) {
        // Check if MSAL library is loaded
        if (typeof msal === 'undefined') {
            console.error('MSAL library not loaded!');
            showNotification('Authentication system not loaded. Please refresh the page.', 'error');
            return;
        }
        
        // Check if Office365Auth is available
        if (!window.Office365Auth) {
            console.error('Office365Auth not available!');
            showNotification('Authentication system not available. Please refresh the page.', 'error');
            return;
        }
        
        console.log('MSAL and Office365Auth are available');
        
        // Try Office 365 authentication
        try {
            const role = await window.Office365Auth?.getUserRole();
            if (role && role !== 'unauthorized') {
                currentUserRole = role;
                initializeRoleBasedAccess();
                showServicesAfterAuthentication();
                return;
            } else if (role === 'unauthorized') {
                showNotification('You are not authorized to access this portal. Please contact your administrator.', 'error');
                return;
            }
        } catch (error) {
            console.error('Office 365 authentication failed:', error);
            showNotification('Authentication failed. Please try again.', 'error');
        }
    }
    
    // Fallback to default role or show login
    if (currentUserRole === null) {
        // Don't show services until authenticated
        // currentUserRole = 'user'; // Default fallback
        // initializeRoleBasedAccess();
        // showServicesAfterAuthentication();
    }
}

// Add authentication interface
function addAuthenticationInterface() {
    const header = document.querySelector('.header-content');
    
    if (isOffice365Enabled) {
        // Office 365 authentication interface
        const authInterface = document.createElement('div');
        authInterface.className = 'auth-interface';
        
        if (window.Office365Auth?.isAuthenticated()) {
            const user = window.Office365Auth.getCurrentUser();
            authInterface.innerHTML = `
                <div class="user-info">
                    <p class="user-name">Welcome, ${user?.name || user?.username || 'User'}</p>
                    <p class="user-role">Role: ${currentUserRole === 'admin' ? 'Administrator' : 'Regular User'}</p>
                    <button onclick="logoutFromOffice365()" class="logout-btn">Logout</button>
                </div>
            `;
        } else {
            authInterface.innerHTML = `
                <div class="login-prompt">
                    <p>Please sign in with your Office 365 account to access the portal.</p>
                    <button onclick="loginWithOffice365()" class="login-btn">Sign in with Office 365</button>
                </div>
            `;
        }
        
        header.appendChild(authInterface);
    } else {
        // Fallback: Add role switching buttons for testing
        addRoleSwitchingButtons();
    }
}

// Office 365 login function
async function loginWithOffice365() {
    try {
        showNotification('Signing in...', 'info');
        console.log('Starting Office 365 login...');
        
        // Check if Office365Auth is available
        if (!window.Office365Auth) {
            throw new Error('Office365Auth not loaded. Check if office365-auth.js is loaded correctly.');
        }
        
        console.log('Office365Auth available, calling login...');
        const role = await window.Office365Auth.login();
        console.log('Login response:', role);
        
        if (role && role !== 'unauthorized') {
            currentUserRole = role;
            initializeRoleBasedAccess();
            showServicesAfterAuthentication();
            showNotification('Login successful!', 'success');
            // Update the UI without full page reload
            addAuthenticationInterface();
        } else if (role === 'unauthorized') {
            showNotification('You are not authorized to access this portal. Please contact your administrator.', 'error');
        } else {
            showNotification('Login failed: No role returned. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Login failed with error:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Show more specific error message
        let errorMessage = 'Login failed. Please try again.';
        if (error.message) {
            errorMessage = `Login failed: ${error.message}`;
        }
        
        showNotification(errorMessage, 'error');
        
        // Also show error in console for debugging
        console.log('Full error object:', error);
    }
}

// Office 365 logout function
async function logoutFromOffice365() {
    try {
        await window.Office365Auth.logout();
        currentUserRole = null;
        hideServicesUntilAuthentication();
        showNotification('Logged out successfully', 'success');
        // Update the UI without full page reload
        addAuthenticationInterface();
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

// Function to add role switching buttons for testing (fallback)
function addRoleSwitchingButtons() {
    const header = document.querySelector('.header-content');
    const roleSwitcher = document.createElement('div');
    roleSwitcher.className = 'role-switcher';
    roleSwitcher.innerHTML = `
        <div class="role-buttons">
            <button onclick="changeUserRole('user')" class="role-btn ${currentUserRole === 'user' ? 'active' : ''}">
                Regular User (Shared Mailbox, DL Mod, App Access)
            </button>
            <button onclick="changeUserRole('admin')" class="role-btn ${currentUserRole === 'admin' ? 'active' : ''}">
                Admin (All 5 services)
            </button>
        </div>
        <p class="role-info">Current view: ${currentUserRole === 'admin' ? 'Administrator (All Services)' : 'Regular User (3 Services)'}</p>
    `;
    
    header.appendChild(roleSwitcher);
}

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
