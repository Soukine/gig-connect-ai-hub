
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AtSign, Lock, Github, Linkedin } from "lucide-react";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <Card className="auth-card">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription className="text-gigconnect-threads-muted">
          Connectez-vous à votre compte GigConnect
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-3 h-4 w-4 text-gigconnect-threads-muted" />
              <Input 
                id="login-email" 
                type="email" 
                placeholder="votre@email.com" 
                className="auth-input"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="login-password">Mot de passe</Label>
              <a href="#" className="text-xs text-gigconnect-threads-accent hover:underline">
                Mot de passe oublié?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gigconnect-threads-muted" />
              <Input 
                id="login-password" 
                type="password" 
                placeholder="••••••••" 
                className="auth-input"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full threads-button">
            Se connecter
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gigconnect-threads-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-gigconnect-threads-card text-gigconnect-threads-muted">
                Ou continuer avec
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <Button 
              variant="outline" 
              className="auth-social-btn"
            >
              <Github className="h-4 w-4 mr-2" />
              Github
            </Button>
            <Button 
              variant="outline" 
              className="auth-social-btn"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
