import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Link } from "wouter";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group">
        <Link href={`/product/${product.id}`}>
          <AspectRatio ratio={1}>
            <img
              src={product.images[0]}
              alt={product.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </AspectRatio>
        </Link>
        <CardContent className="p-4">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold hover:underline truncate group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <p className="text-lg font-semibold text-primary mt-2">
            ${product.price}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() => addToCart(product)}
            variant="secondary"
            className="w-full transition-transform active:scale-95"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}