
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Bell, Sun, Moon, Globe, Shield, CreditCard, LogOut, User, UserCog, Volume2, Eye, PencilLine } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Settings = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    twoFactorAuth: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="container py-10 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="mb-8 w-full justify-start overflow-x-auto">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and public profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center relative group">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <PencilLine className="text-white h-5 w-5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Alex Johnson</h3>
                    <p className="text-sm text-muted-foreground">Web Developer at Freelance</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Alex Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="alexj" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="alex@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>

                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="space-y-2 border rounded-md p-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Advanced Settings</h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isOpen ? "Hide" : "Show"}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <div className="flex gap-2">
                        <Input id="api-key" defaultValue="sk-****************" type="password" />
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-destructive"></div>
                        <p className="text-sm font-medium">Danger Zone</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Permanently delete your account and all of its contents from the platform.
                        This action is not reversible – please continue with caution.
                      </p>
                      <Button variant="destructive" size="sm" className="mt-2">
                        Delete Account
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the application looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <div className="flex gap-4">
                    <div
                      onClick={() => setTheme("light")}
                      className={`flex flex-col items-center space-y-2 p-3 border rounded-md cursor-pointer transition-all ${
                        theme === "light" ? "border-primary bg-accent/20" : "border-border"
                      }`}
                    >
                      <Sun className={`h-5 w-5 ${theme === "light" ? "text-primary" : ""}`} />
                      <span className="text-sm">Light</span>
                    </div>
                    <div
                      onClick={() => setTheme("dark")}
                      className={`flex flex-col items-center space-y-2 p-3 border rounded-md cursor-pointer transition-all ${
                        theme === "dark" ? "border-primary bg-accent/20" : "border-border"
                      }`}
                    >
                      <Moon className={`h-5 w-5 ${theme === "dark" ? "text-primary" : ""}`} />
                      <span className="text-sm">Dark</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Small", "Medium", "Large"].map((size) => (
                      <div
                        key={size}
                        className={`flex items-center justify-center py-2 border rounded-md cursor-pointer ${
                          size === "Medium" ? "border-primary bg-accent/20" : "border-border"
                        }`}
                      >
                        <span className="text-sm">{size}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">Reduce the spacing between items</p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduce-animations">Reduce Animations</Label>
                      <p className="text-sm text-muted-foreground">Minimize motion effects throughout the interface</p>
                    </div>
                    <Switch id="reduce-animations" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications for important updates</p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <Separator />

                <div className={`space-y-4 ${!notifications ? "opacity-50 pointer-events-none" : ""}`}>
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  
                  {["New Messages", "Project Updates", "Billing Alerts", "Newsletter"].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="text-sm">{item}</span>
                      <Switch defaultChecked={item !== "Newsletter"} />
                    </div>
                  ))}

                  <h3 className="text-sm font-medium mt-6">Push Notifications</h3>
                  
                  {["Direct Messages", "Mentions", "New Projects", "Reminders"].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="text-sm">{item}</span>
                      <Switch defaultChecked={item !== "Reminders"} />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sound">Notification Sounds</Label>
                      <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                    </div>
                    <Switch
                      id="sound"
                      checked={sound}
                      onCheckedChange={setSound}
                    />
                  </div>
                  
                  {sound && (
                    <div className="flex items-center gap-2 mt-4 pl-2">
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Sound volume</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="70"
                        className="flex-1 h-2 accent-primary"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} className="ml-auto">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your privacy settings and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Profile Visibility</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {["Public", "Friends only", "Private"].map((option) => (
                      <div
                        key={option}
                        onClick={() => setPrivacy({...privacy, profileVisibility: option.toLowerCase()})}
                        className={`flex items-center justify-center p-2 border rounded-md cursor-pointer transition-all ${
                          privacy.profileVisibility === option.toLowerCase() ? "border-primary bg-accent/20" : "border-border"
                        }`}
                      >
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {privacy.profileVisibility === "public" && "Anyone can view your profile and portfolio"}
                    {privacy.profileVisibility === "friends only" && "Only connections can view your full profile"}
                    {privacy.profileVisibility === "private" && "Your profile is only visible to you"}
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={privacy.twoFactorAuth}
                    onCheckedChange={(checked) => setPrivacy({...privacy, twoFactorAuth: checked})}
                  />
                </div>

                {privacy.twoFactorAuth && (
                  <div className="mt-4 p-4 border rounded-md bg-muted/50">
                    <h4 className="text-sm font-medium">Two-Factor Authentication Setup</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Scan the QR code with your authenticator app or enter the code manually
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
                      <div className="h-32 w-32 bg-secondary flex items-center justify-center">
                        <span className="text-xs text-center text-muted-foreground">QR Code Placeholder</span>
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="auth-code">Enter Authentication Code</Label>
                        <div className="flex gap-2">
                          <Input id="auth-code" placeholder="6-digit code" />
                          <Button variant="outline" size="sm">Verify</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Backup code: <span className="font-mono">XXXX-XXXX-XXXX-XXXX</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Security Options</h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Login Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Suspicious Activity Alerts</span>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require Password for Sensitive Actions</span>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button variant="outline" className="w-full mt-2">
                    View Login History
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} className="ml-auto">Save Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing and Payments</CardTitle>
                <CardDescription>Manage your billing information and subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md bg-accent/10 border border-accent/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Current Plan</h3>
                      <p className="text-sm text-muted-foreground">Professional Plan</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">$29.99/month</span>
                      <p className="text-xs text-muted-foreground">Next billing date: May 15, 2025</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment Methods</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs">VISA</div>
                        <div>
                          <p className="text-sm font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 09/25</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded">Default</span>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs">MC</div>
                        <div>
                          <p className="text-sm font-medium">Mastercard ending in 5678</p>
                          <p className="text-xs text-muted-foreground">Expires 12/26</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Billing History</h3>
                  
                  <div className="space-y-2 text-sm">
                    {[
                      { date: "Apr 1, 2025", amount: "$29.99", status: "Paid" },
                      { date: "Mar 1, 2025", amount: "$29.99", status: "Paid" },
                      { date: "Feb 1, 2025", amount: "$29.99", status: "Paid" }
                    ].map((invoice, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div>
                          <p>{invoice.date}</p>
                          <p className="text-xs text-muted-foreground">Professional Plan</p>
                        </div>
                        <div className="text-right">
                          <p>{invoice.amount}</p>
                          <span className="text-xs text-green-500">{invoice.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    View All Invoices
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  Cancel Subscription
                </Button>
                <Button>Update Plan</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
