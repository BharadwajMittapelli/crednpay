import { useState } from "react";
import { ArrowRight, Shield, Zap, Users, CreditCard, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const features = [
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Find products across multiple retailers with AI-powered recommendations"
    },
    {
      icon: Shield,
      title: "Secure Escrow",
      description: "Protected transactions with automated fund release system"
    },
    {
      icon: CreditCard,
      title: "Premium Benefits",
      description: "Access exclusive deals through verified cardholders' premium memberships"
    },
    {
      icon: Users,
      title: "Trusted Network",
      description: "Connect with verified cardholders in our reputation-based marketplace"
    }
  ];

  const stats = [
    { value: "10k+", label: "Active Users" },
    { value: "500+", label: "Partner Retailers" },
    { value: "$2M+", label: "Savings Generated" },
    { value: "99.8%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CrednPay</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <Button variant="outline" className="mr-2">Sign In</Button>
            <Button>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            The Marketplace for
            <span className="text-primary block mt-2">Premium Shopping</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect seekers with premium cardholders to unlock exclusive deals, 
            better prices, and access to members-only benefits across top retailers.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 shadow-glow px-8 py-6 text-lg animate-glow"
              onClick={() => navigate('/seeker')}
            >
              I Want to Buy
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-6 text-lg border-primary/50 hover:bg-primary/10"
              onClick={() => navigate('/cardholder')}
            >
              I Can Help Buy
              <CreditCard className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose CrednPay?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A secure, efficient marketplace that benefits both buyers and sellers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card border-border/50 hover-lift cursor-pointer"
                onMouseEnter={() => setHoveredCard(feature.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    hoveredCard === feature.title ? 'bg-primary scale-110' : ''
                  }`}>
                    <feature.icon className={`w-6 h-6 transition-colors duration-300 ${
                      hoveredCard === feature.title ? 'text-primary-foreground' : 'text-primary'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple, secure, and efficient</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Seeker Flow */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-primary mb-6">For Seekers</h3>
              
              <div className="space-y-6">
                {[
                  { step: "1", title: "Discover Products", desc: "Browse and find items you want to purchase" },
                  { step: "2", title: "Create Request", desc: "Post your deal request with required benefits" },
                  { step: "3", title: "Fund Escrow", desc: "Securely deposit funds when a cardholder accepts" },
                  { step: "4", title: "Receive & Review", desc: "Get your item and rate the experience" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cardholder Flow */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-primary mb-6">For Cardholders</h3>
              
              <div className="space-y-6">
                {[
                  { step: "1", title: "Add Your Cards", desc: "Securely register your premium cards & benefits" },
                  { step: "2", title: "Find Requests", desc: "Browse deals you're eligible to fulfill" },
                  { step: "3", title: "Purchase & Prove", desc: "Buy the item and upload proof of purchase" },
                  { step: "4", title: "Get Paid", desc: "Receive your commission once delivery is confirmed" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 animate-fade-in" style={{ animationDelay: `${(index + 4) * 0.1}s` }}>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users already saving money and earning commissions
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-glow px-8 py-6 text-lg"
                onClick={() => navigate('/seeker')}
              >
                Start as a Seeker
                <Search className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg border-primary/50 hover:bg-primary/10"
                onClick={() => navigate('/cardholder')}
              >
                Become a Cardholder
                <Star className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CrednPay</span>
            </div>
            
            <div className="flex space-x-6 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/20 text-center text-muted-foreground">
            <p>&copy; 2024 CrednPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;