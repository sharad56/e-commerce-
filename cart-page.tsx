import { useCart } from "@/lib/cart";
import CartItemComponent from "@/components/cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";

export default function CartPage() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some products to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <CartItemComponent key={item.product.id} item={item} />
          ))}
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCheckout} className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Checkout (${total.toFixed(2)})
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}