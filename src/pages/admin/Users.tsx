import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Trash, 
  Edit, 
  Mail, 
  User, 
  Phone, 
  Shield, 
  AlertTriangle 
} from "lucide-react";
import AdminLayout from '@/components/admin/AdminLayout';
import DoctorDashboard from '../doctor/Dashboard';

// User type definition
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'therapist';
  status: 'active' | 'inactive' | 'pending';
  dateCreated: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    role: "admin",
    status: "active",
    dateCreated: "2025-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    role: "therapist",
    status: "active",
    dateCreated: "2025-02-10"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "(555) 345-6789",
    role: "user",
    status: "active",
    dateCreated: "2025-03-05"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(555) 456-7890",
    role: "user",
    status: "inactive",
    dateCreated: "2025-03-22"
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james@example.com",
    phone: "(555) 567-8901",
    role: "user",
    status: "pending",
    dateCreated: "2025-04-18"
  }
];

const Users = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'pending'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Apply filters whenever search term or filters change
  useEffect(() => {
    let result = users;
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(user => user.status === statusFilter);
    }
    
    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(result);
  }, [searchTerm, statusFilter, roleFilter, users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      status: 'pending'
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (isEditing && formData.id) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === formData.id ? { ...user, ...formData } as User : user
      );
      setUsers(updatedUsers);
      
      toast({
        title: "User Updated",
        description: `${formData.name} has been updated successfully`
      });
    } else {
      // Create new user
      const newUser: User = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        name: formData.name!,
        email: formData.email!,
        phone: formData.phone || '',
        role: (formData.role as 'user' | 'admin' | 'therapist') || 'user',
        status: (formData.status as 'active' | 'inactive' | 'pending') || 'pending',
        dateCreated: new Date().toISOString().split('T')[0]
      };
      
      setUsers([...users, newUser]);
      
      toast({
        title: "User Created",
        description: `${newUser.name} has been added successfully`
      });
    }
    
    setIsFormOpen(false);
    resetForm();
  };

  const handleEdit = (user: User) => {
    setFormData(user);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      
      toast({
        title: "User Deleted",
        description: `${userToDelete.name} has been deleted successfully`
      });
    }
    
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'therapist':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Example: Render doctor dashboard if user is a doctor
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role === 'doctor') {
    return <DoctorDashboard doctorId={user.id} />;
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600">Create and manage user accounts.</p>
      </div>

      <Card>
        <CardHeader className="px-6 py-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-lg font-semibold">Users</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-purple-400 hover:bg-purple-500">
                    <Plus className="h-4 w-4 mr-1" />
                    New User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit User' : 'Create New User'}</DialogTitle>
                    <DialogDescription>
                      {isEditing 
                        ? 'Make changes to the user details below.' 
                        : 'Fill in the information below to create a new user account.'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Full name"
                              value={formData.name || ''}
                              onChange={handleInputChange}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input
                              id="email"
                              name="email"
                              placeholder="Email address"
                              type="email"
                              value={formData.email || ''}
                              onChange={handleInputChange}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="Phone number"
                              value={formData.phone || ''}
                              onChange={handleInputChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <Shield className="h-4 w-4 text-gray-400" />
                            </div>
                            <Select
                              value={formData.role as string || 'user'}
                              onValueChange={(value) => handleSelectChange('role', value)}
                            >
                              <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="therapist">Therapist</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                          <Select
                            value={formData.status as string || 'pending'}
                            onValueChange={(value) => handleSelectChange('status', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" type="button" onClick={resetForm}>Cancel</Button>
                      </DialogClose>
                      <Button type="submit" className="bg-purple-400 hover:bg-purple-500">
                        {isEditing ? 'Update User' : 'Create User'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="therapist">Therapist</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Users Table */}
            <div className="border rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-purple-800">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.dateCreated}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(user)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600 focus:text-red-700" 
                                    onClick={() => handleDelete(user)}
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No users found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete User</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this user? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {userToDelete && (
                    <div className="flex items-center p-4 bg-red-50 rounded-md">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-semibold text-red-800">
                          Deleting: {userToDelete.name}
                        </p>
                        <p className="text-xs text-red-700">
                          {userToDelete.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                    variant="destructive" 
                    onClick={confirmDelete}
                  >
                    Delete User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {/* Pagination Placeholder */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Users;
