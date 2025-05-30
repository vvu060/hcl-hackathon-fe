import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AppSidebar } from './components/AppSidebar';
import { Dashboard } from './components/Dashboard';
import { Schedule } from './pages/Schedule';
import { Staff } from './pages/Staff';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { User } from './pages/User';
import { Login } from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from './components/ui/sidebar';
import { Separator } from './components/ui/separator';
import logoImage from './assets/logo.png';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!isAdmin) {
    return <Navigate to='/user' replace />;
  }

  return <>{children}</>;
};

// Layout Component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-3 border-b px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='h-6' />
            <div className='flex items-center gap-2'>
              <img
                src={logoImage}
                alt='HCL Healthcare'
                className='h-10 w-10 sm:h-8 sm:w-8 object-contain'
              />
              <span className='font-semibold text-lg text-foreground hidden sm:block'>
                HCL Healthcare
              </span>
              <span className='font-semibold text-base sm:text-sm text-foreground sm:hidden'>
                HCL
              </span>
            </div>
          </header>
          <main className='flex-1 overflow-auto'>
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Login Route - No Sidebar */}
              <Route path='/login' element={<Login />} />

              {/* Protected Routes - With Sidebar */}
              <Route
                path='/'
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/schedule'
                element={
                  <AdminRoute>
                    <AppLayout>
                      <Schedule />
                    </AppLayout>
                  </AdminRoute>
                }
              />

              <Route
                path='/staff'
                element={
                  <AdminRoute>
                    <AppLayout>
                      <Staff />
                    </AppLayout>
                  </AdminRoute>
                }
              />

              <Route
                path='/reports'
                element={
                  <AdminRoute>
                    <AppLayout>
                      <Reports />
                    </AppLayout>
                  </AdminRoute>
                }
              />

              <Route
                path='/settings'
                element={
                  <AdminRoute>
                    <AppLayout>
                      <Settings />
                    </AppLayout>
                  </AdminRoute>
                }
              />

              <Route
                path='/user'
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <User />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
