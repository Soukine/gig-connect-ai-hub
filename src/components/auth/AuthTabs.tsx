
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabs = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("freelancer");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Connexion réussie",
      description: "Vous êtes maintenant connecté à votre compte GigConnect.",
    });
    
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Inscription réussie",
      description: `Votre compte ${userType === "freelancer" ? "freelance" : "client"} a été créé avec succès.`,
    });
    
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login" className="text-sm py-2.5 auth-tab">
          Connexion
        </TabsTrigger>
        <TabsTrigger value="register" className="text-sm py-2.5 auth-tab">
          Inscription
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="login" className="auth-form-appear">
        <LoginForm onSubmit={handleLogin} />
      </TabsContent>
      
      <TabsContent value="register" className="auth-form-appear">
        <RegisterForm 
          onSubmit={handleRegister} 
          userType={userType} 
          setUserType={setUserType} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
