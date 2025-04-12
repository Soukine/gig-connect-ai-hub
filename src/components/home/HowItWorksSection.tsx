
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorksSection = () => {
  const navigate = useNavigate();
  
  const handleStartNow = () => {
    navigate("/auth");
  };

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold">Comment ça marche</h2>
        <p className="text-muted-foreground mt-2">
          GigConnect simplifie la connexion entre freelances et clients pour des collaborations réussies
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="text-center">
          <div className="h-20 w-20 rounded-full bg-gigconnect-lightpurple flex items-center justify-center mx-auto mb-4">
            <div className="h-12 w-12 rounded-full bg-gigconnect-purple text-white flex items-center justify-center text-xl font-bold">
              1
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Créez votre profil
          </h3>
          <p className="text-muted-foreground">
            Présentez vos compétences, votre portfolio et définissez vos tarifs pour attirer les bons clients.
          </p>
        </div>
        
        <div className="text-center">
          <div className="h-20 w-20 rounded-full bg-gigconnect-lightpurple flex items-center justify-center mx-auto mb-4">
            <div className="h-12 w-12 rounded-full bg-gigconnect-purple text-white flex items-center justify-center text-xl font-bold">
              2
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Trouvez des opportunités
          </h3>
          <p className="text-muted-foreground">
            Explorez les projets disponibles ou recevez des propositions directement des clients intéressés.
          </p>
        </div>
        
        <div className="text-center">
          <div className="h-20 w-20 rounded-full bg-gigconnect-lightpurple flex items-center justify-center mx-auto mb-4">
            <div className="h-12 w-12 rounded-full bg-gigconnect-purple text-white flex items-center justify-center text-xl font-bold">
              3
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Collaborez sereinement
          </h3>
          <p className="text-muted-foreground">
            Communiquez et échangez sur la plateforme avec notre système de paiement sécurisé.
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Button 
          className="bg-gigconnect-purple hover:bg-gigconnect-darkpurple"
          onClick={handleStartNow}
        >
          Commencer maintenant
        </Button>
      </div>
    </section>
  );
};

export default HowItWorksSection;
