# 🔐 Office 365 Integration Setup Guide

This guide will help you integrate your IT HelpDesk Portal with Office 365 for group-based role access control.

## 📋 Prerequisites

- Office 365 tenant with admin access
- Azure AD (now called Microsoft Entra ID) permissions
- Two Office 365 groups: one for regular users, one for admin users

## 🚀 Step 1: Create Office 365 Groups

### Create Regular Users Group
1. **Go to Microsoft 365 Admin Center**
2. **Navigate to Teams & Groups** → **Active teams & groups**
3. **Click "Add a group"**
4. **Choose "Security group"**
5. **Name**: `IT Portal Regular Users`
6. **Description**: `Users with access to basic IT services (Shared Mailbox, DL Modification, Application Access)`
7. **Click "Add"**

### Create Admin Users Group
1. **Repeat the above steps**
2. **Name**: `IT Portal Admin Users`
3. **Description**: `Users with access to all IT services including Onboarding and Offboarding`
4. **Click "Add"**

### Add Users to Groups
1. **Select each group**
2. **Click "Members"**
3. **Add users** to appropriate groups based on their role

## 🔧 Step 2: Create Azure AD App Registration

### Create App Registration
1. **Go to Azure Portal** (portal.azure.com)
2. **Navigate to Azure Active Directory** → **App registrations**
3. **Click "New registration"**
4. **Name**: `IT HelpDesk Portal`
5. **Supported account types**: `Accounts in this organizational directory only`
6. **Redirect URI**: `Web` → `https://yourdomain.com/auth-callback.html`
7. **Click "Register"**

### Configure API Permissions
1. **In your app registration**, go to **API permissions**
2. **Click "Add a permission"**
3. **Select "Microsoft Graph"**
4. **Choose "Delegated permissions"** ⚠️ **IMPORTANT: Use Delegated permissions, NOT Application permissions**
5. **Add these permissions**:
   - `User.Read` - Allows the app to read the signed-in user's profile
   - `GroupMember.Read.All` - Allows the app to read group memberships for all groups
   - `Group.Read.All` - Allows the app to read all groups in the organization
6. **Click "Grant admin consent"** (requires admin privileges)

**⚠️ Permission Type Clarification:**
- **Delegated permissions**: The app acts on behalf of the signed-in user (what we need)
- **Application permissions**: The app acts as itself (not needed for this use case)

### Create Client Secret (Optional)
1. **Go to "Certificates & secrets"**
2. **Click "New client secret"**
3. **Description**: `IT Portal Secret`
4. **Expires**: Choose appropriate duration
5. **Click "Add"**
6. **Copy the secret value** (you won't see it again)

## ⚙️ Step 3: Configure the Portal

### Update Configuration Files

#### 1. Update `office365-auth.js`
The configuration is already updated with your IDs:

```javascript
const OFFICE365_CONFIG = {
    // Your Azure AD App Registration details
    clientId: '7a572b71-a735-4852-92af-65931deaa38d', // ✅ Already configured
    tenantId: '80f3b31b-5dc9-4605-a654-5ad7e6e5417c', // ✅ Already configured
    
    // Office 365 Group IDs for role assignment
    groups: {
        regularUsers: '7342e17a-7542-40bd-a192-f7bdc2977328', // ✅ Regular users group ID
        adminUsers: '827141a0-a9a7-4d4a-8888-0fc0ede8440e'      // ✅ Admin users group ID
    },
    
    // Update redirect URI to match your domain
    redirectUri: 'https://yourdomain.com/auth-callback.html'
};
```

#### 2. Update `auth-callback.html`
The configuration is already updated with your IDs:

```javascript
const msalConfig = {
    auth: {
        clientId: '7a572b71-a735-4852-92af-65931deaa38d', // ✅ Already configured
        authority: 'https://login.microsoftonline.com/80f3b31b-5dc9-4605-a654-5ad7e6e5417c', // ✅ Already configured
        redirectUri: 'https://yourdomain.com/auth-callback.html' // Update with your domain
    }
};
```

#### 3. Enable Office 365 Integration
In `script.js`, change:

```javascript
let isOffice365Enabled = true; // Set to true to enable Office 365 integration
```

## 🔍 Step 4: Get Required IDs

### Get Tenant ID
1. **Go to Azure Portal**
2. **Azure Active Directory** → **Overview**
3. **Copy the "Tenant ID"**

### Get Client ID
1. **Go to your app registration**
2. **Copy the "Application (client) ID"**

### Get Group IDs
✅ **Group IDs are already configured:**
- **Regular Users Group ID**: `7342e17a-7542-40bd-a192-f7bdc2977328`
- **Admin Users Group ID**: `827141a0-a9a7-4d4a-8888-0fc0ede8440e`

*Note: If you need to get group IDs in the future:*
1. **Go to Microsoft 365 Admin Center**
2. **Teams & Groups** → **Active teams & groups**
3. **Click on each group**
4. **Copy the Group ID** from the URL or properties

## 🧪 Step 5: Test the Integration

### Test Regular User Access
1. **Add a test user** to the "IT Portal Regular Users" group
2. **Open the portal** in an incognito window
3. **Sign in** with the test user's Office 365 account
4. **Verify** only 3 services are visible:
   - Shared Mailbox Access
   - DL Modification
   - Application Access

### Test Admin User Access
1. **Add a test user** to the "IT Portal Admin Users" group
2. **Open the portal** in an incognito window
3. **Sign in** with the test user's Office 365 account
4. **Verify** all 5 services are visible

## 🔒 Step 6: Security Considerations

### Group Membership Security
- **Regularly audit** group memberships
- **Use least privilege principle** - only add users who need access
- **Monitor access logs** for unauthorized attempts

### App Registration Security
- **Rotate client secrets** regularly
- **Use certificate-based authentication** for production
- **Limit API permissions** to only what's needed
- **Enable conditional access** policies if available

### Network Security
- **Use HTTPS** for all communications
- **Implement proper CORS** policies
- **Consider IP restrictions** for admin access

## 🚨 Troubleshooting

### Common Issues

#### "User not authorized" Error
- **Check group membership** in Office 365
- **Verify group IDs** in configuration
- **Ensure user is in correct group**

#### Login Redirect Issues
- **Verify redirect URI** matches exactly
- **Check HTTPS** requirement
- **Ensure domain** is registered in Azure AD

#### API Permission Errors
- **Grant admin consent** for all permissions
- **Check permission scope** (delegated vs application)
- **Verify tenant** has required licenses

#### Group ID Not Found
- **Use PowerShell** to get exact group IDs:
  ```powershell
  Get-MgGroup -Filter "displayName eq 'IT Portal Regular Users'"
  Get-MgGroup -Filter "displayName eq 'IT Portal Admin Users'"
  ```

### Debug Mode
Enable debug logging by adding to `office365-auth.js`:

```javascript
// Add this for debugging
console.log('Office 365 Config:', OFFICE365_CONFIG);
console.log('User Groups:', userGroups);
console.log('User Role:', role);
```

## 📊 Step 7: Monitoring and Maintenance

### Regular Tasks
- **Audit group memberships** monthly
- **Review access logs** for anomalies
- **Update client secrets** before expiration
- **Test authentication** after any changes

### Monitoring Tools
- **Azure AD Sign-in logs**
- **Microsoft 365 audit logs**
- **Application insights** (if configured)

## 🔄 Step 8: Advanced Configuration

### Custom Claims (Optional)
Add custom claims to include additional user information:

```javascript
// In office365-auth.js, modify the login request
const loginRequest = {
    scopes: OFFICE365_CONFIG.scopes,
    prompt: 'select_account',
    extraQueryParameters: {
        'claims': JSON.stringify({
            "id_token": {
                "groups": {
                    "essential": true
                }
            }
        })
    }
};
```

### Conditional Access (Optional)
Configure conditional access policies in Azure AD for additional security:
- **Require MFA** for admin access
- **Block access** from untrusted locations
- **Require compliant devices**

## 📞 Support

### Getting Help
1. **Check Azure AD logs** for authentication issues
2. **Review browser console** for JavaScript errors
3. **Test with different users** to isolate issues
4. **Contact your Azure AD administrator** for permission issues

### Useful Resources
- [Microsoft Graph API Documentation](https://docs.microsoft.com/en-us/graph/)
- [MSAL.js Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications)
- [Azure AD App Registration Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

---

**Important**: Always test the integration in a development environment before deploying to production. Keep your configuration secure and never commit secrets to version control.
