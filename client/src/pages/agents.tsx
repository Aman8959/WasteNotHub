import { useQuery } from "@tanstack/react-query";
import AgentCard from "@/components/agent-card";
import { Agent } from "@shared/schema";
import { Button } from "@/components/ui/button";

const Agents = () => {
  const { data: agents = [], isLoading } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
  });

  return (
    <main className="flex-grow">
      {/* Header Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl mb-4">Our Distribution Agents</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Meet the dedicated volunteers who help us collect and distribute donations throughout the community.
          </p>
        </div>
      </section>

      {/* Agents List Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4 text-neutral-800">Meet Our Team</h2>
            <p className="max-w-3xl mx-auto text-neutral-600">
              Our volunteer agents are passionate about reducing waste and helping those in need.
              They handle pickup, delivery, and ensure items get to the right recipients.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-neutral-100 h-96 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become an Agent Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl mb-4 text-neutral-800">Become a Volunteer Agent</h2>
            <p className="text-neutral-600 mb-8">
              Join our network of dedicated volunteers and help us make a positive impact in the community.
              As an agent, you'll help with pickup, delivery, and connecting donors with recipients.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-4 text-neutral-800">Why Become an Agent?</h3>
              <ul className="text-left mb-6 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                  <span>Make a tangible difference in your community</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                  <span>Flexible scheduling that works around your availability</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                  <span>Connect with like-minded individuals who care about sustainability</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                  <span>Receive training and support from our experienced team</span>
                </li>
              </ul>
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                Apply to Become an Agent
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Agents;
