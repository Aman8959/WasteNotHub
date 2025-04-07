import FeatureCard from "@/components/feature-card";
import { Gift, Search, Truck, DollarSign, ShieldCheck, Clock, Globe, Heart } from "lucide-react";

const Features = () => {
  const featureItems = [
    {
      icon: Gift,
      title: "Donate Items",
      description: "Easily list your unused items for donation. Our platform connects you with people or organizations who can put them to good use."
    },
    {
      icon: Search,
      title: "Find Products",
      description: "Browse through available items and request what you need. Filter by category, location, and availability."
    },
    {
      icon: Truck,
      title: "Agent Network",
      description: "Our volunteer agents help with pickup and delivery, making the donation process seamless for everyone involved."
    },
    {
      icon: DollarSign,
      title: "Financial Support",
      description: "Contribute financially to help cover operational costs and support our mission of reducing waste and helping those in need."
    },
    {
      icon: ShieldCheck,
      title: "Verified Listings",
      description: "All product listings are verified by our team to ensure quality and accuracy of information."
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Our agents respond quickly to pickup and delivery requests, usually within 24-48 hours."
    },
    {
      icon: Globe,
      title: "Community Impact",
      description: "Track the environmental impact of your donations and see how you're helping to reduce waste."
    },
    {
      icon: Heart,
      title: "Support Local Causes",
      description: "Connect with local nonprofit organizations and help support their specific needs."
    }
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl mb-4">Platform Features</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Discover how WasteNot makes it easy to reduce waste and help others through our innovative features.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4 text-neutral-800">Our Key Features</h2>
            <p className="max-w-3xl mx-auto text-neutral-600">
              WasteNot provides a comprehensive set of features to make donating and finding items simple, 
              secure, and impactful for everyone involved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featureItems.map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4 text-neutral-800">How It Works</h2>
            <p className="max-w-3xl mx-auto text-neutral-600">
              Our process is designed to be simple and efficient for both donors and recipients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-neutral-800">List Your Items</h3>
              <p className="text-neutral-600">
                Create an account and list your unused items with a photo and description. 
                It only takes a few minutes to get started.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-neutral-800">Connect with Recipients</h3>
              <p className="text-neutral-600">
                Our platform matches your items with people or organizations in need. 
                You'll receive a notification when someone is interested.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-neutral-800">Coordinate Pickup</h3>
              <p className="text-neutral-600">
                Our volunteer agents help with pickup and delivery, or you can arrange a direct handoff. 
                It's secure and convenient.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Features;
