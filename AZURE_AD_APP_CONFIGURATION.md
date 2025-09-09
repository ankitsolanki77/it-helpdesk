# 🔧 Azure AD Application Configuration Guide

## 🚨 **Issue: "Sign in with Office 365" Not Redirecting**

The button isn't redirecting to the Microsoft login page because the Azure AD application isn't properly configured for authentication.

## 🔍 **Root Cause Analysis**

The most common causes are:
1. **Missing redirect URIs** in Azure AD app registration
2. **Incorrect authentication configuration**
3. **Missing required permissions**
4. **App not properly set up for web authentication**

## 🛠️ **Complete Azure AD App Configuration**

### **Step 1: Access Azure AD App Registration**

1. **Go to Azure Portal**: [https://portal.azure.com](https://portal.azure.com)
2. **Navigate to**: **Azure Active Directory** → **App registrations**
3. **Find your app**: `IT HelpDesk Portal` (Application ID: `7a572b71-a735-4852-92af-65931deaa38d`)
4. **Click on the app name**

### **Step 2: Configure Authentication**

1. **Click "Authentication"** in the left menu
2. **Configure these settings**:

#### **Platform Configurations:**
- **Platform**: Web
- **Redirect URIs**: Add these exact URLs:
  ```
  https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html
  https://ankitsolanki77.github.io/it-helpdesk/
  ```
- **Logout URL**: 
  ```
  https://ankitsolanki77.github.io/it-helpdesk/
  ```

#### **Advanced Settings:**
- **Allow public client flows**: No
- **Supported account types**: "Accounts in this organizational directory only"
- **Implicit grant and hybrid flows**:
  - ✅ **ID tokens** (used for implicit flows)
  - ❌ **Access tokens** (not needed)

3. **Click "Save"**

### **Step 3: Configure API Permissions**

1. **Click "API permissions"** in the left menu
2. **Add these Microsoft Graph permissions** (Delegated):

#### **Required Permissions:**
- **User.Read** - Sign in and read user profile
- **GroupMember.Read.All** - Read group memberships
- **Group.Read.All** - Read all groups

#### **How to Add:**
1. **Click "Add a permission"**
2. **Select "Microsoft Graph"**
3. **Choose "Delegated permissions"**
4. **Search and add each permission**:
   - Type "User.Read" → Select → Add
   - Type "GroupMember.Read.All" → Select → Add
   - Type "Group.Read.All" → Select → Add

#### **Grant Admin Consent:**
1. **Click "Grant admin consent for [Your Organization]"**
2. **Click "Yes"** to confirm
3. **Verify all permissions show green checkmarks**

### **Step 4: Configure App Properties**

1. **Click "Overview"** in the left menu
2. **Verify these settings**:
   - **Application (client) ID**: `7a572b71-a735-4852-92af-65931deaa38d`
   - **Directory (tenant) ID**: `80f3b31b-5dc9-4605-a654-5ad7e6e5417c`
   - **Supported account types**: "Accounts in this organizational directory only"

### **Step 5: Create Enterprise Application (Optional but Recommended)**

1. **Go to**: **Azure Active Directory** → **Enterprise applications**
2. **Click "New application"**
3. **Click "Create your own application"**
4. **Configure**:
   - **Name**: `IT HelpDesk Portal`
   - **Select**: "Register an application you're working on to integrate with Azure AD"
5. **Click "Create"**

## 🧪 **Step 6: Test Configuration**

### **Test 1: Direct OAuth URL**
Copy and paste this URL in your browser:
```
https://login.microsoftonline.com/80f3b31b-5dc9-4605-a654-5ad7e6e5417c/oauth2/v2.0/authorize?client_id=7a572b71-a735-4852-92af-65931deaa38d&response_type=code&redirect_uri=https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html&scope=openid%20profile%20User.Read%20GroupMember.Read.All%20Group.Read.All&response_mode=query&state=test123
```

**Expected Result**: Should redirect to Microsoft login page

### **Test 2: Check Browser Console**
1. **Open your portal**: `https://ankitsolanki77.github.io/it-helpdesk/`
2. **Press F12** → **Console tab**
3. **Click "Sign in with Office 365"**
4. **Look for error messages**

## 🚨 **Common Configuration Issues**

### **Issue 1: Redirect URI Mismatch**
**Error**: "AADSTS50011: The reply URL specified in the request does not match"

**Solution**:
1. **Go to Authentication** in your app registration
2. **Add exact redirect URI**: `https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html`
3. **Save changes**
4. **Wait 5 minutes** for changes to propagate

### **Issue 2: Missing Permissions**
**Error**: "AADSTS65001: The user or administrator has not consented"

**Solution**:
1. **Go to API Permissions**
2. **Add required permissions** (User.Read, GroupMember.Read.All, Group.Read.All)
3. **Click "Grant admin consent"**
4. **Verify green checkmarks**

### **Issue 3: App Not Found**
**Error**: "AADSTS700016: Application with identifier was not found"

**Solution**:
1. **Verify Application ID**: `7a572b71-a735-4852-92af-65931deaa38d`
2. **Check you're in the correct tenant**
3. **Ensure app is not deleted**

### **Issue 4: MSAL Library Not Loading**
**Error**: "MSAL library not loaded!"

**Solution**:
1. **Check internet connection**
2. **Try different browser**
3. **Clear browser cache**
4. **Check if CDN is blocked**

## 🔧 **Quick Fix Checklist**

### **Azure AD App Registration:**
- [ ] **Authentication** → **Redirect URIs** added correctly
- [ ] **API Permissions** → All 3 permissions added and granted
- [ ] **Overview** → Application ID and Tenant ID correct
- [ ] **Save** all changes

### **Portal Configuration:**
- [ ] **MSAL library** loading (check browser console)
- [ ] **Office365Auth** available (check browser console)
- [ ] **HTTPS** working (GitHub Pages provides this)
- [ ] **No pop-up blocker** enabled

## 🧪 **Step 7: Debug Steps**

### **Check 1: Browser Console**
1. **Open portal** → **F12** → **Console**
2. **Look for these messages**:
   - ✅ "MSAL and Office365Auth are available"
   - ❌ "MSAL library not loaded!"
   - ❌ "Office365Auth not available!"

### **Check 2: Network Tab**
1. **F12** → **Network tab**
2. **Click "Sign in with Office 365"**
3. **Look for failed requests** (red entries)
4. **Check response codes**

### **Check 3: Direct OAuth Test**
1. **Test the direct OAuth URL** provided above
2. **If it works**: Issue is in JavaScript
3. **If it fails**: Issue is in Azure AD configuration

## 🚀 **Step 8: Alternative Configuration**

### **If Standard Configuration Doesn't Work:**

#### **Option 1: Use Redirect Instead of Popup**
Update the login method in `office365-auth.js`:
```javascript
// Change from:
const response = await msalInstance.loginPopup(loginRequest);
// To:
const response = await msalInstance.loginRedirect(loginRequest);
```

#### **Option 2: Simplify Redirect URI**
1. **Add redirect URI**: `https://ankitsolanki77.github.io/it-helpdesk/`
2. **Update code** to handle redirect on main page

#### **Option 3: Test with Local Development**
1. **Add redirect URI**: `http://localhost:8000/auth-callback.html`
2. **Test locally** first
3. **Then deploy to production**

## 📞 **Step 9: Get Help**

### **If Still Not Working:**
1. **Check Azure AD sign-in logs** (if you have access)
2. **Contact your Azure AD administrator**
3. **Verify tenant permissions**
4. **Check if app registration is in correct tenant**

### **Information to Provide:**
- **Exact error messages** from browser console
- **Azure AD app registration** configuration
- **Browser and version** being used
- **Network request failures** (if any)

---

## 🎯 **Most Likely Fix:**

**90% of cases are fixed by adding the correct redirect URI:**
`https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html`

**Follow Step 2 above to add this redirect URI to your Azure AD app registration.**
