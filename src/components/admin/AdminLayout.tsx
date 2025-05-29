import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronDown, 
  Bell
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and has admin role
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === 'SuperAdmin') {
        setUser(parsedUser);
      } else {
        // Redirect if not admin
        navigate('/signin');
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin area",
          variant: "destructive"
        });
      }
    } else {
      // Redirect if not authenticated
      navigate('/signin');
      toast({
        title: "Authentication Required",
        description: "Please sign in to access the admin dashboard",
        variant: "destructive"
      });
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully"
    });
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
    { label: 'Users', path: '/admin/users', icon: <Users className="h-5 w-5 mr-2" /> },
    { label: 'Doctors & Patients', path: '/admin/doctors-patients', icon: <Users className="h-5 w-5 mr-2" /> },
    { label: 'Appointments', path: '/admin/appointments', icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5 mr-2" /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-64 bg-white shadow-md flex flex-col ${sidebarOpen ? '' : 'hidden md:flex'}`}>
        <div className="p-6 border-b">
          <Link to="/admin/dashboard" className="text-xl font-bold text-purple-700">MindCare Admin</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded hover:bg-purple-100 transition ${location.pathname === item.path ? 'bg-purple-100 font-semibold' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" /> Logout
          </Button>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-gray-400" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span>{user?.name || 'Admin'}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{user?.email}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
