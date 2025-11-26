# Lostify

## 🎯 Overview

**Lostify** is a secure, full-stack Lost and Found portal built exclusively for **Scaler School of Technology (SST)** students. It provides a centralized platform where students can report lost items, post found items, and reconnect with their belongings through intelligent matching and seamless communication.

## ✨ Key Features

### 📝 Post Management
- **Create Posts**: Users can report lost or found items with detailed information including photos, descriptions, locations, categories, and contact details
- **My Posts Dashboard**: Manage all your posts in one place—edit details, mark items as resolved, or delete posts
- **Image Upload**: Attach clear photos to help identify items quickly

### 🤖 Smart Matching System
- Automatic matching algorithm analyzes similarities between lost and found posts
- Matches based on title, description, category, location, and date
- **My Matches**: View all potential matches for your posts in a dedicated section
- Instant notifications when potential matches are found

### 💬 Secure Communication
- **WhatsApp Integration**: Contact other users directly through WhatsApp with pre-filled messages
- **Privacy-First**: Contact numbers are only visible to users with matched items
- One-click communication buttons on post cards and detail modals

### 🔐 Verified Access
- **SST Email Authentication**: Login restricted to `@sst.scaler.com` email addresses only
- Email verification ensures only genuine SST students can access the platform
- Secure session management with JWT tokens

### 📊 Admin Dashboard
- **Analytics Overview**: Track total users, active posts, resolved items, and platform engagement
- **User Management**: View and manage all registered users
- **Feedback System**: Review user feedback and suggestions
- **CSV Export**: Download user and post data for reporting purposes
- **Content Moderation**: Monitor and manage all posts across the platform

### 🎨 Modern User Experience
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Smooth Animations**: Framer Motion for polished interactions
- **Interactive Modals**: Full-screen item detail views with image carousels
- **Advanced Filtering**: Filter posts by type (Lost/Found), category, location, and date range

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Elegant notifications
- **React Icons** - Material Design icons

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **SQLite** - Lightweight relational database
- **JWT** - Secure authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud-based image storage

### Deployment
- Modern cloud hosting platforms for frontend and backend
- Automated CI/CD pipeline
- Environment-based configuration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeeKush/Lostify.git
   cd Lostify
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   - Create `.env` files in both `backend` and `frontend` directories
   - Configure required environment variables (contact admin for details)

4. **Initialize the database**
   ```bash
   cd backend
   node database/initDb.js
   ```

5. **Run the development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## 📱 Usage

1. **Register/Login** with your `@sst.scaler.com` email
2. **Verify your email** through the link sent to your inbox
3. **Post an item** by clicking "Post Item" and filling in the details
4. **Browse** lost and found items on the Dashboard
5. **View matches** in the "My Matches" section
6. **Contact users** via WhatsApp when you find a match
7. **Manage your posts** from "My Posts" section
8. **Mark items as resolved** once reunited

## 🔒 Security & Privacy

- Email verification required for all users
- SST domain restriction (`@sst.scaler.com`)
- Secure password hashing with bcrypt
- JWT-based session management
- Contact information visible only to matched users
- HTTPS encryption in production
- Input validation and sanitization
- Protected admin routes

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is built for educational purposes as part of the Scaler School of Technology community.

## 👥 Authors

- **DeeKush** - [GitHub Profile](https://github.com/DeeKush)

## 🙏 Acknowledgments

- Scaler School of Technology for the inspiration
- SST student community for feedback and testing
- Open-source libraries and frameworks used in this project

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Use the in-app Feedback feature
- Contact the development team

---

**Made with ❤️ for the SST Community**

