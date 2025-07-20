import { useState } from "react";
import { Plus, Search, Filter, Globe, ShoppingCart, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const SeekerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("discover");

  // Mock data for the dashboard
  const activeRequests = [
    {
      id: "1",
      product: "iPhone 15 Pro Max",
      retailer: "Apple Store",
      price: 1199,
      commission: 60,
      status: "accepted",
      cardholder: "Premium_User_123",
      timeRemaining: "2 days",
      requiredBenefits: ["Apple Card", "Employee Discount"]
    },
    {
      id: "2", 
      product: "MacBook Pro M3",
      retailer: "Best Buy",
      price: 2499,
      commission: 125,
      status: "funded",
      cardholder: "TechSaver_Pro",
      timeRemaining: "5 days",
      requiredBenefits: ["Best Buy Elite", "Student Discount"]
    }
  ];

  const recentDeals = [
    {
      id: "3",
      product: "AirPods Pro 2",
      retailer: "Amazon",
      originalPrice: 249,
      finalPrice: 199,
      savings: 50,
      status: "completed",
      rating: 5
    },
    {
      id: "4",
      product: "iPad Air",
      retailer: "Costco", 
      originalPrice: 599,
      finalPrice: 549,
      savings: 50,
      status: "completed",
      rating: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-500/20 text-blue-400";
      case "accepted": return "bg-yellow-500/20 text-yellow-400";
      case "funded": return "bg-green-500/20 text-green-400";
      case "completed": return "bg-green-500/20 text-green-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <Clock className="w-4 h-4" />;
      case "accepted": return <AlertCircle className="w-4 h-4" />;
      case "funded": return <CheckCircle className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              ← Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Seeker Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Requests</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Savings</p>
                  <p className="text-2xl font-bold text-green-400">$342</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-foreground">98%</p>
                </div>
                <AlertCircle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Avg. Delivery</p>
                  <p className="text-2xl font-bold text-foreground">3.2 days</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="discover" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Discover</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>My Requests</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>Product Discovery</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <Input 
                    placeholder="Paste product URL or search for items..." 
                    className="flex-1"
                  />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Popular Retailers */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Popular Retailers</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {["Amazon", "Apple", "Best Buy", "Costco", "Target", "Walmart"].map((retailer) => (
                      <Card key={retailer} className="hover-lift cursor-pointer bg-secondary/50 border-border/50">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <span className="text-primary font-bold">{retailer[0]}</span>
                          </div>
                          <p className="text-sm text-foreground">{retailer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Active Requests</h2>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Request
                </Button>
              </div>

              {activeRequests.map((request) => (
                <Card key={request.id} className="bg-gradient-card border-border/50 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{request.product}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">{request.status}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-2">{request.retailer} • ${request.price}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          {request.requiredBenefits.map((benefit) => (
                            <Badge key={benefit} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        
                        {request.cardholder && (
                          <p className="text-sm text-muted-foreground">
                            Cardholder: <span className="text-primary">{request.cardholder}</span>
                          </p>
                        )}
                      </div>

                      <div className="text-right space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Commission</p>
                          <p className="text-lg font-semibold text-green-400">${request.commission}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Time Remaining</p>
                          <p className="text-sm font-medium text-foreground">{request.timeRemaining}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm">Chat</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>

              {recentDeals.map((deal) => (
                <Card key={deal.id} className="bg-gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{deal.product}</h3>
                          <Badge className={getStatusColor(deal.status)}>
                            {getStatusIcon(deal.status)}
                            <span className="ml-1 capitalize">{deal.status}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground">{deal.retailer}</p>
                        
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                          <span className="text-lg font-semibold text-foreground">${deal.finalPrice}</span>
                          <span className="text-green-400 text-sm font-medium">Saved ${deal.savings}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < deal.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <Button variant="outline" size="sm">View Receipt</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SeekerDashboard;