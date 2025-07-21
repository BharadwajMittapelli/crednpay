import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, X, ShoppingCart, DollarSign, Package, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  url: string;
  retailer: string;
}

export default function DealCreation() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    quantity: 1,
    url: '',
    retailer: ''
  });
  const [dealDetails, setDealDetails] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'normal',
    commission: '5',
    platformFee: '2.5'
  });

  const retailers = ['Amazon', 'Target', 'Best Buy', 'Walmart', 'Costco', 'Other'];
  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Other'];

  const addItemToCart = () => {
    if (!newItem.name || !newItem.price || !newItem.url) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const item: CartItem = {
      id: Date.now().toString(),
      name: newItem.name,
      price: parseFloat(newItem.price),
      quantity: newItem.quantity,
      url: newItem.url,
      retailer: newItem.retailer || 'Other'
    };

    setCartItems(prev => [...prev, item]);
    setNewItem({ name: '', price: '', quantity: 1, url: '', retailer: '' });
    
    toast({
      title: "Item Added",
      description: "Item has been added to your cart."
    });
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const commission = subtotal * (parseFloat(dealDetails.commission) / 100);
    const platformFee = subtotal * (parseFloat(dealDetails.platformFee) / 100);
    return { subtotal, commission, platformFee, total: subtotal + commission + platformFee };
  };

  const createDealRequest = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add at least one item to create a deal.",
        variant: "destructive"
      });
      return;
    }

    const dealRequest = {
      ...dealDetails,
      items: cartItems,
      totals: getTotalAmount(),
      createdAt: new Date().toISOString()
    };

    console.log('Creating deal request:', dealRequest);
    
    toast({
      title: "Deal Request Created!",
      description: "Your deal has been posted and is now visible to cardholders."
    });

    // Reset form
    setCartItems([]);
    setDealDetails({
      title: '',
      description: '',
      category: '',
      urgency: 'normal',
      commission: '5',
      platformFee: '2.5'
    });
    setCurrentStep(1);
  };

  const { subtotal, commission, platformFee, total } = getTotalAmount();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Create Deal Request</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Add Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Add Items to Cart</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Product Name *</Label>
                <Input
                  id="itemName"
                  placeholder="iPhone 15 Pro Max"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="999.99"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retailer">Retailer</Label>
                <Select value={newItem.retailer} onValueChange={(value) => setNewItem({ ...newItem, retailer: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select retailer" />
                  </SelectTrigger>
                  <SelectContent>
                    {retailers.map((retailer) => (
                      <SelectItem key={retailer} value={retailer}>
                        {retailer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="url">Product URL *</Label>
                <Input
                  id="url"
                  placeholder="https://..."
                  value={newItem.url}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                />
              </div>
            </div>

            <Button onClick={addItemToCart} className="bg-gradient-primary hover-lift">
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Cart Items */}
          {cartItems.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Cart Items</h3>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{item.retailer}</span>
                          <span>${item.price.toFixed(2)} × {item.quantity}</span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Step 2: Deal Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>Deal Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Deal Title</Label>
                <Input
                  id="title"
                  placeholder="iPhone 15 Pro Max Deal"
                  value={dealDetails.title}
                  onChange={(e) => setDealDetails({ ...dealDetails, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={dealDetails.category} onValueChange={(value) => setDealDetails({ ...dealDetails, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commission">Commission (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={dealDetails.commission}
                  onChange={(e) => setDealDetails({ ...dealDetails, commission: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select value={dealDetails.urgency} onValueChange={(value) => setDealDetails({ ...dealDetails, urgency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Within a week</SelectItem>
                    <SelectItem value="normal">Normal - Within 3 days</SelectItem>
                    <SelectItem value="high">High - Within 24 hours</SelectItem>
                    <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Any special instructions or requirements..."
                  value={dealDetails.description}
                  onChange={(e) => setDealDetails({ ...dealDetails, description: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          {cartItems.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Price Breakdown</span>
                </h3>

                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cardholder Commission ({dealDetails.commission}%):</span>
                      <span>${commission.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee ({dealDetails.platformFee}%):</span>
                      <span>${platformFee.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>

                <Button onClick={createDealRequest} className="w-full bg-gradient-primary hover-lift">
                  Create Deal Request
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}