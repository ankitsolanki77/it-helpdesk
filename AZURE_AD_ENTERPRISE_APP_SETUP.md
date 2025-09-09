# 🔧 Azure AD Enterprise App Setup Guide

## 🚨 **Issue: Login Error with Office 365**

You're getting a login error because the Azure AD app registration needs proper enterprise app configuration.

## 🔍 **Root Cause Analysis**

The login error is likely due to:
1. **Missing enterprise app configuration**
2. **Incorrect redirect URI**
3. **Missing required permissions**
4. **App not properly configured for your tenant**

## 🛠️ **Complete Fix: Enterprise App Setup**

### **Step 1: Verify App Registration Configuration**

1. **Go to Azure Portal** → **Azure Active Directory** → **App registrations**
2. **Find your app**: `IT HelpDesk Portal`
3. **Verify these settings**:

#### **Authentication Tab:**
- **Platform configurations**: Web
- **Redirect URIs**: 
  - `https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html`
  - `https://ankitsolanki77.github.io/it-helpdesk/` (optional)
- **Logout URL**: `https://ankitsolanki77.github.io/it-helpdesk/`
- **Implicit grant**: ✅ ID tokens
- **Supported account types**: Accounts in this organizational directory only

#### **API Permissions Tab:**
- **Microsoft Graph** (Delegated permissions):
  - ✅ `User.Read`
  - ✅ `GroupMember.Read.All`
  - ✅ `Group.Read.All`
- **Status**: All permissions should show "Granted for [Your Organization]"

### **Step 2: Create Enterprise Application**

1. **Go to Azure Portal** → **Azure Active Directory** → **Enterprise applications**
2. **Click "New application"**
3. **Click "Create your own application"**
4. **Name**: `IT HelpDesk Portal`
5. **Select**: "Register an application you're working on to integrate with Azure AD"
6. **Click "Create"**

### **Step 3: Configure Enterprise App Properties**

1. **In your new enterprise app**, go to **Properties**
2. **Configure**:
   - **Name**: `IT HelpDesk Portal`
   - **Enabled for users to sign-in**: ✅ Yes
   - **User assignment required**: ✅ Yes (recommended)
   - **Visible to users**: ✅ Yes
   - **Logo**: Upload your company logo (optional)

### **Step 4: Assign Users and Groups**

1. **Go to "Users and groups"** in your enterprise app
2. **Click "Add user/group"**
3. **Add your test users**:
   - Add users to the enterprise app
   - Assign them to appropriate roles if needed

### **Step 5: Configure Single Sign-On**

1. **Go to "Single sign-on"** in your enterprise app
2. **Select "SAML"** or **"OpenID Connect"**
3. **For OpenID Connect**:
   - **Redirect URI**: `https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html`
   - **Logout URL**: `https://ankitsolanki77.github.io/it-helpdesk/`

### **Step 6: Update App Registration Redirect URIs**

1. **Go back to App registrations** → **IT HelpDesk Portal**
2. **Go to Authentication**
3. **Add these redirect URIs**:
   ```
   https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html
   https://ankitsolanki77.github.io/it-helpdesk/
   http://localhost:8000/auth-callback.html (for testing)
   ```
4. **Save changes**

## 🔧 **Alternative: Simplified Configuration**

If the above is too complex, try this simplified approach:

### **Option 1: Use Microsoft Graph Explorer**

1. **Go to**: [https://developer.microsoft.com/en-us/graph/graph-explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
2. **Sign in** with your Office 365 account
3. **Test the permissions** your app needs
4. **Verify group access**

### **Option 2: Test with Different Redirect URI**

1. **Update redirect URI** in Azure AD to:
   ```
   https://ankitsolanki77.github.io/it-helpdesk/
   ```
2. **Update the code** to handle the redirect properly

## 🧪 **Testing Steps**

### **Step 1: Test App Registration**
1. **Go to**: [https://login.microsoftonline.com/80f3b31b-5dc9-4605-a654-5ad7e6e5417c/oauth2/v2.0/authorize?client_id=7a572b71-a735-4852-92af-65931deaa38d&response_type=code&redirect_uri=https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html&scope=openid%20profile%20User.Read%20GroupMember.Read.All%20Group.Read.All](https://login.microsoftonline.com/80f3b31b-5dc9-4605-a654-5ad7e6e5417c/oauth2/v2.0/authorize?client_id=7a572b71-a735-4852-92af-65931deaa38d&response_type=code&redirect_uri=https://ankitsolanki77.github.io/it-helpdesk/auth-callback.html&scope=openid%20profile%20User.Read%20GroupMember.Read.All%20Group.Read.All)

2. **This should redirect** to Microsoft login
3. **After login**, it should redirect back to your portal

### **Step 2: Check Browser Console**
1. **Open browser developer tools** (F12)
2. **Go to Console tab**
3. **Try to login**
4. **Look for error messages**

### **Step 3: Check Network Tab**
1. **Go to Network tab** in developer tools
2. **Try to login**
3. **Look for failed requests**
4. **Check response codes**

## 🚨 **Common Error Messages & Solutions**

### **"AADSTS50011: The reply URL specified in the request does not match"**
**Solution**: Add exact redirect URI to Azure AD app registration

### **"AADSTS65001: The user or administrator has not consented"**
**Solution**: Grant admin consent for API permissions

### **"AADSTS700016: Application with identifier was not found"**
**Solution**: Check Application ID is correct

### **"AADSTS90002: Tenant not found"**
**Solution**: Check Tenant ID is correct

## 🔄 **Quick Fix: Update Redirect URI**

If you want to try a quick fix, update the redirect URI in your Azure AD app registration to:

```
https://ankitsolanki77.github.io/it-helpdesk/
```

Then update the code to handle the redirect properly.

## 📞 **Next Steps**

1. **Follow the enterprise app setup** above
2. **Test with the direct OAuth URL** provided
3. **Check browser console** for specific error messages
4. **Verify group memberships** are correct

## 🎯 **Expected Result After Fix**

1. **Visit portal** → See only "Sign in with Office 365" button
2. **Click login** → Redirect to Microsoft login (no error)
3. **Enter credentials** → Successful authentication
4. **Return to portal** → See services based on group membership

---

**The key is getting the Azure AD app registration properly configured as an enterprise application with the correct redirect URIs and permissions.**
