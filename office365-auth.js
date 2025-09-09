// Office 365 Integration for IT HelpDesk Portal
// This file handles Microsoft Graph API integration for group-based RBAC

// Configuration - Update these values for your Office 365 tenant
const OFFICE365_CONFIG = {
    // Your Azure AD App Registration details
    clientId: '7a572b71-a735-4852-92af-65931deaa38d', // Your Azure AD App Client ID
    tenantId: '80f3b31b-5dc9-4605-a654-5ad7e6e5417c', // Your Office 365 Tenant ID
    redirectUri: window.location.origin + '/auth-callback.html', // For GitHub Pages: 'https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html'
    
    // Office 365 Group IDs for role assignment
    groups: {
        regularUsers: '7342e17a-7542-40bd-a192-f7bdc2977328', // Regular users group ID
        adminUsers: '827141a0-a9a7-4d4a-8888-0fc0ede8440e'      // Admin users group ID
    },
    
    // Microsoft Graph API endpoints
    graphApiBase: 'https://graph.microsoft.com/v1.0',
    
    // Required permissions
    scopes: [
        'User.Read',
        'GroupMember.Read.All',
        'Group.Read.All'
    ]
};

// Microsoft Authentication Library (MSAL) configuration
const msalConfig = {
    auth: {
        clientId: OFFICE365_CONFIG.clientId,
        authority: `https://login.microsoftonline.com/${OFFICE365_CONFIG.tenantId}`,
        redirectUri: OFFICE365_CONFIG.redirectUri
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false
    }
};

// Initialize MSAL
let msalInstance = null;

// Initialize Office 365 authentication
async function initializeOffice365Auth() {
    try {
        console.log('Office365Auth: Starting initialization...');
        
        // Load MSAL library dynamically
        if (typeof msal === 'undefined') {
            console.log('Office365Auth: Loading MSAL library...');
            await loadMSALLibrary();
            console.log('Office365Auth: MSAL library loaded');
        } else {
            console.log('Office365Auth: MSAL library already available');
        }
        
        // Verify MSAL is available
        if (typeof msal === 'undefined') {
            throw new Error('MSAL library failed to load');
        }
        
        console.log('Office365Auth: Creating MSAL instance with config:', msalConfig);
        msalInstance = new msal.PublicClientApplication(msalConfig);
        console.log('Office365Auth: MSAL instance created:', !!msalInstance);
        
        // Handle redirect promise
        console.log('Office365Auth: Handling redirect promise...');
        await msalInstance.handleRedirectPromise();
        console.log('Office365Auth: Redirect promise handled');
        
        // Check if user is already logged in
        const accounts = msalInstance.getAllAccounts();
        console.log('Office365Auth: Found accounts:', accounts.length);
        
        if (accounts.length > 0) {
            console.log('Office365Auth: User already logged in:', accounts[0].username);
            return await getUserRoleFromOffice365();
        }
        
        console.log('Office365Auth: No existing accounts found');
        return null; // User not logged in
    } catch (error) {
        console.error('Office365Auth: Error initializing Office 365 auth:', error);
        console.error('Office365Auth: Error details:', {
            message: error.message,
            stack: error.stack,
            msalAvailable: typeof msal !== 'undefined',
            msalInstance: !!msalInstance
        });
        return null;
    }
}

// Load MSAL library from CDN
function loadMSALLibrary() {
    return new Promise((resolve, reject) => {
        if (typeof msal !== 'undefined') {
            console.log('Office365Auth: MSAL library already loaded');
            resolve();
            return;
        }
        
        console.log('Office365Auth: Loading MSAL library from CDN...');
        const script = document.createElement('script');
        script.src = 'https://alcdn.msauth.net/browser/2.38.3/js/msal-browser.min.js';
        
        script.onload = () => {
            console.log('Office365Auth: MSAL library loaded successfully');
            if (typeof msal !== 'undefined') {
                resolve();
            } else {
                reject(new Error('MSAL library loaded but not available'));
            }
        };
        
        script.onerror = (error) => {
            console.error('Office365Auth: Failed to load MSAL library:', error);
            reject(new Error('Failed to load MSAL library from CDN'));
        };
        
        document.head.appendChild(script);
    });
}

// Login user with Office 365
async function loginWithOffice365() {
    try {
        console.log('Office365Auth: Starting login process...');
        
        // Ensure MSAL is properly initialized
        if (!msalInstance) {
            console.log('Office365Auth: Initializing MSAL...');
            const initResult = await initializeOffice365Auth();
            console.log('Office365Auth: MSAL initialization result:', initResult);
        }
        
        // Double-check that MSAL instance is available
        if (!msalInstance) {
            throw new Error('MSAL instance is null after initialization');
        }
        
        console.log('Office365Auth: MSAL instance available:', !!msalInstance);
        
        const loginRequest = {
            scopes: OFFICE365_CONFIG.scopes,
            prompt: 'select_account'
        };
        
        console.log('Office365Auth: Login request config:', loginRequest);
        console.log('Office365Auth: About to call loginPopup...');
        
        const response = await msalInstance.loginPopup(loginRequest);
        console.log('Office365Auth: Login successful:', response);
        
        // Get user role after successful login
        console.log('Office365Auth: Getting user role...');
        const userRole = await getUserRoleFromOffice365();
        console.log('Office365Auth: User role determined:', userRole);
        
        return userRole;
    } catch (error) {
        console.error('Office365Auth: Login failed with error:', error);
        console.error('Office365Auth: Error details:', {
            message: error.message,
            errorCode: error.errorCode,
            errorMessage: error.errorMessage,
            stack: error.stack,
            msalInstance: !!msalInstance
        });
        
        // Don't show notification here, let the calling function handle it
        throw error;
    }
}

// Logout user
async function logoutFromOffice365() {
    try {
        if (msalInstance) {
            const accounts = msalInstance.getAllAccounts();
            if (accounts.length > 0) {
                await msalInstance.logoutPopup();
                showNotification('Logged out successfully', 'success');
            }
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

// Get user role based on Office 365 group membership
async function getUserRoleFromOffice365() {
    try {
        if (!msalInstance) {
            return null;
        }
        
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length === 0) {
            return null;
        }
        
        const account = accounts[0];
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return null;
        }
        
        // Check group membership
        const userGroups = await getUserGroups(accessToken);
        
        // Determine role based on group membership
        if (userGroups.includes(OFFICE365_CONFIG.groups.adminUsers)) {
            return 'admin';
        } else if (userGroups.includes(OFFICE365_CONFIG.groups.regularUsers)) {
            return 'user';
        } else {
            // User is not in any recognized group
            showNotification('You are not authorized to access this portal. Please contact your administrator.', 'error');
            return 'unauthorized';
        }
    } catch (error) {
        console.error('Error getting user role:', error);
        return null;
    }
}

// Get access token for Microsoft Graph API
async function getAccessToken() {
    try {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length === 0) {
            return null;
        }
        
        const silentRequest = {
            scopes: OFFICE365_CONFIG.scopes,
            account: accounts[0]
        };
        
        const response = await msalInstance.acquireTokenSilent(silentRequest);
        return response.accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
}

// Get user's group memberships
async function getUserGroups(accessToken) {
    try {
        const response = await fetch(`${OFFICE365_CONFIG.graphApiBase}/me/memberOf`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.value.map(group => group.id);
    } catch (error) {
        console.error('Error getting user groups:', error);
        return [];
    }
}

// Get user information
async function getUserInfo() {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            return null;
        }
        
        const response = await fetch(`${OFFICE365_CONFIG.graphApiBase}/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error getting user info:', error);
        return null;
    }
}

// Check if user is authenticated
function isUserAuthenticated() {
    if (!msalInstance) {
        return false;
    }
    
    const accounts = msalInstance.getAllAccounts();
    return accounts.length > 0;
}

// Get current user account
function getCurrentUser() {
    if (!msalInstance) {
        return null;
    }
    
    const accounts = msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
}

// Export functions for use in main script
window.Office365Auth = {
    initialize: initializeOffice365Auth,
    login: loginWithOffice365,
    logout: logoutFromOffice365,
    getUserRole: getUserRoleFromOffice365,
    getUserInfo: getUserInfo,
    isAuthenticated: isUserAuthenticated,
    getCurrentUser: getCurrentUser,
    config: OFFICE365_CONFIG
};
