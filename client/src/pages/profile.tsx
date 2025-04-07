import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Package, Users, Settings, LogOut } from "lucide-react";
import { Link } from "wouter";

export default function ProfilePage() {
  const { user, logoutMutation } = useAuth();
  
  if (!user) {
    return null; // Protected route will handle redirect
  }
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const getInitials = (name: string | null) => {
    if (!name) return user.username.substring(0, 2).toUpperCase();
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="container mx-auto p-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={`https://avatar.vercel.sh/${user.username}`} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name || user.username}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    होम 
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/products">
                    <Package className="mr-2 h-5 w-5" />
                    प्रोडक्ट्स
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/agents">
                    <Users className="mr-2 h-5 w-5" />
                    एजेंट्स
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-5 w-5" />
                  सेटिंग्स
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  {logoutMutation.isPending ? "लॉग आउट हो रहा है..." : "लॉग आउट"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">WasteNot में आपका स्वागत है</CardTitle>
              <CardDescription>आपके अकाउंट का ओवरव्यू</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-muted rounded-lg text-center">
                <h3 className="text-xl font-medium mb-4">आप अकाउंट सफलतापूर्वक बना चुके हैं</h3>
                <p className="mb-6 text-muted-foreground">
                  अब आप अपने अनुपयोगी सामान लिस्ट कर सकते हैं और दूसरों के साथ साझा कर सकते हैं। साथ ही हमारे एजेंटों के माध्यम से वितरण का समर्थन करने के लिए दान भी कर सकते हैं।
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild>
                    <Link href="/products">
                      <Package className="mr-2 h-5 w-5" />
                      प्रोडक्ट्स देखें
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/donate">
                      दान करें
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="products">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="products" className="flex-1">मेरे प्रोडक्ट्स</TabsTrigger>
              <TabsTrigger value="donations" className="flex-1">मेरे दान</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>आपके द्वारा शेयर किए गए प्रोडक्ट्स</CardTitle>
                  <CardDescription>आपके द्वारा लिस्ट किए गए प्रोडक्ट्स</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* This will be populated with product data later */}
                  <div className="py-12 text-center text-muted-foreground">
                    <Package className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
                    <p>आपने अभी तक कोई प्रोडक्ट शेयर नहीं किया है</p>
                    <Button className="mt-4" asChild>
                      <Link href="/products">
                        प्रोडक्ट शेयर करें
                      </Link>
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    अनुपयोगी सामानों को शेयर करके अपशिष्ट को कम करने में मदद करें
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="donations">
              <Card>
                <CardHeader>
                  <CardTitle>आपके दान</CardTitle>
                  <CardDescription>आपके द्वारा किए गए दान का विवरण</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* This will be populated with donation data later */}
                  <div className="py-12 text-center text-muted-foreground">
                    <Users className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
                    <p>आपने अभी तक कोई दान नहीं किया है</p>
                    <Button className="mt-4" asChild>
                      <Link href="/donate">
                        दान करें
                      </Link>
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    आपके दान से हमारे एजेंटों का समर्थन किया जाता है और जरूरतमंद लोगों तक पहुंचने में मदद मिलती है
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}