import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "नाम आवश्यक है"),
  password: z.string().min(6, "पासवर्ड कम से कम 6 अक्षर का होना चाहिए"),
});

const registerSchema = z.object({
  username: z.string().min(3, "नाम कम से कम 3 अक्षर का होना चाहिए"),
  email: z.string().email("सही ईमेल आईडी दर्ज करें"),
  password: z.string().min(6, "पासवर्ड कम से कम 6 अक्षर का होना चाहिए"),
  name: z.string().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();
  
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      name: "",
    },
  });
  
  const onLoginSubmit = (data: LoginValues) => {
    loginMutation.mutate(data);
  };
  
  const onRegisterSubmit = (data: RegisterValues) => {
    registerMutation.mutate(data);
  };
  
  // Redirect if already logged in
  if (user) {
    setLocation("/");
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-center">
        <div className="order-2 md:order-1">
          <Card className="w-full max-w-md mx-auto dark:bg-gray-900">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">वेस्टनॉट में आपका स्वागत है</CardTitle>
              <CardDescription>नीचे अपने अकाउंट में लॉगिन करें या नया अकाउंट बनाएं</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue={activeTab} 
                onValueChange={setActiveTab} 
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">लॉगिन</TabsTrigger>
                  <TabsTrigger value="register">रजिस्टर</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>यूजरनेम</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="आपका यूजरनेम" 
                                disabled={loginMutation.isPending} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>पासवर्ड</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="आपका पासवर्ड" 
                                disabled={loginMutation.isPending} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "लॉगिन हो रहा है..." : "लॉगिन करें"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>यूजरनेम</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="एक यूनिक यूजरनेम चुनें" 
                                disabled={registerMutation.isPending} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ईमेल</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="आपका ईमेल एड्रेस" 
                                disabled={registerMutation.isPending} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>नाम (वैकल्पिक)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="आपका पूरा नाम" 
                                disabled={registerMutation.isPending} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>पासवर्ड</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="पासवर्ड (कम से कम 6 अक्षर)" 
                                disabled={registerMutation.isPending} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "अकाउंट बन रहा है..." : "रजिस्टर करें"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground text-center">
                {activeTab === "login" 
                  ? "अकाउंट नहीं है? ऊपर 'रजिस्टर' टैब पर क्लिक करें।" 
                  : "पहले से अकाउंट है? ऊपर 'लॉगिन' टैब पर क्लिक करें।"}
              </p>
            </CardFooter>
          </Card>
        </div>
        
        <div className="order-1 md:order-2 p-6 bg-muted rounded-lg flex flex-col items-center text-center">
          <Recycle className="h-16 w-16 mb-6 text-primary" />
          <h2 className="text-3xl font-bold mb-4">वेस्टनॉट के साथ अपशिष्ट को कम करें</h2>
          <p className="text-muted-foreground mb-6">
            अनुपयोगी वस्तुओं को दान करके और जरूरतमंदों के लिए संसाधनों का पुन: उपयोग करके हम मिलकर पर्यावरण का बचाव कर सकते हैं।
          </p>
          <div className="space-y-4 text-left w-full max-w-md">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Recycle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">अनुपयोगी वस्तुओं को साझा करें</h3>
                <p className="text-sm text-muted-foreground">
                  आपके पुराने सामान किसी और के लिए उपयोगी हो सकते हैं। उन्हें फेंकने के बजाय हमारे प्लेटफॉर्म पर शेयर करें।
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Recycle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">जरूरतमंद लोगों तक पहुंचाएं</h3>
                <p className="text-sm text-muted-foreground">
                  हमारे एजेंट्स वितरण में मदद करते हैं, यह सुनिश्चित करते हुए कि आपका दान वहां पहुंचे जहां इसकी सबसे ज्यादा जरूरत है।
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Recycle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">पर्यावरण को बचाएं</h3>
                <p className="text-sm text-muted-foreground">
                  हर दान किए गए आइटम के साथ, आप अपशिष्ट को कम करते हैं और एक अधिक टिकाऊ कल का निर्माण करते हैं।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}