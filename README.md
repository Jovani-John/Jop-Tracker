## 🌟 Overview

**JobTracker** is a cutting-edge job application tracking system designed for job seekers who want to stay organized throughout their job search journey. With a stunning UI, smooth animations, and powerful features, JobTracker makes managing job applications a delightful experience.

### Why JobTracker?

- 🎨 **Beautiful Design**: Modern, professional UI with smooth animations
- 🔐 **Multi-User Support**: Each user has their own private dashboard
- 💾 **Local First**: All data stored securely in your browser
- 📧 **Email Notifications**: Get instant alerts for new signups and logins
- 📱 **Fully Responsive**: Works seamlessly on all devices
- 🚀 **No Backend Required**: Pure frontend application

---

## ✨ Features

### 🔑 Authentication System
- ✅ User Sign Up with validation
- ✅ User Login with secure authentication
- ✅ User Profile display in Navbar
- ✅ Sign Out functionality
- ✅ Protected routes for authenticated users only

### 📊 Job Management
- ✅ Add new job applications
- ✅ Edit existing applications
- ✅ Delete applications with confirmation
- ✅ View detailed job information
- ✅ Filter by status (Applied, Interviewing, Offer, Rejected)
- ✅ Statistics dashboard with counts

### 💫 User Experience
- ✅ Smooth animations with Framer Motion
- ✅ Glass morphism effects
- ✅ Gradient backgrounds
- ✅ Loading states and skeletons
- ✅ Success/Error notifications
- ✅ Empty state designs
- ✅ Responsive mobile menu

### 📤 Data Management
- ✅ Export jobs as JSON
- ✅ Import jobs from JSON
- ✅ Per-user data isolation
- ✅ Persistent storage with localStorage

### 📧 Email Notifications
- ✅ Admin email on user signup
- ✅ Admin email on user login
- ✅ Detailed user information in emails
- ✅ Timestamp of actions

---

## 🎬 Demo

### Live Features

```bash
# Try these features:
1. Sign Up → Creates account + sends email notification
2. Add Jobs → Track your applications
3. Filter Jobs → By status
4. Export/Import → Backup your data
5. Edit/Delete → Manage applications
6. Sign Out → Switch users
```

---
## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/jobtracker.git
cd jobtracker
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure email notifications** (Optional)

Open `src/services/EmailService.js` and update the access key:
```javascript
const WEB3FORMS_ACCESS_KEY = "your-access-key-here";
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
```
http://localhost:5173
```

---

## 💻 Usage

### Creating an Account

1. Click **"Sign Up"** in the navbar
2. Fill in your name, email, and password
3. Click **"Sign Up"** button
4. Admin receives an email notification
5. You're automatically logged in!

### Adding a Job Application

1. Navigate to **"Add Job"**
2. Fill in the job details:
   - Company Name
   - Job Title
   - Status (Applied/Interviewing/Offer/Rejected)
   - Applied Date
   - Notes (optional)
3. Click **"Add Job Application"**

### Managing Applications

- **View Details**: Click on any job card
- **Edit**: Click on a job → Edit details → Update
- **Delete**: Click on a job → Delete button → Confirm
- **Filter**: Use status tabs on dashboard
- **Export**: Click "Export" button → Downloads JSON
- **Import**: Click "Import" button → Select JSON file

### User Management

- **View Profile**: Your name appears in the navbar
- **Sign Out**: Click your name → Sign Out
- **Switch Users**: Sign out and login with different account

---

## 🛠️ Tech Stack

### Core
- **React** (19.1.1) - UI Library
- **Vite** (7.1.7) - Build Tool
- **React Router DOM** (7.9.5) - Routing

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** (12.23.24) - Animations

### Utilities
- **UUID** (13.0.0) - Unique ID generation
- **Web3Forms API** - Email notifications

### Storage
- **localStorage** - Client-side data persistence

---

## 📁 Project Structure

```
jobtracker/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── JobCard.jsx
│   │   ├── JobForm.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── JobContext.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AddJob.jsx
│   │   ├── Dashboard.jsx
│   │   ├── JobDetailsPage.jsx
│   │   ├── Login.jsx
│   │   └── SignUp.jsx
│   ├── services/
│   │   └── EmailService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

---
JobTracker uses **Web3Forms** to send email notifications to admins.

### Setup

1. Get your access key from [Web3Forms](https://web3forms.com)
2. Update `src/services/EmailService.js`:
```javascript
const WEB3FORMS_ACCESS_KEY = "your-key-here";
```

### Email Templates

#### Sign Up Notification
```
Subject: 🎉 New User Registration - JobTracker

Hello Admin,

A new user has registered on JobTracker:

👤 Name: John Doe
📧 Email: john@example.com
📅 Registration Date: [timestamp]
```

#### Login Notification
```
Subject: 🔐 User Login Alert - JobTracker

Hello Admin,

A user has logged into JobTracker:

👤 Name: John Doe
📧 Email: john@example.com
📅 Login Time: [timestamp]
```

---

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist/` folder, ready for deployment.

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## 🔒 Security Notes

- **Passwords**: In production, use proper password hashing (bcrypt, argon2)
- **Authentication**: Consider using JWT or session-based auth for production
- **Email**: Validate email addresses server-side
- **Data**: Current implementation uses localStorage (client-side only)

---

## 🎨 Customization

### Colors

Update Tailwind classes in components:
```jsx
// From blue to purple
className="bg-gradient-to-r from-blue-600 to-indigo-600"
// To
className="bg-gradient-to-r from-purple-600 to-pink-600"
```

### Animations

Modify Framer Motion animations:
```jsx

```

---

## 🐛 Known Issues

- Email notifications require internet connection
- localStorage has 5-10MB limit per domain
- No server-side validation (client-side only)

---

## 🔮 Future Enhancements

- [ ] Backend integration (Node.js/Express)
- [ ] Database support (MongoDB/PostgreSQL)
- [ ] Real-time collaboration
- [ ] Job search API integration
- [ ] Resume upload and management
- [ ] Interview scheduling
- [ ] Salary tracking
- [ ] Company research notes
- [ ] Email reminders
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use ES6+ features
- Follow React best practices
- Write clean, readable code
- Add comments for complex logic
- Use meaningful variable names

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Web3Forms](https://web3forms.com/) - Email Service
- [Vite](https://vitejs.dev/) - Build Tool
- Icons: Emoji Unicode Characters

---

## 📞 Contact

Have questions or suggestions? Feel free to reach out!

- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- **Website**: [yourwebsite.com](https://yourwebsite.com)

---

## ⭐ Support

If you find this project helpful, please give it a star ⭐️

[![GitHub stars](https://img.shields.io/github/stars/yourusername/jobtracker?style=social)](https://github.com/yourusername/jobtracker)

---

<div align="center">

**Made with ❤️ by Jovani**
