import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleFreelanceSignup = () => {
    toast({
      title: "Redirection vers l'inscription",
      description: "Créez votre compte indépendant en quelques étapes",
    });
    navigate("/auth", { state: { role: "freelance" } });
  };
  
  const handleClientSignup = () => {
    toast({
      title: "Redirection vers l'inscription",
      description: "Trouvez l'indépendant idéal pour votre projet",
    });
    navigate("/auth", { state: { role: "client" } });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gigconnect-purple/10 to-transparent dark:from-gigconnect-purple/5">
      <div className="absolute inset-0 bg-[url('/blur-bg.svg')] bg-no-repeat bg-cover opacity-30 animate-fade-in"></div>
      
      <div className="container mx-auto pt-20 pb-32 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 py-1.5 px-6 text-sm bg-white/10 text-gigconnect-purple dark:text-gigconnect-lightpurple backdrop-blur-lg border border-gigconnect-purple/20 hover:bg-white/20 transition-colors duration-300">
            Un nouvel espace pour les indépendants
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gigconnect-purple to-gigconnect-darkpurple bg-clip-text text-transparent tracking-tight leading-tight animate-fade-in select-none">
            Connectez vos talents aux meilleurs projets
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gigconnect-threads-text/80 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            La plateforme qui réunit indépendants et clients pour des collaborations
            réussies dans l'univers du digital.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="group rounded-full bg-gigconnect-purple hover:bg-gigconnect-purple/90 text-lg px-8 shadow-lg shadow-gigconnect-purple/25 hover:shadow-gigconnect-purple/40 transition-all duration-300"
              onClick={handleFreelanceSignup}
            >
              <Users className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Je suis un Indépendant 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group rounded-full border-gigconnect-purple/30 hover:border-gigconnect-purple text-gigconnect-purple dark:text-gigconnect-lightpurple hover:bg-gigconnect-purple/5 text-lg px-8 transition-all duration-300"
              onClick={handleClientSignup}
            >
              <Briefcase className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Je recherche un Indépendant
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <p className="text-sm text-muted-foreground mb-2">Découvrir</p>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
