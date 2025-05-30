import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppSidebar } from './components/AppSidebar';
import { Dashboard } from './components/Dashboard';
import { Schedule } from './pages/Schedule';
import { Staff } from './pages/Staff';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { User } from './pages/User';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from './components/ui/sidebar';

function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className='flex min-h-screen w-full'>
          <AppSidebar />
          <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
              <SidebarTrigger className='-ml-1' />
            </header>
            <main className='flex-1 overflow-auto'>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/schedule' element={<Schedule />} />
                <Route path='/staff' element={<Staff />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/user' element={<User />} />
              </Routes>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </Router>
  );
}

export default App;
