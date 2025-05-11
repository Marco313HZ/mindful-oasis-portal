
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Calendar, 
  Users as UsersIcon, 
  FileText, 
  Activity, 
  ArrowUp, 
  ArrowDown
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    { 
      title: "Total Users", 
      value: "854", 
      icon: <UsersIcon className="h-5 w-5" />,
      change: "+12%",
      trend: "up"
    },
    { 
      title: "Appointments", 
      value: "235", 
      icon: <Calendar className="h-5 w-5" />,
      change: "+18%",
      trend: "up"
    },
    { 
      title: "Active Sessions", 
      value: "43", 
      icon: <Activity className="h-5 w-5" />,
      change: "-5%",
      trend: "down"
    },
    { 
      title: "Support Tickets", 
      value: "12", 
      icon: <FileText className="h-5 w-5" />,
      change: "+2%",
      trend: "up"
    }
  ];

  const recentUsers = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", date: "May 10, 2025" },
    { id: 2, name: "Maria Garcia", email: "maria@example.com", date: "May 09, 2025" },
    { id: 3, name: "Robert Chen", email: "robert@example.com", date: "May 08, 2025" },
    { id: 4, name: "Sarah Miller", email: "sarah@example.com", date: "May 07, 2025" },
    { id: 5, name: "James Wilson", email: "james@example.com", date: "May 07, 2025" }
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to the MindfulCare admin dashboard.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.title === "Total Users" ? "bg-blue-100" :
                  stat.title === "Appointments" ? "bg-green-100" :
                  stat.title === "Active Sessions" ? "bg-purple-100" :
                  "bg-yellow-100"
                }`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className={`flex items-center text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {stat.change}
                </div>
                <span className="text-xs text-gray-500 ml-2">vs. last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Analytics</h2>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>
            </div>

            <Card>
              <CardContent className="p-6">
                <TabsContent value="overview">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500">Activity Overview</h3>
                    <div className="h-80 w-full bg-gray-50 flex items-center justify-center rounded-md border">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Analytics Chart Placeholder</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div>Weekly Activity</div>
                      <div>May 4 - May 10, 2025</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="users">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500">User Growth</h3>
                    <div className="h-80 w-full bg-gray-50 flex items-center justify-center rounded-md border">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">User Growth Chart Placeholder</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div>New vs. Returning Users</div>
                      <div>Past 6 months</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="appointments">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500">Appointments Overview</h3>
                    <div className="h-80 w-full bg-gray-50 flex items-center justify-center rounded-md border">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Appointments Chart Placeholder</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div>Appointment Types</div>
                      <div>Current month</div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>

        {/* Recent Users Section */}
        <div>
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Users</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6 py-0">
              <ul className="divide-y">
                {recentUsers.map((user) => (
                  <li key={user.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-800">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{user.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
