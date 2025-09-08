# IT HelpDesk Portal

A modern, user-friendly web portal for IT service requests in your organization. This portal provides easy access to Microsoft Forms for various IT services including onboarding, offboarding, shared mailbox access, distribution list modifications, and application access requests.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design with responsive layout
- **Easy Navigation**: Intuitive card-based interface for different IT services
- **Direct Integration**: Seamless redirects to Microsoft Forms
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Accessibility**: Built with accessibility best practices
- **Fast Loading**: Optimized for quick loading and smooth user experience

## 📋 Available Services

1. **Onboarding** - Request access for new employees
2. **Offboarding** - Process access removal for departing employees
3. **Shared Mailbox Access** - Request access to shared mailboxes and distribution lists
4. **DL Modification** - Request changes to distribution lists and group memberships
5. **Application Access** - Request access to business applications and software

## 🛠️ Technology Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and form redirects
- **Font Awesome** - Professional icons
- **No Dependencies** - Pure vanilla web technologies for fast loading

## 📁 Project Structure

```
IT HelpDesk Portal/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- A web server (for local development) or web hosting service
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or download** this repository to your local machine
2. **Upload files** to your web server or hosting service
3. **Access** the portal through your web browser

### Local Development

1. **Download** all files to a local directory
2. **Open** `index.html` in your web browser
3. **Or** use a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

## 🌐 Deployment Options

### GitHub Pages

1. **Create** a new GitHub repository
2. **Upload** all files to the repository
3. **Enable** GitHub Pages in repository settings
4. **Access** your portal at `https://yourusername.github.io/repository-name`

### Other Hosting Services

- **Netlify**: Drag and drop the folder or connect your GitHub repository
- **Vercel**: Import your GitHub repository
- **AWS S3**: Upload files to an S3 bucket with static website hosting
- **Azure Static Web Apps**: Deploy directly from GitHub

## ⚙️ Configuration

### Updating Form URLs

To update the Microsoft Forms URLs, edit the `data-url` attributes in `index.html`:

```html
<div class="service-card" data-url="YOUR_NEW_FORM_URL">
```

### Customizing Styling

Modify `styles.css` to customize:
- Colors and gradients
- Fonts and typography
- Layout and spacing
- Animations and transitions

### Adding New Services

1. **Add** a new service card in `index.html`:
```html
<div class="service-card" data-url="YOUR_FORM_URL">
    <div class="service-icon">
        <i class="fas fa-your-icon"></i>
    </div>
    <h3>Your Service Name</h3>
    <p>Service description</p>
    <button class="service-btn" onclick="redirectToForm(this)">
        <span>Start Request</span>
        <i class="fas fa-arrow-right"></i>
    </button>
</div>
```

2. **Update** the grid layout in `styles.css` if needed

## 🔧 Customization

### Branding

- **Logo**: Replace the header icon with your organization's logo
- **Colors**: Update the CSS color variables to match your brand
- **Title**: Change the portal title and subtitle in `index.html`

### Functionality

- **Analytics**: Uncomment and configure Google Analytics tracking in `script.js`
- **Notifications**: Customize notification messages and styling
- **Loading States**: Modify loading animations and timing

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔒 Security Considerations

- All form URLs are external Microsoft Forms links
- No sensitive data is stored locally
- HTTPS recommended for production deployment
- Consider adding authentication if needed

## 📈 Performance

- **Lightweight**: Total bundle size under 50KB
- **Fast Loading**: Optimized CSS and JavaScript
- **Caching**: Static files can be cached by CDNs
- **Mobile Optimized**: Responsive design for all devices

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For issues or questions:
1. Check the [Issues](https://github.com/yourusername/it-helpdesk-portal/issues) page
2. Create a new issue with detailed description
3. Contact your IT administrator for form-related issues

## 🔄 Version History

- **v1.0.0** - Initial release with 5 core IT services
- **v1.1.0** - Added mobile responsiveness and accessibility improvements
- **v1.2.0** - Enhanced UI with animations and better UX

## 📞 Contact

For technical support or customization requests, please contact your IT department.

---

**Made with ❤️ for your organization's IT needs**
