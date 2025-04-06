import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="bg-neutral-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="h-48 bg-neutral-300 relative">
        <img 
          src={product.image_url || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
          {product.category}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-1 text-neutral-800">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-600 mb-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-primary">FREE</span>
          <Button variant="ghost" className="text-blue-500 hover:text-blue-700 p-0">
            <Bookmark className="h-4 w-4 mr-1" />
            Reserve
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
