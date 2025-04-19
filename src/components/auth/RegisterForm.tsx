
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AtSign, Lock, User, Github, Linkedin, Facebook, Briefcase, CheckCircle } from "lucide-react";

interface RegisterFormProps {
  onSubmit: (e: React.FormEvent) => void;
  userType: string;
  setUserType: (type: string) => void;
}

const RegisterForm = ({ onSubmit, userType, setUserType }: RegisterFormProps) => {
  return (
    <Card className="auth-card">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription className="text-gigconnect-threads-muted">
          Rejoignez GigConnect en quelques étapes simples
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Je m'inscris en tant que</Label>
            <RadioGroup 
              defaultValue={userType} 
              onValueChange={setUserType}
              className="flex space-x-1 bg-gigconnect-threads-bg border border-gigconnect-threads-border rounded-md p-1"
            >
              <div className={`flex-1 text-center rounded-sm py-1 px-2 text-sm ${userType === 'freelancer' ? 'bg-gigconnect-threads-accent text-white' : 'text-gigconnect-threads-muted'}`}>
                <RadioGroupItem 
                  value="freelancer" 
                  id="freelancer" 
                  className="sr-only" 
                />
                <Label 
                  htmlFor="freelancer" 
                  className="flex justify-center items-center cursor-pointer w-full"
                >
                  <Briefcase className="h-3.5 w-3.5 mr-1" />
                  Freelance
                </Label>
              </div>
              <div className={`flex-1 text-center rounded-sm py-1 px-2 text-sm ${userType === 'client' ? 'bg-gigconnect-threads-accent text-white' : 'text-gigconnect-threads-muted'}`}>
                <RadioGroupItem 
                  value="client" 
                  id="client" 
                  className="sr-only" 
                />
                <Label 
                  htmlFor="client" 
                  className="flex justify-center items-center cursor-pointer w-full"
                >
                  <User className="h-3.5 w-3.5 mr-1" />
                  Client
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {userType === "freelancer" ? (
            <div className="bg-gigconnect-threads-accent/10 rounded-md p-3 mb-2 border border-gigconnect-threads-accent/20 animate-fade-in">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-gigconnect-threads-accent mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Avantages freelance :</p>
                  <ul className="text-xs mt-1 space-y-1 text-gigconnect-threads-text/80">
                    <li>• Mise en avant de votre portfolio</li>
                    <li>• Accès à des projets pertinents</li>
                    <li>• Paiements sécurisés</li>
                    <li>• -15% de commission sur vos 5 premiers projets</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gigconnect-threads-accent/10 rounded-md p-3 mb-2 border border-gigconnect-threads-accent/20 animate-fade-in">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-gigconnect-threads-accent mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Avantages client :</p>
                  <ul className="text-xs mt-1 space-y-1 text-gigconnect-threads-text/80">
                    <li>• Accès à des freelances vérifiés</li>
                    <li>• Système de mise en relation par IA</li>
                    <li>• Protection des paiements</li>
                    <li>• Support client prioritaire</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">Prénom</Label>
              <Input 
                id="first-name" 
                placeholder="Prénom" 
                className="auth-input pl-3"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Nom</Label>
              <Input 
                id="last-name" 
                placeholder="Nom" 
                className="auth-input pl-3"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-3 h-4 w-4 text-gigconnect-threads-muted" />
              <Input 
                id="register-email" 
                type="email" 
                placeholder="votre@email.com" 
                className="auth-input"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gigconnect-threads-muted" />
              <Input 
                id="register-password" 
                type="password" 
                placeholder="••••••••" 
                className="auth-input"
                required
              />
            </div>
            <p className="text-xs text-gigconnect-threads-muted">
              Minimum 8 caractères, incluant chiffres et lettres
            </p>
          </div>
          
          <Button type="submit" className="w-full threads-button">
            Créer mon compte
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gigconnect-threads-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-gigconnect-threads-card text-gigconnect-threads-muted">
                Ou s'inscrire avec
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
            <Button 
              variant="outline" 
              className="auth-social-btn"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
          </div>
          
          <p className="text-xs text-gigconnect-threads-muted text-center mt-4">
            En vous inscrivant, vous acceptez nos{" "}
            <a href="#" className="text-gigconnect-threads-accent hover:underline">
              Conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="text-gigconnect-threads-accent hover:underline">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
