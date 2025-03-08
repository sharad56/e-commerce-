import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState<"none" | "price-asc" | "price-desc">("none");

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery<string[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/categories");
      const data = await res.json();
      return data.map((cat: any) => cat.name);
    }
  });

  const { data: products, isLoading: productsLoading, error: productsError } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await res.json();
      return data.map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category.name,
        images: product.images
      }));
    }
  });

  const filteredProducts = products?.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  const isLoading = categoriesLoading || productsLoading;
  const error = categoriesError || productsError;

  if (error) {
    return (
      <div className="text-center text-destructive">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-4">
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Min Price: ${minPrice}</Label>
                      <Slider
                        value={[minPrice]}
                        onValueChange={(value) => setMinPrice(value[0])}
                        max={1000}
                        step={10}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Max Price: ${maxPrice}</Label>
                      <Slider
                        value={[maxPrice]}
                        onValueChange={(value) => setMaxPrice(value[0])}
                        max={1000}
                        step={10}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select value={sort} onValueChange={(value: any) => setSort(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {filteredProducts?.length} products found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}