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

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

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
          <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
            <SidebarTrigger className='-ml-1' />
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
