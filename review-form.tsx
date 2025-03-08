import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Star, StarOff } from "lucide-react";
import { motion } from "framer-motion";
import { reviewSchema, type InsertReview } from "@shared/schema";

export default function ReviewForm({ 
  productId, 
  onSuccess 
}: { 
  productId: number;
  onSuccess: () => void;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const review: InsertReview = { rating, comment };
      await reviewSchema.parseAsync(review);
      
      setIsSubmitting(true);
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to submit review");

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });

      setRating(0);
      setComment("");
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <motion.button
            key={value}
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setRating(value)}
            className="text-yellow-400"
          >
            {value <= rating ? (
              <Star className="w-6 h-6 fill-current" />
            ) : (
              <StarOff className="w-6 h-6" />
            )}
          </motion.button>
        ))}
      </div>

      <Textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px]"
      />

      <Button type="submit" disabled={isSubmitting || rating === 0 || !comment}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
