# 🔐 Role Management System - IT HelpDesk Portal

## 📋 Overview

The IT HelpDesk Portal now includes a sophisticated role-based access control system that allows you to show different services to different user types. This document explains how the system works and how to manage it.

## 🎯 Current Role Configuration

### **Regular Users** (3 Services)
- ✅ **Shared Mailbox Access** - Request access to shared mailboxes and distribution lists
- ✅ **DL Modification** - Request changes to distribution lists and group memberships  
- ✅ **Application Access** - Request access to business applications and software

### **Admin Users** (5 Services)
- ✅ **Onboarding** - Request access for new employees joining the organization
- ✅ **Offboarding** - Process access removal for employees leaving the organization
- ✅ **Shared Mailbox Access** - Request access to shared mailboxes and distribution lists
- ✅ **DL Modification** - Request changes to distribution lists and group memberships
- ✅ **Application Access** - Request access to business applications and software

## 🔧 How the System Works

### 1. **Role Definition** (in `script.js`)
```javascript
const USER_ROLES = {
    // Regular users see: Shared Mailbox Access, DL Modification, Application Access (3 services)
    'user': ['shared-mailbox', 'dl-modification', 'application-access'],
    
    // Admin users see: All 5 services
    'admin': ['onboarding', 'offboarding', 'shared-mailbox', 'dl-modification', 'application-access']
};
```

### 2. **Current User Role** (in `script.js`)
```javascript
let currentUserRole = 'user'; // Change to 'admin' to see all services
```

### 3. **Service Mapping** (in `index.html`)
Each service card has a `data-role` attribute:
- `data-role="all"` - Visible to all users
- `data-role="admin"` - Visible only to admin users

## 🛠️ How to Manage Roles

### **Option 1: Simple Role Switching (Current Setup)**

**For Testing:**
1. Open the portal in your browser
2. Use the role switcher buttons in the header:
   - **"Regular User"** - Shows 3 services
   - **"Admin"** - Shows all 5 services

**For Production:**
1. Edit `script.js` line 15:
   ```javascript
   let currentUserRole = 'user'; // or 'admin'
   ```

### **Option 2: Dynamic Role Assignment (Recommended for Production)**

**Step 1: Remove Test Buttons**
Remove lines 275-297 in `script.js` (the `addRoleSwitchingButtons()` function)

**Step 2: Integrate with Authentication**
Replace the static role assignment with dynamic detection:

```javascript
// Example: Get role from URL parameter
function getUserRoleFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('role') || 'user';
}

// Example: Get role from localStorage (if set by login system)
function getUserRoleFromStorage() {
    return localStorage.getItem('userRole') || 'user';
}

// Example: Get role from API call
async function getUserRoleFromAPI() {
    try {
        const response = await fetch('/api/user/role');
        const data = await response.json();
        return data.role || 'user';
    } catch (error) {
        return 'user'; // Default to regular user
    }
}

// Update the role assignment
let currentUserRole = getUserRoleFromURL(); // or your preferred method
```

### **Option 3: Advanced Role Management**

**Create a Role Management Interface:**

```javascript
// Add this to your portal for role management
function createRoleManagementInterface() {
    const roleManager = document.createElement('div');
    roleManager.className = 'role-manager';
    roleManager.innerHTML = `
        <h3>Role Management</h3>
        <select id="roleSelector" onchange="changeUserRole(this.value)">
            <option value="user">Regular User</option>
            <option value="admin">Administrator</option>
        </select>
        <button onclick="saveUserRole()">Save Role</button>
    `;
    
    // Add to header or create a separate admin panel
    document.querySelector('.header').appendChild(roleManager);
}

function saveUserRole() {
    const selectedRole = document.getElementById('roleSelector').value;
    localStorage.setItem('userRole', selectedRole);
    changeUserRole(selectedRole);
    showNotification('Role saved successfully', 'success');
}
```

## 🔄 Adding New Services

### **Step 1: Add Service Card**
In `index.html`, add a new service card with appropriate `data-role`:

```html
<div class="service-card" data-url="YOUR_FORM_URL" data-role="admin">
    <div class="service-icon">
        <i class="fas fa-your-icon"></i>
    </div>
    <h3>New Service</h3>
    <p>Description of the new service</p>
    <button class="service-btn" onclick="redirectToForm(this)">
        <span>Start Request</span>
        <i class="fas fa-arrow-right"></i>
    </button>
</div>
```

### **Step 2: Update Role Configuration**
In `script.js`, add the service to the appropriate roles:

```javascript
const USER_ROLES = {
    'user': ['shared-mailbox', 'dl-modification', 'application-access', 'new-service'],
    'admin': ['onboarding', 'offboarding', 'shared-mailbox', 'dl-modification', 'application-access', 'new-service']
};
```

## 🔒 Security Considerations

### **Client-Side vs Server-Side**
- **Current Implementation**: Client-side role checking (for demo/testing)
- **Production Recommendation**: Server-side role validation

### **Security Best Practices**
1. **Never trust client-side role checks** for sensitive operations
2. **Validate roles on the server** before processing requests
3. **Use secure authentication** (OAuth, SAML, etc.)
4. **Implement proper session management**
5. **Log role-based access attempts**

### **Example Server-Side Validation**
```javascript
// This should be implemented on your backend
function validateUserAccess(userId, serviceName) {
    const userRole = getUserRoleFromDatabase(userId);
    const allowedServices = USER_ROLES[userRole] || [];
    
    return allowedServices.includes(serviceName);
}
```

## 📊 Monitoring and Analytics

### **Track Role Usage**
```javascript
// Add to your analytics
function trackRoleAccess(serviceName, userRole) {
    // Send to your analytics service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'service_access', {
            'service_name': serviceName,
            'user_role': userRole
        });
    }
}
```

### **Usage Reports**
Monitor which services are accessed by which user types to optimize your portal.

## 🚀 Deployment Checklist

### **Before Going Live:**
- [ ] Remove test role switcher buttons
- [ ] Implement proper authentication
- [ ] Set up server-side role validation
- [ ] Test all role combinations
- [ ] Configure analytics tracking
- [ ] Set up monitoring and logging

### **After Deployment:**
- [ ] Monitor user access patterns
- [ ] Gather feedback on service availability
- [ ] Adjust role permissions based on usage
- [ ] Regular security audits

## 🆘 Troubleshooting

### **Common Issues:**

**Services not showing:**
- Check `data-role` attributes in HTML
- Verify role configuration in `USER_ROLES`
- Ensure `currentUserRole` is set correctly

**Role switching not working:**
- Check browser console for JavaScript errors
- Verify `initializeRoleBasedAccess()` is called
- Ensure all service names match between HTML and JavaScript

**Layout issues:**
- The grid automatically adjusts based on visible services
- Check CSS for responsive design issues
- Test on different screen sizes

## 📞 Support

For technical support or customization requests:
1. Check the browser console for errors
2. Verify all files are uploaded correctly
3. Test with different user roles
4. Contact your IT administrator for authentication integration

---

**Remember**: This role management system is designed to be flexible and easy to customize. Start with the simple configuration and gradually implement more advanced features as needed.
