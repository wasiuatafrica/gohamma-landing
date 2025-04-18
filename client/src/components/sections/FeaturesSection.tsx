import { 
  BarChart4, 
  TrendingUp, 
  Shield, 
  Globe, 
  Smartphone, 
  Clock,
  AlertCircle,
  BookText,
  RefreshCw
} from "lucide-react";

const features = [
  {
    icon: <BarChart4 className="h-8 w-8 text-primary" />,
    title: "Real-time Analytics",
    description: "Monitor market movements with instant updates and in-depth analysis to make informed trading decisions."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Growth Insights",
    description: "Identify high-potential opportunities with our AI-powered stock recommendations and trend analysis."
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Secure Trading",
    description: "Trade with confidence with our industry-leading security protocols and real-time fraud detection."
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Market News",
    description: "Stay updated with the latest market news, economic indicators, and corporate actions affecting the Nigerian market."
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: "Mobile Trading",
    description: "Trade stocks anytime, anywhere with our responsive mobile platform designed for on-the-go investors."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "24/7 Portfolio Access",
    description: "Check your portfolio performance, execute trades, and set alerts at any time, day or night."
  },
  {
    icon: <AlertCircle className="h-8 w-8 text-primary" />,
    title: "Custom Alerts",
    description: "Create personalized price alerts and notifications to never miss important market movements."
  },
  {
    icon: <BookText className="h-8 w-8 text-primary" />,
    title: "Investment Education",
    description: "Access comprehensive learning resources to improve your trading skills and market knowledge."
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" />,
    title: "Automated Investing",
    description: "Set up recurring investments and automated trading strategies to build wealth consistently."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tools for Nigerian Investors</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover why thousands of Nigerian investors trust Hamma for their trading needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:border-primary/20 bg-card"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;