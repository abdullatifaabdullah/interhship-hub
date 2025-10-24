# InternHub Frontend UI

A modern, responsive web interface for the InternHub internship management platform built with HTML, CSS, JavaScript, and Tailwind CSS.

## 🎨 Features

### ✨ Design & UX
- **Modern Minimalist Design** - Clean, professional interface
- **Dark/Light Theme Toggle** - Seamless theme switching with system preference detection
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Custom Color Scheme** - Carefully selected colors for both light and dark themes
- **Smooth Animations** - Subtle transitions and hover effects throughout

### 🔐 Authentication System
- **Student Signup** - Complete registration form with validation
- **Admin Signup** - Admin account creation with access code verification
- **Login System** - Secure authentication with role-based access
- **Form Validation** - Real-time validation with error messages

### 👨‍🎓 Student Features
- **Dashboard** - Overview of applications and quick actions
- **Browse Internships** - Search, filter, and view available opportunities
- **Application Management** - Track application status and history
- **CV Upload** - Drag-and-drop file upload with validation

### 👨‍💼 Admin Features
- **Admin Dashboard** - System overview and management tools
- **Internship Management** - Create, edit, and manage internship postings
- **Application Review** - Review and approve/reject student applications
- **Analytics** - View application statistics and trends

### 👑 Owner Features
- **Owner Dashboard** - System-wide analytics and admin management
- **Admin Management** - Create, edit, and manage admin accounts
- **System Overview** - Platform statistics and activity monitoring

### 🛠️ Technical Features
- **API Integration** - Real API calls with fallback mock data
- **Loading States** - Smooth loading indicators throughout
- **Toast Notifications** - User feedback for all actions
- **Error Handling** - Graceful error states and recovery
- **Search & Filtering** - Advanced search capabilities
- **File Upload** - CV/resume upload with validation

## 📁 Project Structure

```
frontend/
├── index.html                          # Main HTML file
├── shared/
│   ├── api.js                         # API client and utilities
│   ├── utils.js                       # Utility functions
│   ├── components.js                  # Reusable UI components
│   ├── cv-upload.js                   # CV upload component
│   └── cv-upload.css                  # CV upload styles
├── auth/
│   ├── login.js                       # Login page logic
│   ├── login.css                      # Login page styles
│   ├── signup-student.js              # Student signup logic
│   ├── signup-student.css             # Student signup styles
│   ├── signup-admin.js                # Admin signup logic
│   └── signup-admin.css               # Admin signup styles
├── student/
│   ├── dashboard.js                   # Student dashboard
│   ├── dashboard.css                  # Student dashboard styles
│   ├── browse-internships.js          # Browse internships page
│   ├── browse-internships.css         # Browse internships styles
│   ├── applications.js                # Applications management
│   └── applications.css                # Applications styles
├── admin/
│   ├── dashboard.js                   # Admin dashboard
│   ├── dashboard.css                  # Admin dashboard styles
│   ├── manage-internships.js          # Internship management
│   ├── manage-internships.css         # Internship management styles
│   ├── applications.js                # Application management
│   └── applications.css                # Application management styles
└── owner/
    ├── dashboard.js                   # Owner dashboard
    ├── dashboard.css                  # Owner dashboard styles
    ├── manage-admins.js               # Admin management
    └── manage-admins.css              # Admin management styles
```

## 🎨 Color Scheme

### Light Theme
- **Primary**: Deep Blue (#2563EB) - Buttons, links, highlights
- **Secondary**: Warm Gray (#6B7280) - Text, icons
- **Accent**: Emerald Green (#10B981) - Success states
- **Warning**: Amber (#F59E0B) - Warnings, pending states
- **Danger**: Rose Red (#EF4444) - Errors, rejections
- **Background**: Off-White (#F9FAFB) - Main background
- **Surface**: White (#FFFFFF) - Cards, panels

### Dark Theme
- **Primary**: Sky Blue (#3B82F6) - Buttons, highlights
- **Secondary**: Slate Gray Light (#9CA3AF) - Text, icons
- **Accent**: Emerald Green Light (#34D399) - Success states
- **Warning**: Amber Light (#FBBF24) - Warnings
- **Danger**: Red Light (#F87171) - Errors
- **Background**: Charcoal Black (#111827) - Main background
- **Surface**: Deep Gray (#1F2937) - Cards, panels

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Installation
1. Clone or download the frontend files
2. Open `index.html` in a web browser
3. For development, serve files through a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### Configuration
- **API Base URL**: Update `API_BASE_URL` in `shared/api.js` to point to your backend
- **Theme**: Default theme is auto-detected from system preference
- **File Upload**: Configure allowed file types and sizes in `shared/cv-upload.js`

## 🔧 API Integration

The frontend is designed to work with your FastAPI backend. Key integration points:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup/student` - Student registration
- `POST /api/auth/signup/admin` - Admin registration

### Internship Endpoints
- `GET /api/internships/public` - Browse internships
- `POST /api/internships/create` - Create internship
- `PUT /api/internships/{id}` - Update internship
- `DELETE /api/internships/{id}` - Delete internship

### Application Endpoints
- `GET /api/applications/my` - Student applications
- `GET /api/applications/admin` - All applications (admin)
- `POST /api/applications/apply` - Apply to internship
- `PUT /api/applications/{id}/status` - Update application status

### Owner Endpoints
- `GET /api/owner/dashboard` - Dashboard data
- `GET /api/owner/admins` - List admins
- `POST /api/owner/admins` - Create admin
- `DELETE /api/owner/admins/{id}` - Delete admin

## 🎯 Key Features

### Theme System
- Automatic dark/light theme detection
- Smooth transitions between themes
- Persistent theme preference
- System preference integration

### Component Library
- Reusable UI components
- Consistent styling across pages
- Toast notification system
- Modal dialogs
- Status badges
- Loading spinners

### File Upload
- Drag-and-drop interface
- File type validation
- Size limit enforcement
- Preview functionality
- Error handling

### Search & Filtering
- Real-time search
- Multiple filter options
- Debounced input handling
- Sort functionality
- Clear filters option

## 📱 Responsive Design

The interface is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- Input validation and sanitization
- File type verification
- Size limit enforcement
- XSS protection
- CSRF token handling (when integrated with backend)

## 🎨 Customization

### Colors
Update the color scheme in `index.html`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: { /* your colors */ },
                // ... other colors
            }
        }
    }
}
```

### Components
Modify component behavior in `shared/components.js`:
- Toast notifications
- Modal dialogs
- Status badges
- Loading states

### Styling
Customize styles by editing the CSS files in each module directory.

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check API_BASE_URL in `shared/api.js`
   - Ensure backend server is running
   - Check CORS settings

2. **Theme Not Persisting**
   - Check browser localStorage support
   - Clear browser cache and cookies

3. **File Upload Issues**
   - Check file size limits
   - Verify allowed file types
   - Ensure proper file permissions

4. **Styling Issues**
   - Check Tailwind CSS CDN connection
   - Verify custom CSS is loading
   - Check for CSS conflicts

## 📈 Performance

- Optimized bundle size
- Lazy loading for large components
- Efficient DOM manipulation
- Minimal external dependencies
- Compressed assets

## 🔄 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics charts
- [ ] Bulk operations
- [ ] Export functionality
- [ ] Advanced search filters
- [ ] Mobile app integration
- [ ] Offline support
- [ ] Progressive Web App features

## 📄 License

This project is part of the InternHub platform. All rights reserved.

## 🤝 Contributing

1. Follow the existing code style
2. Test all functionality thoroughly
3. Ensure responsive design
4. Update documentation as needed

## 📞 Support

For technical support or questions about the frontend implementation, please refer to the main project documentation or contact the development team.

---

**Built with ❤️ for InternHub Platform**
