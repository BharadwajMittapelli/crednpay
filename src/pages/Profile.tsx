import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Shield, Calendar, MapPin, Mail, Phone, Edit, Camera } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced cardholder with premium cards. Quick and reliable purchases.',
    avatar: ''
  });

  // Mock data
  const stats = {
    totalDeals: 47,
    successRate: 98.5,
    rating: 4.9,
    earnings: 2847.50,
    joinDate: 'March 2023'
  };

  const recentTransactions = [
    { id: '1', type: 'Purchase', amount: 899.99, status: 'Completed', date: '2024-01-15' },
    { id: '2', type: 'Commission', amount: 45.00, status: 'Paid', date: '2024-01-14' },
    { id: '3', type: 'Purchase', amount: 299.99, status: 'Completed', date: '2024-01-12' }
  ];

  const reviews = [
    { id: '1', rating: 5, comment: 'Fast and reliable! Got my item exactly as requested.', author: 'Sarah M.', date: '2024-01-10' },
    { id: '2', rating: 5, comment: 'Great communication throughout the process.', author: 'Mike R.', date: '2024-01-08' },
    { id: '3', rating: 4, comment: 'Good service, item arrived on time.', author: 'Lisa K.', date: '2024-01-05' }
  ];

  const handleSave = () => {
    // TODO: Save profile changes
    setIsEditing(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-warning fill-warning' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userInfo.avatar} />
                <AvatarFallback className="text-2xl">{userInfo.firstName[0]}{userInfo.lastName[0]}</AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold">{userInfo.firstName} {userInfo.lastName}</h1>
                <Badge variant="default" className="bg-gradient-primary">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>

              <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(stats.rating)}
                  <span className="text-sm font-medium ml-1">{stats.rating}</span>
                </div>
                <span>•</span>
                <span>{stats.totalDeals} deals completed</span>
                <span>•</span>
                <span>{stats.successRate}% success rate</span>
              </div>

              <p className="text-muted-foreground">{userInfo.bio}</p>
            </div>

            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="hover-lift"
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary">${stats.earnings.toLocaleString()}</h3>
                  <p className="text-muted-foreground">Total Earnings</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary">{stats.totalDeals}</h3>
                  <p className="text-muted-foreground">Completed Deals</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary">{stats.successRate}%</h3>
                  <p className="text-muted-foreground">Success Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg border-border">
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${transaction.amount}</p>
                      <Badge variant={transaction.status === 'Completed' || transaction.status === 'Paid' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Transaction history table would go here */}
              <p className="text-muted-foreground">Full transaction history coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{review.author}</span>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={userInfo.location}
                      onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={handleSave} className="bg-gradient-primary">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{userInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{userInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {stats.joinDate}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}