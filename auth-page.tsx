import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Redirect } from "wouter";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: { username: "", password: "" },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: { username: "", password: "" },
  });

  const onLoginSubmit = async (data: any) => {
    try {
      await loginMutation.mutateAsync(data);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  const onRegisterSubmit = async (data: any) => {
    try {
      await registerMutation.mutateAsync(data);
      toast({
        title: "Registration successful",
        description: "Account created successfully!",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "Username already taken or invalid input.",
        variant: "destructive",
      });
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] grid md:grid-cols-2 gap-8 items-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome to E-commerce</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="login-username">Username</Label>
                    <Input id="login-username" {...loginForm.register("username")} />
                    {loginForm.formState.errors.username && (
                      <p className="text-sm text-red-500">{loginForm.formState.errors.username.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input type="password" id="login-password" {...loginForm.register("password")} />
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="register-username">Username</Label>
                    <Input id="register-username" {...registerForm.register("username")} />
                    {registerForm.formState.errors.username && (
                      <p className="text-sm text-red-500">{registerForm.formState.errors.username.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input type="password" id="register-password" {...registerForm.register("password")} />
                    {registerForm.formState.errors.password && (
                      <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? "Creating account..." : "Register"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="hidden md:flex flex-col items-center justify-center text-center space-y-4">
        <ShoppingCart className="h-24 w-24 text-primary" />
        <h2 className="text-3xl font-bold">Your One-Stop Shop</h2>
        <p className="text-muted-foreground max-w-md">
          Discover amazing products at great prices. Create an account to start shopping or login to continue your journey.
        </p>
      </div>
    </div>
  );
}