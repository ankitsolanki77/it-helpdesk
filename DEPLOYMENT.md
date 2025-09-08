# 🚀 GitHub Deployment Guide for IT HelpDesk Portal

This guide will walk you through creating a GitHub repository and deploying your IT HelpDesk Portal using GitHub Pages.

## 📋 Prerequisites

- GitHub account (create one at [github.com](https://github.com) if you don't have one)
- Your IT HelpDesk Portal files ready
- Basic understanding of Git (optional, we'll guide you through everything)

## 🎯 Step 1: Create GitHub Repository

### Option A: Using GitHub Web Interface (Recommended for beginners)

1. **Go to GitHub.com** and sign in to your account

2. **Click the "+" icon** in the top-right corner and select "New repository"

3. **Fill in repository details**:
   - **Repository name**: `it-helpdesk-portal` (or your preferred name)
   - **Description**: `IT HelpDesk Portal - A modern web portal for IT service requests`
   - **Visibility**: Choose "Public" (required for free GitHub Pages)
   - **Initialize repository**: 
     - ✅ Add a README file
     - ✅ Add .gitignore (select "Node" template)
     - ✅ Choose a license (MIT recommended)

4. **Click "Create repository"**

### Option B: Using GitHub CLI (For advanced users)

```bash
# Install GitHub CLI first, then run:
gh repo create it-helpdesk-portal --public --description "IT HelpDesk Portal - A modern web portal for IT service requests"
```

## 📁 Step 2: Upload Your Files

### Option A: Using GitHub Web Interface

1. **Navigate to your new repository**

2. **Delete the default README.md** (we'll replace it with ours)

3. **Click "Add file" → "Upload files"**

4. **Drag and drop these files**:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md` (our custom one)
   - `.gitignore`

5. **Add commit message**: "Initial commit: Add IT HelpDesk Portal files"

6. **Click "Commit changes"**

### Option B: Using Git Command Line

```bash
# Clone your repository locally
git clone https://github.com/YOUR_USERNAME/it-helpdesk-portal.git
cd it-helpdesk-portal

# Copy your files to this directory
# (Copy index.html, styles.css, script.js, README.md, .gitignore)

# Add files to Git
git add .

# Commit changes
git commit -m "Initial commit: Add IT HelpDesk Portal files"

# Push to GitHub
git push origin main
```

## 🌐 Step 3: Enable GitHub Pages

1. **Go to your repository** on GitHub

2. **Click on "Settings"** tab (at the top of your repository)

3. **Scroll down to "Pages"** section in the left sidebar

4. **Under "Source"**:
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Select "/ (root)" folder

5. **Click "Save"**

6. **Wait 2-3 minutes** for GitHub to build your site

7. **Your site will be available at**:
   ```
   https://YOUR_USERNAME.github.io/it-helpdesk-portal
   ```

## ✅ Step 4: Verify Deployment

1. **Visit your GitHub Pages URL**
2. **Test all 5 service buttons** to ensure they redirect correctly
3. **Check mobile responsiveness** on different devices
4. **Verify all styling** loads properly

## 🔧 Step 5: Custom Domain (Optional)

If you want to use a custom domain:

1. **In GitHub Pages settings**, add your custom domain
2. **Create a CNAME file** in your repository root:
   ```
   your-domain.com
   ```
3. **Update your DNS settings** to point to GitHub Pages

## 📝 Step 6: Repository Configuration

### Add Repository Topics
1. Go to your repository
2. Click the gear icon next to "About"
3. Add topics: `it-portal`, `helpdesk`, `microsoft-forms`, `web-portal`

### Update Repository Description
```
A modern, responsive IT HelpDesk Portal for Microsoft Forms integration. Features onboarding, offboarding, shared mailbox access, DL modifications, and application access requests.
```

## 🔄 Step 7: Making Updates

### To update your portal:

1. **Edit files locally** or directly on GitHub
2. **Commit changes** with descriptive messages
3. **Push to main branch**
4. **GitHub Pages automatically updates** within 2-3 minutes

### Example update workflow:
```bash
# Make your changes to files
git add .
git commit -m "Update: Add new service or fix styling"
git push origin main
```

## 🛠️ Troubleshooting

### Common Issues:

**Pages not loading:**
- Check that all files are in the root directory
- Ensure `index.html` is present
- Wait 5-10 minutes for initial deployment

**Styling not working:**
- Verify `styles.css` is uploaded
- Check file paths in HTML
- Clear browser cache

**Forms not redirecting:**
- Verify URLs in `data-url` attributes
- Test URLs in new browser tab
- Check for typos in URLs

**Mobile issues:**
- Test on actual devices
- Use browser developer tools
- Check responsive CSS

## 📊 Step 8: Analytics and Monitoring

### Add Google Analytics (Optional):
1. Get Google Analytics tracking code
2. Add to `<head>` section of `index.html`
3. Commit and push changes

### Monitor Usage:
- GitHub provides basic traffic statistics
- Check repository Insights → Traffic
- Monitor form submissions in Microsoft Forms

## 🔒 Security Considerations

- **HTTPS**: GitHub Pages automatically provides SSL
- **Public Repository**: Your code is visible to everyone
- **Form URLs**: Keep Microsoft Forms URLs secure
- **No Sensitive Data**: Don't store passwords or API keys

## 📞 Support

If you encounter issues:

1. **Check GitHub Status**: [status.github.com](https://status.github.com)
2. **GitHub Documentation**: [docs.github.com](https://docs.github.com)
3. **GitHub Community**: [github.community](https://github.community)

## 🎉 Success!

Your IT HelpDesk Portal is now live and accessible to your organization! Share the GitHub Pages URL with your team and start receiving IT service requests through Microsoft Forms.

---

**Next Steps:**
- Share the portal URL with your organization
- Monitor usage and gather feedback
- Consider adding more services as needed
- Set up regular backups of your repository
