import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from "lucide-react";
import { Agent } from "@shared/schema";

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  // Generate star rating based on agent's rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-yellow-400 h-4 w-4" />);
    }
    
    return stars;
  };

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-neutral-300">
        <img
          src={agent.image_url || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={agent.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-heading font-semibold text-xl mb-2 text-neutral-800">
          {agent.name}
        </h3>
        <p className="text-neutral-600 mb-4">{agent.area}</p>
        <div className="flex items-center text-yellow-400 mb-4">
          {renderRating(agent.rating)}
          <span className="ml-2 text-neutral-600">({agent.rating.toFixed(1)})</span>
        </div>
        <p className="text-sm text-neutral-600 mb-4">{agent.bio}</p>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Contact {agent.name.split(' ')[0]}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
