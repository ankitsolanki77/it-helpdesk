# 🔧 Login Troubleshooting Guide

## 🚨 **Issue: Login Failed**

### **Problem**: You see "Sign in with Office 365" but login fails

## 🔍 **Most Common Causes & Solutions**

### **1. Redirect URI Mismatch** ⚠️ **MOST LIKELY CAUSE**

**Problem**: The redirect URI in your Azure AD app doesn't match where you're testing

**Solution**: Update Azure AD App Registration

#### **For Local Testing:**
1. **Go to Azure Portal** → **Azure Active Directory** → **App registrations**
2. **Find your app**: `IT HelpDesk Portal`
3. **Go to Authentication**
4. **Add redirect URI**: `http://localhost:8000/auth-callback.html`
5. **Save changes**

#### **For Production:**
1. **Add redirect URI**: `https://yourdomain.com/auth-callback.html`
2. **Save changes**

### **2. Missing Azure AD Permissions**

**Problem**: Required permissions not granted

**Solution**: Grant admin consent
1. **Go to API permissions** in your app registration
2. **Verify these permissions are added**:
   - `User.Read` (Delegated)
   - `GroupMember.Read.All` (Delegated)
   - `Group.Read.All` (Delegated)
3. **Click "Grant admin consent"**
4. **Verify all show green checkmarks**

### **3. Application ID or Tenant ID Incorrect**

**Problem**: Wrong IDs in configuration

**Solution**: Verify IDs in Azure Portal
1. **Application ID**: `7a572b71-a735-4852-92af-65931deaa38d`
2. **Tenant ID**: `80f3b31b-5dc9-4605-a654-5ad7e6e5417c`

## 🧪 **Quick Fix for Local Testing**

### **Option 1: Use Local Server**
```bash
# Navigate to your project folder
cd "C:\Users\ankit.solanki\Downloads\Cursor Project\IT Portal"

# Start local server (Python)
python -m http.server 8000

# Or use Node.js
npx http-server -p 8000
```

Then access: `http://localhost:8000`

### **Option 2: Update Redirect URI for Local Testing**
1. **In Azure AD app registration**
2. **Go to Authentication**
3. **Add redirect URI**: `http://localhost:8000/auth-callback.html`
4. **Save**

### **Option 3: Test with File Protocol (Limited)**
1. **Open `index.html` directly** in browser
2. **Note**: This may have limitations with Office 365 authentication

## 🔧 **Debug Steps**

### **Step 1: Check Browser Console**
1. **Open browser developer tools** (F12)
2. **Go to Console tab**
3. **Look for error messages**
4. **Common errors**:
   - "Redirect URI mismatch"
   - "Invalid client"
   - "Access denied"

### **Step 2: Check Network Tab**
1. **Go to Network tab** in developer tools
2. **Try to login**
3. **Look for failed requests**
4. **Check response codes** (400, 401, 403, etc.)

### **Step 3: Verify Azure AD Configuration**
1. **Go to Azure Portal**
2. **Check app registration settings**
3. **Verify redirect URIs**
4. **Check API permissions**

## 📋 **Complete Checklist**

### **Azure AD App Registration:**
- [ ] **Application ID**: `7a572b71-a735-4852-92af-65931deaa38d`
- [ ] **Tenant ID**: `80f3b31b-5dc9-4605-a654-5ad7e6e5417c`
- [ ] **Redirect URI**: Added for your testing environment
- [ ] **API Permissions**: All 3 permissions added and granted
- [ ] **Admin Consent**: Granted for all permissions

### **Office 365 Groups:**
- [ ] **Regular Users Group**: `7342e17a-7542-40bd-a192-f7bdc2977328`
- [ ] **Admin Users Group**: `827141a0-a9a7-4d4a-8888-0fc0ede8440e`
- [ ] **Test users added** to appropriate groups

### **Portal Configuration:**
- [ ] **Office 365 integration enabled**: `isOffice365Enabled = true`
- [ ] **All files uploaded** correctly
- [ ] **HTTPS enabled** (for production)

## 🚀 **Quick Test Setup**

### **For Immediate Testing:**

1. **Start local server**:
   ```bash
   python -m http.server 8000
   ```

2. **Add redirect URI** in Azure AD:
   - `http://localhost:8000/auth-callback.html`

3. **Access portal**:
   - `http://localhost:8000`

4. **Test login** with Office 365 account

## 🔍 **Error Messages & Solutions**

### **"AADSTS50011: The reply URL specified in the request does not match the reply URLs configured for the application"**
**Solution**: Add correct redirect URI to Azure AD app registration

### **"AADSTS65001: The user or administrator has not consented to use the application"**
**Solution**: Grant admin consent for API permissions

### **"AADSTS700016: Application with identifier was not found"**
**Solution**: Check Application ID is correct

### **"AADSTS90002: Tenant not found"**
**Solution**: Check Tenant ID is correct

## 📞 **Still Having Issues?**

### **Debug Information to Collect:**
1. **Browser console errors**
2. **Network request failures**
3. **Azure AD sign-in logs**
4. **Exact error message**

### **Contact Information:**
- **Azure AD Administrator**: For permission issues
- **IT Administrator**: For group membership issues
- **Developer**: For technical configuration issues

---

## ✅ **Expected Behavior After Fix**

1. **Visit portal** → See "Sign in with Office 365" button
2. **Click login** → Redirect to Microsoft login page
3. **Enter credentials** → Successful authentication
4. **Return to portal** → See appropriate services based on group membership
5. **Services visible** → Only after successful authentication

**The key is getting the redirect URI to match your testing environment!**
