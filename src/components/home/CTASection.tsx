
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gigconnect-navy text-white">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">
          Prêt à faire décoller votre carrière freelance ?
        </h2>
        <p className="text-lg mb-8 text-white/80">
          Rejoignez GigConnect dès aujourd'hui et connectez-vous avec des clients à la recherche de vos compétences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-gigconnect-purple hover:bg-gigconnect-purple/90"
            onClick={() => navigate("/auth", { state: { signupMode: true } })}
          >
            S'inscrire gratuitement
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-gigconnect-navy"
            onClick={() => navigate("/explore")}
          >
            En savoir plus
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
