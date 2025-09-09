# 🔐 Microsoft Graph API Permissions Guide

## ✅ **Required Permissions for IT HelpDesk Portal**

### **Permission Type: DELEGATED PERMISSIONS** ⚠️ **NOT Application Permissions**

**Why Delegated Permissions?**
- The app acts on behalf of the signed-in user
- User must be authenticated to access their own data
- More secure as it requires user consent
- Perfect for web applications where users sign in

## 📋 **Required Microsoft Graph Permissions**

### 1. **User.Read**
- **Purpose**: Read the signed-in user's profile
- **Type**: Delegated
- **Description**: Allows the app to read the profile of the signed-in user
- **Required for**: Getting user information (name, email, etc.)

### 2. **GroupMember.Read.All**
- **Purpose**: Read group memberships for all groups
- **Type**: Delegated
- **Description**: Allows the app to read group memberships for all groups
- **Required for**: Checking if user belongs to specific Office 365 groups

### 3. **Group.Read.All**
- **Purpose**: Read all groups in the organization
- **Type**: Delegated
- **Description**: Allows the app to read all groups in the organization
- **Required for**: Getting group information and validating group IDs

## 🚫 **What NOT to Use**

### **Application Permissions**
- **Why not**: Application permissions allow the app to act as itself without user context
- **Security risk**: Higher privilege, can access all users' data
- **Not needed**: We only need to check the current user's group membership

## 🔧 **How to Configure in Azure Portal**

### **Step 1: Navigate to App Registration**
1. Go to **Azure Portal** → **Azure Active Directory** → **App registrations**
2. Find your app: **IT HelpDesk Portal**
3. Click on the app name

### **Step 2: Add API Permissions**
1. Click **API permissions** in the left menu
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Choose **Delegated permissions** ⚠️ **NOT Application permissions**

### **Step 3: Add Required Permissions**
Add these three permissions one by one:
1. **User.Read** - Type "User.Read" in search box
2. **GroupMember.Read.All** - Type "GroupMember.Read.All" in search box
3. **Group.Read.All** - Type "Group.Read.All" in search box

### **Step 4: Grant Admin Consent**
1. Click **Grant admin consent for [Your Organization]**
2. Confirm the action
3. All permissions should show green checkmarks

## ✅ **Verification Checklist**

After configuration, verify:
- [ ] All 3 permissions are added
- [ ] All permissions show "Delegated" type
- [ ] All permissions show green checkmarks (admin consent granted)
- [ ] No Application permissions are added
- [ ] Status shows "Granted for [Your Organization]"

## 🔍 **Troubleshooting Permission Issues**

### **Common Issues:**

#### **"Insufficient privileges" Error**
- **Cause**: Admin consent not granted
- **Solution**: Grant admin consent for all permissions

#### **"Access denied" Error**
- **Cause**: User not in required groups
- **Solution**: Add user to appropriate Office 365 groups

#### **"Invalid scope" Error**
- **Cause**: Wrong permission type selected
- **Solution**: Ensure using Delegated permissions, not Application

### **Permission Status Check:**
```javascript
// Add this to your browser console to debug
console.log('Current permissions:', window.Office365Auth?.config?.scopes);
```

## 📊 **Permission Matrix**

| Permission | Type | Purpose | Required |
|------------|------|---------|----------|
| User.Read | Delegated | Read user profile | ✅ Yes |
| GroupMember.Read.All | Delegated | Read group memberships | ✅ Yes |
| Group.Read.All | Delegated | Read group information | ✅ Yes |

## 🔒 **Security Best Practices**

### **Principle of Least Privilege**
- Only request permissions you actually need
- Use Delegated permissions instead of Application when possible
- Regularly audit and review permissions

### **Admin Consent**
- Always grant admin consent for organization-wide apps
- Document why each permission is needed
- Review permissions periodically

### **User Experience**
- Delegated permissions provide better user experience
- Users see exactly what the app can access
- Users can revoke access if needed

## 📞 **Support**

### **If you encounter permission issues:**
1. **Check Azure AD logs** for permission errors
2. **Verify admin consent** is granted
3. **Test with different users** to isolate issues
4. **Contact your Azure AD administrator** for permission problems

### **Useful Resources:**
- [Microsoft Graph Permissions Reference](https://docs.microsoft.com/en-us/graph/permissions-reference)
- [Azure AD App Registration Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [MSAL.js Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications)

---

**Remember**: Always use **Delegated permissions** for this type of web application. Application permissions are for service-to-service scenarios and are not needed here.
