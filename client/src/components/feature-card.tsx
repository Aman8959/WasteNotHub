import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="flex bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-24 flex-shrink-0 bg-primary flex items-center justify-center">
        <Icon className="text-white text-2xl" />
      </div>
      <CardContent className="p-6">
        <h3 className="font-heading font-semibold text-xl mb-2 text-neutral-800">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
