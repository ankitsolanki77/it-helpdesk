# 🚨 Login Error Troubleshooting Guide

## 🔍 **Issue: "Login failed, please try again later"**

This error indicates a problem with the Office 365 authentication flow. Let's debug this step by step.

## 🧪 **Step 1: Check Browser Console**

### **Open Developer Tools:**
1. **Press F12** or right-click → "Inspect"
2. **Go to Console tab**
3. **Try to login** and watch for error messages
4. **Look for these specific errors:**

#### **Common Error Messages:**
- `Office365Auth not loaded` → JavaScript file not loading
- `MSAL initialization failed` → MSAL library issue
- `Redirect URI mismatch` → Azure AD configuration issue
- `Access denied` → Permission issue
- `Invalid client` → Application ID issue

## 🔧 **Step 2: Verify Azure AD Configuration**

### **Check App Registration:**
1. **Go to Azure Portal** → **Azure Active Directory** → **App registrations**
2. **Find your app**: `IT HelpDesk Portal`
3. **Verify these settings:**

#### **Authentication Tab:**
- **Platform**: Web
- **Redirect URIs**: 
  ```
  https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html
  https://ankitsolanki77.github.io/it-helpdesk/
  ```
- **Logout URL**: `https://ankitsolanki77.github.io/it-helpdesk/`
- **Supported account types**: "Accounts in this organizational directory only"

#### **API Permissions Tab:**
- **Microsoft Graph** (Delegated):
  - ✅ `User.Read`
  - ✅ `GroupMember.Read.All`
  - ✅ `Group.Read.All`
- **Status**: "Granted for [Your Organization]"

## 🧪 **Step 3: Test Direct OAuth URL**

### **Test Authentication Directly:**
Copy and paste this URL in your browser:
```
https://login.microsoftonline.com/80f3b31b-5dc9-4605-a654-5ad7e6e5417c/oauth2/v2.0/authorize?client_id=7a572b71-a735-4852-92af-65931deaa38d&response_type=code&redirect_uri=https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html&scope=openid%20profile%20User.Read%20GroupMember.Read.All%20Group.Read.All&response_mode=query&state=test123
```

### **Expected Results:**
- ✅ **Success**: Redirects to Microsoft login, then back to your portal
- ❌ **Error**: Shows specific error message (this tells us the exact problem)

## 🔍 **Step 4: Check Network Requests**

### **Monitor Network Traffic:**
1. **Open Developer Tools** → **Network tab**
2. **Try to login**
3. **Look for failed requests** (red entries)
4. **Check response codes:**
   - **400**: Bad Request (configuration issue)
   - **401**: Unauthorized (permission issue)
   - **403**: Forbidden (access denied)
   - **404**: Not Found (URL issue)

## 🛠️ **Step 5: Common Fixes**

### **Fix 1: Redirect URI Mismatch**
**Error**: "AADSTS50011: The reply URL specified in the request does not match"

**Solution**:
1. **Go to Azure AD App Registration**
2. **Add exact redirect URI**: `https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html`
3. **Save changes**
4. **Wait 5 minutes** for changes to propagate

### **Fix 2: Missing Permissions**
**Error**: "AADSTS65001: The user or administrator has not consented"

**Solution**:
1. **Go to API Permissions**
2. **Click "Grant admin consent"**
3. **Confirm the action**
4. **Verify all permissions show green checkmarks**

### **Fix 3: Application Not Found**
**Error**: "AADSTS700016: Application with identifier was not found"

**Solution**:
1. **Verify Application ID**: `7a572b71-a735-4852-92af-65931deaa38d`
2. **Check tenant ID**: `80f3b31b-5dc9-4605-a654-5ad7e6e5417c`
3. **Ensure app is in correct tenant**

### **Fix 4: Pop-up Blocker**
**Error**: Pop-up blocked or login window doesn't open

**Solution**:
1. **Disable pop-up blocker** for your domain
2. **Try incognito/private mode**
3. **Use redirect flow instead of popup**

## 🧪 **Step 6: Alternative Testing Methods**

### **Method 1: Use Redirect Instead of Popup**
Update the login method to use redirect instead of popup:

```javascript
// In office365-auth.js, change:
const response = await msalInstance.loginPopup(loginRequest);
// To:
const response = await msalInstance.loginRedirect(loginRequest);
```

### **Method 2: Test with Different Browser**
1. **Try Chrome incognito mode**
2. **Try Firefox private mode**
3. **Clear browser cache and cookies**

### **Method 3: Test with Different User**
1. **Try with a different Office 365 account**
2. **Ensure the test user is in the correct groups**

## 📋 **Step 7: Debug Checklist**

### **Before Testing:**
- [ ] **Azure AD app registration** is configured correctly
- [ ] **Redirect URIs** are added and match exactly
- [ ] **API permissions** are granted with admin consent
- [ ] **Users are added** to appropriate Office 365 groups
- [ ] **Browser pop-up blocker** is disabled
- [ ] **HTTPS** is working (GitHub Pages provides this)

### **During Testing:**
- [ ] **Browser console** is open and monitored
- [ ] **Network tab** is monitored for failed requests
- [ ] **Error messages** are noted and documented
- [ ] **Test with different browsers** if needed

### **After Testing:**
- [ ] **Error messages** are analyzed
- [ ] **Azure AD logs** are checked (if available)
- [ ] **Configuration** is updated based on findings

## 🚨 **Step 8: Emergency Fallback**

### **If Nothing Works:**
1. **Create a new Azure AD app registration**
2. **Use a different redirect URI** (e.g., `https://ankitsolanki77.github.io/it-helpdesk/`)
3. **Test with minimal permissions** first
4. **Gradually add permissions** as needed

## 📞 **Step 9: Get Help**

### **Information to Collect:**
1. **Exact error message** from browser console
2. **Network request failures** (status codes)
3. **Azure AD app registration** configuration
4. **Browser and version** being used
5. **User account** being tested with

### **Contact Options:**
- **Azure AD Administrator**: For permission and configuration issues
- **IT Administrator**: For group membership issues
- **Microsoft Support**: For Azure AD platform issues

---

## 🎯 **Most Likely Causes (in order):**

1. **Redirect URI mismatch** (90% of cases)
2. **Missing admin consent** for API permissions
3. **Pop-up blocker** preventing login window
4. **User not in required groups**
5. **Application ID or Tenant ID incorrect**

**Start with checking the redirect URI - this fixes most login issues!**
