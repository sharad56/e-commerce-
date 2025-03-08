import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Product, Review } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart, Plus, Minus, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewForm from "@/components/review-form";
import { Separator } from "@/components/ui/separator";

export default function ProductPage() {
  const [, params] = useRoute("/product/:id");
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${params?.id}`],
    queryFn: async () => {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params?.id}`);
      const data = await res.json();
      return {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category.name,
        images: data.images
      };
    },
    enabled: !!params?.id
  });

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: [`/api/products/${params?.id}/reviews`],
    queryFn: async () => {
      const res = await fetch(`/api/products/${params?.id}/reviews`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!params?.id
  });

  const quantity = product ? getItemQuantity(product) : 0;

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="h-96" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <AspectRatio ratio={1}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="rounded-lg object-cover w-full h-full"
          />
        </AspectRatio>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-5 h-5 ${
                      value <= averageRating ? "fill-current" : "stroke-current"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                ({reviews.length} reviews)
              </span>
            </div>
            <p className="text-2xl font-semibold text-primary mt-2">
              ${product.price}
            </p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex items-center gap-4">
            {quantity > 0 ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeFromCart(product)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => addToCart(product)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => addToCart(product)} className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <Separator />

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <ReviewForm
          productId={product.id}
          onSuccess={() =>
            queryClient.invalidateQueries({
              queryKey: [`/api/products/${params?.id}/reviews`],
            })
          }
        />

        <AnimatePresence>
          <div className="space-y-4">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-4 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.username}</span>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                          key={value}
                          className={`w-4 h-4 ${
                            value <= review.rating ? "fill-current" : "stroke-current"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}