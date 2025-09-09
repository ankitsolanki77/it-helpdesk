# 🧪 IT HelpDesk Portal - Testing Guide

## ✅ **Office 365 Integration ENABLED**

Your IT HelpDesk Portal is now ready for testing with Office 365 group-based authentication!

## 🎯 **Current Configuration Status**

### **✅ Fully Configured:**
- **Application ID**: `7a572b71-a735-4852-92af-65931deaa38d`
- **Tenant ID**: `80f3b31b-5dc9-4605-a654-5ad7e6e5417c`
- **Regular Users Group**: `7342e17a-7542-40bd-a192-f7bdc2977328`
- **Admin Users Group**: `827141a0-a9a7-4d4a-8888-0fc0ede8440e`
- **Office 365 Integration**: ✅ **ENABLED**
- **Azure AD Permissions**: ✅ **CONFIGURED**

## 🧪 **Testing Checklist**

### **Test 1: Regular User Access**
**Objective**: Verify users in Regular Users group see only 3 services

**Steps:**
1. **Ensure test user is in Regular Users group** (`7342e17a-7542-40bd-a192-f7bdc2977328`)
2. **Open portal** in incognito/private browser window
3. **Click "Sign in with Office 365"**
4. **Sign in** with test user's Office 365 credentials
5. **Verify authentication** - should see welcome message with user name
6. **Check services displayed** - should see exactly 3 services:
   - ✅ Shared Mailbox Access
   - ✅ DL Modification
   - ✅ Application Access
7. **Verify role display** - should show "Role: Regular User"

**Expected Result**: ✅ User sees 3 services, no onboarding/offboarding

---

### **Test 2: Admin User Access**
**Objective**: Verify users in Admin Users group see all 5 services

**Steps:**
1. **Ensure test user is in Admin Users group** (`827141a0-a9a7-4d4a-8888-0fc0ede8440e`)
2. **Open portal** in incognito/private browser window
3. **Click "Sign in with Office 365"**
4. **Sign in** with test user's Office 365 credentials
5. **Verify authentication** - should see welcome message with user name
6. **Check services displayed** - should see all 5 services:
   - ✅ Onboarding
   - ✅ Offboarding
   - ✅ Shared Mailbox Access
   - ✅ DL Modification
   - ✅ Application Access
7. **Verify role display** - should show "Role: Administrator"

**Expected Result**: ✅ User sees all 5 services

---

### **Test 3: Unauthorized User Access**
**Objective**: Verify users not in any group are denied access

**Steps:**
1. **Ensure test user is NOT in any IT Portal groups**
2. **Open portal** in incognito/private browser window
3. **Click "Sign in with Office 365"**
4. **Sign in** with test user's Office 365 credentials
5. **Check for error message** - should see "You are not authorized to access this portal"

**Expected Result**: ✅ User sees authorization error message

---

### **Test 4: Service Button Functionality**
**Objective**: Verify all service buttons redirect to correct Microsoft Forms

**Steps:**
1. **Sign in** as any authorized user
2. **Click each service button**
3. **Verify redirect** to correct Microsoft Forms URL
4. **Test all services**:
   - Onboarding → Microsoft Forms
   - Offboarding → Microsoft Forms
   - Shared Mailbox Access → Microsoft Forms
   - DL Modification → Microsoft Forms
   - Application Access → Microsoft Forms

**Expected Result**: ✅ All buttons redirect to correct forms

---

### **Test 5: Logout Functionality**
**Objective**: Verify logout works correctly

**Steps:**
1. **Sign in** as any user
2. **Click "Logout" button**
3. **Verify logout** - should return to login screen
4. **Try to access services** - should require re-authentication

**Expected Result**: ✅ Logout works, requires re-authentication

---

### **Test 6: Mobile Responsiveness**
**Objective**: Verify portal works on mobile devices

**Steps:**
1. **Open portal** on mobile device or use browser dev tools
2. **Sign in** with Office 365
3. **Test all functionality** on mobile:
   - Authentication
   - Service visibility
   - Button clicks
   - Responsive design

**Expected Result**: ✅ Portal works perfectly on mobile

## 🔍 **Troubleshooting Common Issues**

### **Issue: "User not authorized" for valid users**
**Possible Causes:**
- User not added to correct group
- Group ID mismatch
- Azure AD permissions not granted

**Solutions:**
1. **Check group membership** in Microsoft 365 Admin Center
2. **Verify group IDs** in configuration
3. **Check Azure AD permissions** are granted

### **Issue: Login fails or redirects incorrectly**
**Possible Causes:**
- Redirect URI mismatch
- Application ID/Tenant ID incorrect
- Azure AD app not configured properly

**Solutions:**
1. **Check redirect URI** in Azure AD app registration
2. **Verify Application ID and Tenant ID**
3. **Check Azure AD app configuration**

### **Issue: Services not showing correctly**
**Possible Causes:**
- Group membership not updated
- JavaScript errors
- Role detection failing

**Solutions:**
1. **Check browser console** for JavaScript errors
2. **Verify group membership** is current
3. **Test with different users**

### **Issue: Forms not redirecting**
**Possible Causes:**
- Microsoft Forms URLs incorrect
- Pop-up blockers
- JavaScript errors

**Solutions:**
1. **Check Microsoft Forms URLs** are correct
2. **Disable pop-up blockers**
3. **Check browser console** for errors

## 📊 **Testing Results Template**

### **Test Results Log**
```
Date: ___________
Tester: ___________

Test 1 - Regular User Access:
[ ] Pass [ ] Fail
Notes: ________________________________

Test 2 - Admin User Access:
[ ] Pass [ ] Fail
Notes: ________________________________

Test 3 - Unauthorized User Access:
[ ] Pass [ ] Fail
Notes: ________________________________

Test 4 - Service Button Functionality:
[ ] Pass [ ] Fail
Notes: ________________________________

Test 5 - Logout Functionality:
[ ] Pass [ ] Fail
Notes: ________________________________

Test 6 - Mobile Responsiveness:
[ ] Pass [ ] Fail
Notes: ________________________________

Overall Status: [ ] Ready for Production [ ] Needs Fixes
```

## 🚀 **Ready for Production Checklist**

Before going live, ensure:
- [ ] All tests pass
- [ ] Users are properly assigned to groups
- [ ] Microsoft Forms URLs are correct
- [ ] Portal is deployed to production domain
- [ ] HTTPS is enabled
- [ ] All team members can access and test

## 📞 **Support During Testing**

### **If you encounter issues:**
1. **Check browser console** for JavaScript errors
2. **Verify Azure AD logs** for authentication issues
3. **Test with different users** to isolate problems
4. **Check group memberships** in Microsoft 365 Admin Center

### **Debug Information:**
Add this to browser console for debugging:
```javascript
console.log('Office 365 Config:', window.Office365Auth?.config);
console.log('Current User Role:', currentUserRole);
console.log('Is Authenticated:', window.Office365Auth?.isAuthenticated());
```

---

## 🎉 **You're Ready to Test!**

Your IT HelpDesk Portal is now fully configured and ready for testing. Follow the testing checklist above to validate all functionality before going live.

**Good luck with your testing!** 🚀
