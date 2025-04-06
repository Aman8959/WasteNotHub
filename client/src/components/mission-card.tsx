import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MissionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const MissionCard = ({ icon: Icon, title, description }: MissionCardProps) => {
  return (
    <Card className="bg-neutral-50 rounded-lg p-6 text-center">
      <CardHeader className="p-0 pb-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="text-white text-2xl" />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-3 text-neutral-800">{title}</h3>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-neutral-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default MissionCard;
