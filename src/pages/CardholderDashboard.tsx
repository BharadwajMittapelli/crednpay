import { useState } from "react";
import { Plus, CreditCard, DollarSign, TrendingUp, Filter, MessageCircle, Upload, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const CardholderDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("opportunities");

  // Mock data
  const cardPortfolio = [
    {
      id: "1",
      type: "Amex Platinum",
      bank: "American Express",
      benefits: ["5x Points on Flights", "Hotel Elite Status", "Airport Lounge Access"],
      eligible: 23,
      active: true
    },
    {
      id: "2",
      type: "Chase Sapphire Reserve",
      bank: "Chase",
      benefits: ["3x Points on Travel", "Priority Pass", "Travel Insurance"],
      eligible: 18,
      active: true
    },
    {
      id: "3",
      type: "Costco Executive",
      bank: "Costco",
      benefits: ["2% Cashback", "Executive Member Pricing", "Additional Warranties"],
      eligible: 12,
      active: true
    }
  ];

  const availableOpportunities = [
    {
      id: "1",
      product: "MacBook Pro M3 14-inch",
      retailer: "Apple Store",
      price: 1999,
      commission: 100,
      requiredCards: ["Apple Card", "Employee Discount"],
      timeLeft: "3 days",
      seekerRating: 4.8,
      difficulty: "Easy"
    },
    {
      id: "2",
      product: "Sony WH-1000XM5",
      retailer: "Best Buy",
      price: 399,
      commission: 20,
      requiredCards: ["Best Buy Elite"],
      timeLeft: "1 day",
      seekerRating: 4.9,
      difficulty: "Easy"
    },
    {
      id: "3",
      product: "KitchenAid Stand Mixer",
      retailer: "Williams Sonoma",
      price: 449,
      commission: 45,
      requiredCards: ["Williams Sonoma Card", "Professional Discount"],
      timeLeft: "5 days",
      seekerRating: 4.7,
      difficulty: "Medium"
    }
  ];

  const activeDeals = [
    {
      id: "1",
      product: "iPhone 15 Pro",
      retailer: "Apple Store",
      commission: 60,
      status: "purchased",
      nextStep: "Upload proof of purchase",
      timeRemaining: "2 days",
      seekerName: "TechLover_2024"
    },
    {
      id: "2",
      product: "Dyson V15 Vacuum",
      retailer: "Dyson",
      commission: 35,
      status: "confirmed",
      nextStep: "Awaiting shipment confirmation",
      timeRemaining: "4 days",
      seekerName: "HomeOwner_Pro"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-400";
      case "Medium": return "bg-yellow-500/20 text-yellow-400";
      case "Hard": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "purchased": return "bg-blue-500/20 text-blue-400";
      case "confirmed": return "bg-green-500/20 text-green-400";
      case "shipped": return "bg-purple-500/20 text-purple-400";
      default: return "bg-gray-500/20 text-gray-400";
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
            <h1 className="text-2xl font-bold text-foreground">Cardholder Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
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
                  <p className="text-muted-foreground text-sm">This Month Earnings</p>
                  <p className="text-2xl font-bold text-green-400">$1,247</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Cards</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-foreground">96%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Rating</p>
                  <p className="text-2xl font-bold text-foreground">4.9</p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="opportunities" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Opportunities</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Active Deals</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>My Portfolio</span>
            </TabsTrigger>
          </TabsList>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Available Opportunities</h2>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Card Type
              </Button>
            </div>

            <div className="grid gap-6">
              {availableOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="bg-gradient-card border-border/50 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{opportunity.product}</h3>
                          <Badge className={getDifficultyColor(opportunity.difficulty)}>
                            {opportunity.difficulty}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-2">
                          {opportunity.retailer} • ${opportunity.price}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {opportunity.requiredCards.map((card) => (
                            <Badge key={card} variant="outline" className="text-xs">
                              {card}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Seeker Rating: {opportunity.seekerRating} ⭐</span>
                          <span>Time Left: {opportunity.timeLeft}</span>
                        </div>
                      </div>

                      <div className="text-right space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Commission</p>
                          <p className="text-2xl font-bold text-green-400">${opportunity.commission}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                            Accept Deal
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Deals Tab */}
          <TabsContent value="active" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Active Deals</h2>

              {activeDeals.map((deal) => (
                <Card key={deal.id} className="bg-gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{deal.product}</h3>
                          <Badge className={getStatusColor(deal.status)}>
                            {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-2">{deal.retailer}</p>
                        <p className="text-sm text-muted-foreground">
                          Seeker: <span className="text-primary">{deal.seekerName}</span>
                        </p>
                        
                        <div className="mt-3 p-3 bg-primary/10 rounded-lg">
                          <p className="text-sm font-medium text-foreground">Next Step:</p>
                          <p className="text-sm text-muted-foreground">{deal.nextStep}</p>
                        </div>
                      </div>

                      <div className="text-right space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Commission</p>
                          <p className="text-xl font-bold text-green-400">${deal.commission}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Time Remaining</p>
                          <p className="text-sm font-medium text-foreground">{deal.timeRemaining}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          {deal.status === "purchased" && (
                            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                              <Upload className="w-4 h-4 mr-1" />
                              Upload Proof
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">My Card Portfolio</h2>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add New Card
              </Button>
            </div>

            <div className="grid gap-6">
              {cardPortfolio.map((card) => (
                <Card key={card.id} className="bg-gradient-card border-border/50 hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{card.type}</h3>
                          <p className="text-sm text-muted-foreground">{card.bank}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className="bg-green-500/20 text-green-400 mb-2">
                          {card.eligible} eligible deals
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Status: <span className="text-primary">Active</span>
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Benefits & Perks:</h4>
                      <div className="flex flex-wrap gap-2">
                        {card.benefits.map((benefit) => (
                          <Badge key={benefit} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm">Edit Benefits</Button>
                      <Button variant="outline" size="sm">View Eligible Deals</Button>
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

export default CardholderDashboard;