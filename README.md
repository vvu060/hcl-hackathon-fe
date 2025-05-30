# HCL Healthcare Staff Management System

A modern, responsive healthcare staff management application built for the **HCL Hackathon**. This system provides comprehensive tools for managing healthcare staff schedules, roles, and operations with a focus on user experience and mobile-first design.

## 🏆 Hackathon Project

This project was developed as part of the HCL Hackathon, showcasing modern web development practices and healthcare industry solutions.

## 📸 Screenshots

Application screenshots are available in the `public/screenshots/` folder, showcasing the dashboard, staff management, schedule interface, mobile responsiveness, and authentication flow.

## 🚀 Features

### 🔐 Authentication & Authorization

- **Role-based access control** with Admin and User roles
- **Secure login system** with demo credentials
- **Protected routes** ensuring proper access control
- **Social login integration** (Google, GitHub)

### 📊 Dashboard & Analytics

- **Real-time staff overview** with current shift status
- **Today's schedule** showing active staff members
- **Upcoming shifts** for better planning
- **Interactive data visualization**

### 👥 Staff Management

- **Complete staff directory** with detailed profiles
- **Add, edit, and delete** staff members
- **Department and role management**
- **Status tracking** (Active, Inactive, On Leave)
- **Contact information management**

### 📅 Schedule Management

- **Shift type configuration** (Morning, Day, Evening, Night, Extended shifts)
- **Staff scheduling** with drag-and-drop interface
- **Shift conflict detection**
- **Schedule optimization**

### 📈 Reports & Analytics

- **Staff utilization reports**
- **Department-wise analytics**
- **Shift pattern analysis**
- **Export functionality**

### ⚙️ Settings & Configuration

- **System preferences**
- **User profile management**
- **Department configuration**
- **Shift type customization**

### 📱 Mobile-First Design

- **Responsive design** that works on all devices
- **Touch-friendly interface**
- **Optimized mobile navigation**
- **Progressive Web App capabilities**

## 🛠️ Technology Stack

### Frontend

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing

### UI/UX

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Custom UI Components** - Built with shadcn/ui patterns

### State Management

- **React Context** - For authentication and global state
- **React Hooks** - For local component state

### Development Tools

- **ESLint** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin React** - React integration for Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hcl-hackathon-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

The application includes demo credentials for testing:

- **Admin Access:**

  - Email: `admin@shiftly.com`
  - Password: `admin123`

- **User Access:**
  - Email: `user@shiftly.com`
  - Password: `user123`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── AppSidebar.tsx  # Navigation sidebar
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── ErrorBoundary.tsx # Error handling
│   └── Toast.tsx       # Notification system
├── pages/              # Page components
│   ├── Login.tsx       # Authentication page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Staff.tsx       # Staff management
│   ├── Schedule.tsx    # Schedule management
│   ├── Reports.tsx     # Analytics and reports
│   ├── Settings.tsx    # System settings
│   └── User.tsx        # User profile
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── assets/             # Static assets
└── App.tsx             # Main application component
```

## 🎯 Key Features Breakdown

### Admin Features

- **Full staff management** - Add, edit, delete staff members
- **Schedule creation** - Create and manage shift schedules
- **Reports access** - View analytics and generate reports
- **System settings** - Configure departments, roles, and shifts

### User Features

- **Personal dashboard** - View assigned shifts and schedule
- **Profile management** - Update personal information
- **Schedule viewing** - See upcoming shifts and colleagues

### Responsive Design

- **Mobile-first approach** - Optimized for mobile devices
- **Tablet support** - Enhanced experience on tablets
- **Desktop optimization** - Full-featured desktop interface

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

The application uses a consistent design system with:

- **Color palette** - Healthcare-friendly colors
- **Typography** - Clear, readable fonts
- **Spacing** - Consistent spacing scale
- **Components** - Reusable UI components
- **Icons** - Lucide React icon library

## 🔒 Security Features

- **Authentication** - Secure login system
- **Authorization** - Role-based access control
- **Route protection** - Protected routes for authenticated users
- **Input validation** - Form validation and sanitization

## 📱 Mobile Features

- **Touch gestures** - Swipe and tap interactions
- **Responsive tables** - Mobile-optimized data display
- **Collapsible navigation** - Space-efficient mobile menu
- **Touch-friendly buttons** - Appropriately sized touch targets

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

- **Vercel** - Recommended for React applications
- **Netlify** - Easy deployment with continuous integration
- **AWS S3** - Static website hosting
- **GitHub Pages** - Free hosting for public repositories

## 🤝 Contributing

This project was developed for the HCL Hackathon. For future enhancements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of the HCL Hackathon submission.

## 🏥 Healthcare Industry Focus

This application addresses real-world healthcare challenges:

- **Staff shortage management**
- **Efficient scheduling**
- **Compliance tracking**
- **Resource optimization**
- **Communication improvement**

## 🎯 Future Enhancements

- **Real-time notifications**
- **Integration with hospital systems**
- **Advanced analytics**
- **Mobile app development**
- **AI-powered scheduling**

## 📞 Support

For questions or support regarding this hackathon project, please reach out to the development team.

---

**Built with ❤️ for the HCL Hackathon**
