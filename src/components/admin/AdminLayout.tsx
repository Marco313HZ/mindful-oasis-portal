
import { useEffect, useState } from 'react';
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
      if (parsedUser.role === 'admin') {
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
    { 
      label: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      label: 'Users', 
      path: '/admin/users', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      label: 'Settings', 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 mr-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-purple-400 flex items-center justify-center">
              <span className="font-bold text-white text-sm">MC</span>
            </div>
            <span className="font-bold text-purple-800">Admin Panel</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="font-medium text-purple-800">{user.name.charAt(0)}</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2 md:hidden">
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem asChild>
                  <Link to="/admin/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className={`hidden md:block w-64 bg-white shadow-sm h-[calc(100vh-4rem)] sticky top-16`}>
          <nav className="p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-purple-100 text-purple-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4 border-t">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
              <nav className="p-4">
                <div className="flex items-center justify-between mb-4 p-2">
                  <Link to="/admin/dashboard" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-purple-400 flex items-center justify-center">
                      <span className="font-bold text-white text-sm">MC</span>
                    </div>
                    <span className="font-bold text-purple-800">Admin Panel</span>
                  </Link>
                  <button onClick={() => setSidebarOpen(false)}>
                    <Menu className="h-6 w-6 text-gray-700" />
                  </button>
                </div>
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center p-3 rounded-lg transition-colors ${
                          isActive(item.path)
                            ? 'bg-purple-100 text-purple-800'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-4 border-t">
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
