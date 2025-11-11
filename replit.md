# Lostify - Full-Stack Lost & Found Application

## Overview
Lostify is a modern full-stack Lost & Found web application built exclusively for Scaler School of Technology students. It facilitates posting of lost/found items, enables efficient searching with smart matching, and connects verified SST students to help reunite individuals with their belongings. The platform features role-based navigation, comprehensive settings system, smooth UI animations, and SST-branded experience.

## Recent Changes
- **2025-11-10 (Dynamic Avatar & Premium Animations)**: Replaced generic profile icon with personalized avatar system and refined navbar animations
  - **Dynamic Avatar System**: Circular avatar displaying first letter of username/email in yellow (#F8C538) circle with navy (#1E2A45) text
  - **Google OAuth Profile Pictures**: Automatic display of Google profile pictures with 2px yellow border when available
  - **Avatar Fallback**: Defaults to 'U' if no username/email available, ensuring always-visible avatar
  - **Premium Navbar Animation**: Smooth slide-down entrance (y: -60→0, opacity: 0→1, 0.5s easeOut) with subtle shadow-md
  - **Nav Link Micro-interactions**: Hover effects on navigation links (scale 1.05, y: -1) with 0.15s transitions
  - **Code Optimization**: Removed unused FaUserCircle import, cleaner avatar conditional rendering
- **2025-11-10 (Brand Identity & UX Refinement)**: Integrated official Lostify logo and reorganized navigation with profile dropdown
  - **Official Logo Integration**: Lostify logo added to Navbar (clickable, navigates to home/dashboard), Login page, Signup page, and Footer
  - **Profile Dropdown Menu**: Modern dropdown in top-right with dropdown showing username, email, Settings, and Logout options
  - **Navbar Reorganization**: Clean layout - Logo + Admin badge | Nav Links | Dark Mode Toggle + Profile Avatar
  - **Settings Removed from Nav**: Settings link moved from main navigation to profile dropdown for cleaner UI
  - **Responsive Logo Scaling**: h-8 sm:h-10 in navbar, h-16 sm:h-20 on auth pages, h-8 in footer
  - **Framer Motion Animations**: Hover effects on logo and profile avatar, smooth dropdown fade/slide transitions
  - **Click-Outside Detection**: Profile dropdown closes when clicking outside for better UX
- **2025-11-10 (Production Finalization)**: Enhanced error handling, toast notifications, and UX polish
  - **Error Handling**: All admin pages (Dashboard, Users, Analytics) now display error states with retry buttons when API calls fail
  - **Retry Functionality**: Retry buttons re-fetch data after 300ms delay without page reload, providing smooth recovery from failures
  - **Loading States**: Professional loading spinners with descriptive messages on all admin pages
  - **Toast Notifications**: Redesigned with solid brand colors (Navy #1E2A45 default, Green #10B981 success, Red #EF4444 error, Yellow #F8C538 loading) for crisp, readable alerts
  - **Footer Scroll-to-Top**: All footer links smoothly scroll to top of page when clicked for seamless navigation
  - **Session Management**: All admin axios calls include withCredentials: true for proper authentication
- **2025-11-10 (Admin Dashboard Restructure)**: Fixed routing issues and created professional analytics dashboard
  - **New AdminDashboard**: Summary cards showing Total Users, Active Posts, Resolved Items, and Feedback Reports with colorful gradients
  - **Admin Routes Reorganized**: All admin pages now use `/admin/*` prefix (Dashboard→/admin/dashboard, Browse→/admin/browse, Users→/admin/users, Analytics→/admin/analytics, Feedback→/admin/feedback)
  - **Removed Reports Tab**: Simplified admin navigation by removing unused Reports page
  - **Enhanced Analytics Endpoint**: Backend `/api/admin/analytics` now returns comprehensive metrics including totalUsers, activePosts, resolvedPosts, totalFeedback, lostCount, foundCount
  - **Fixed Routing**: Corrected navigation issues where Dashboard showed Browse Items and Browse Items showed Analytics
- **2025-11-10 (In-App Feedback System)**: Replaced email-based contact with database-backed feedback management
  - **Feedback System**: In-app feedback stored in Replit Database with Pending/Resolved status tracking
  - **Admin Feedback Page**: Dedicated admin page at `/admin/feedback` with filtering (All/Pending/Resolved), status management, and delete functionality
  - **Notification Badge**: Yellow notification badge in admin navbar shows pending feedback count, auto-refreshes every 30 seconds
  - **ContactModal Updated**: Contact form now submits to `/api/feedback` endpoint instead of email service
  - **Removed Dependencies**: Eliminated nodemailer and email-based contact routes for simpler architecture
- **2025-11-10 (Data Integrity & Footer Polish)**: Production-ready improvements for data validation and professional branding
  - **Date Validation**: Frontend and backend validation prevents future dates in Lost/Found forms with timezone-safe local date handling
  - **Professional Footer**: Navy background (#1E2A45) with light gray text (#E7ECEF), three sections (About, Links, Disclaimer), "Designed & Developed by Deepak" attribution in accent yellow (#F8C538)
  - **Global Footer**: Moved to App.jsx for consistent display across all pages with dark mode support
  - **Inline Error Messages**: User-friendly error "Please select a valid date — future dates are not allowed."
- **2025-11-09 (SST Platform Enhancement)**: Transformed into role-based platform optimized for Scaler School of Technology
  - **Role-Based Navigation**: Separate navbar experiences for users (Home, Browse, Post, My Posts, Matches, Settings) and admins (Dashboard, Browse Posts, Users, Reports, Analytics, Settings) with gold "ADMIN" badge
  - **Settings System**: Multi-tab settings page with Profile, Preferences (default post type, contact visibility, WhatsApp prefix, auto-resolve), Security (session management), and Admin-only settings (moderation threshold, manual approval, announcement banner)
  - **UI Animations (Framer Motion)**: Page fade-in transitions, button hover scale + shadow bloom, card lift effect, navbar animated underline, theme toggle rotation
  - **Enhanced Homepage**: SST-branded hero with gradient background, "How It Works" section, "Why Only SST Students?" section, "Privacy & Security" sections
  - **Admin Pages**: User management (enable/disable users), Reports placeholder, Analytics dashboard with Chart.js visualizations
  - **Backend Enhancements**: Settings endpoints, user management, analytics, verification endpoint
  - **Security Improvements**: JWT includes user ID, legacy token rejection, separate user/admin settings persistence, proper middleware authentication

## User Preferences
None specified yet.

## System Architecture

### UI/UX Decisions
- **Brand Identity**: Official Lostify logo with location pin icon displayed across all pages; color palette (Navy #1E2A45, Yellow #F8C538, Light Gray #E7ECEF, Charcoal #1A1A1A, White #FFFFFF, Green #10B981, Red #EF4444); typography system (Manrope for headings/buttons/avatar initials, Inter for body text).
- **Modern Navigation**: Reorganized navbar with logo, role-based links, dark mode toggle, and dynamic avatar with profile dropdown (Settings + Logout) for streamlined, personalized UX.
- **Dynamic Avatars**: Initial-based circular avatars (yellow background, navy text) showing first letter of username; Google OAuth profile pictures displayed when available with yellow border.
- **Dark Mode**: Fully supported with 0.3s transitions and `localStorage` persistence.
- **Component Design**: Reusable UI components like `btn-primary`, `input-field`, and `card` ensure consistency.
- **Post Card Enhancements**: Features colored left edges (red for Lost, green for Found), formatted dates, and integrated WhatsApp contact buttons.
- **Login Experience**: Dual-tab login for User/Admin on a single page with centered Lostify logo.
- **Notifications**: Employs React Hot Toast with solid brand colors for all user feedback.
- **Admin Dashboard**: Features Chart.js analytics (pie/bar charts) for data visualization.
- **Animations**: Framer Motion effects - premium navbar slide-down entrance (0.5s easeOut), nav link hover micro-interactions (scale + lift), logo/avatar hover effects, smooth dropdown transitions.

### Technical Implementations
- **Authentication**: JWT tokens, bcrypt for password hashing, and Passport.js for Google OAuth (restricted to `@sst.scaler.com` domain).
- **File Upload**: `multer` middleware handles image uploads with a 3MB limit, replacing direct image URL input.
- **WhatsApp Integration**: Deep-linking with pre-filled messages for contacting post owners/finders.
- **Smart Match System**: A string similarity algorithm matches Lost/Found items based on title (40%), description (30%), category (20%), and location (10%).
- **Admin Moderation**: Allows flagging posts, adding internal notes, and CSV export of data.

### Feature Specifications
- **User Features**: Secure authentication (including Google OAuth), detailed item posting with image uploads, dark mode toggle, WhatsApp contact, comprehensive browsing and searching with filters, "My Matches" page displaying smart matching suggestions, and in-app feedback submission via Contact modal.
- **Admin Features**: Professional dashboard with summary cards (Users, Active/Resolved Posts, Feedback), detailed analytics visualizations (Lost vs. Found distribution, posts by category with Chart.js), advanced post management at `/admin/browse` with flagging, notes, and CSV export, user management at `/admin/users`, and dedicated Feedback & Bugs management page at `/admin/feedback` with status tracking and notification badge.

### System Design Choices
- **Backend**: Express.js (Node.js) serving a REST API.
- **Frontend**: React 18 with Vite, TailwindCSS, React Router DOM, Axios, and Chart.js.
- **Database**: Replit Database (key-value store).
- **Development Workflow**: Automated build and restart on Replit.
- **Security**: Bcrypt for password hashing, JWT for session management, protected routes, and role-based authorization.

## External Dependencies

- **Database**: Replit Database
- **Authentication**:
    - Google OAuth (via Passport.js)
- **File Upload**:
    - Multer
- **Styling**:
    - TailwindCSS
- **Charting**:
    - Chart.js
    - react-chartjs-2
- **Notifications**:
    - React Hot Toast
- **Icons**:
    - React Icons (previously used, now replaced with dynamic avatars)
- **Animations**:
    - Framer Motion
- **String Similarity**:
    - `string-similarity` algorithm library
- **HTTP Client**:
    - Axios
- **Routing**:
    - React Router DOM