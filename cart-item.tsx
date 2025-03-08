import { CartItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartItemComponent({ item }: { item: CartItem }) {
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4">
      <img
        src={item.product.images[0]}
        alt={item.product.title}
        className="h-20 w-20 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-medium">{item.product.title}</h3>
        <p className="text-sm text-muted-foreground">
          ${item.product.price} × {item.quantity}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => removeFromCart(item.product)}
        >
          {item.quantity === 1 ? (
            <Trash2 className="h-4 w-4" />
          ) : (
            <Minus className="h-4 w-4" />
          )}
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => addToCart(item.product)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right font-medium w-24">
        ${(item.product.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}