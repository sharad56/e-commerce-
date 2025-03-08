import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/lib/cart";
import { ShoppingCart, LogIn, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">E-commerce</h1>
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/cart">
                <Button variant="ghost" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button variant="ghost">
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
