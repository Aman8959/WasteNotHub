import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import MissionCard from "@/components/mission-card";
import FeatureCard from "@/components/feature-card";
import ProductCard from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import { Heart, Users, Leaf, Gift, Search, Truck, DollarSign, Package, HandHelping } from "lucide-react";
import { Product } from "@shared/schema";

const Home = () => {
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Feature samples
  const missionItems = [
    {
      icon: Heart,
      title: "Reduce Waste",
      description: "Help prevent usable items from ending up in landfills by sharing them with people who need them."
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Connect with neighbors and local organizations to create a stronger, more supportive community."
    },
    {
      icon: Leaf,
      title: "Support Sustainability",
      description: "Make a positive environmental impact by extending the lifecycle of products through reuse."
    }
  ];

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
    }
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-neutral-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4">Reduce Waste, Help Others</h1>
            <p className="text-lg md:text-xl mb-8">
              WasteNot connects people with surplus items to those in need, creating a more sustainable community for everyone.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/products?action=donate">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-dark">
                  Donate Items
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4 text-neutral-800">Our Mission</h2>
            <p className="max-w-3xl mx-auto text-neutral-600">
              We're on a mission to minimize waste by connecting people with reusable items to those in need, 
              while building a more sustainable and supportive community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionItems.map((item, index) => (
              <MissionCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4 text-neutral-800">Key Features</h2>
            <p className="max-w-3xl mx-auto text-neutral-600">
              Our platform makes it easy to donate, discover, and distribute unused items to those who need them most.
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

      {/* Products Preview Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="font-heading font-bold text-3xl text-neutral-800 mb-4 md:mb-0">Available Products</h2>
          </div>
          
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-neutral-100 h-64 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <Package className="text-primary mx-auto h-12 w-12 mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-4 text-neutral-800">Have Items to Donate?</h3>
              <p className="text-neutral-600 mb-6">
                List your unused items to help those in need and reduce waste in our community.
              </p>
              <Link href="/products?action=donate">
                <Button className="bg-primary hover:bg-primary-dark">
                  Donate Items
                </Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center">
              <HandHelping className="text-primary mx-auto h-12 w-12 mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-4 text-neutral-800">Become a Volunteer Agent</h3>
              <p className="text-neutral-600 mb-6">
                Join our network of volunteers helping with pickup, delivery, and distribution of donations.
              </p>
              <Link href="/agents">
                <Button className="bg-primary hover:bg-primary-dark">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
