
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Star, TrendingUp } from "lucide-react";
import FreelanceCard, { FreelanceCardProps } from "./FreelanceCard";
import { useNavigate } from "react-router-dom";

interface FreelancesSectionProps {
  freelances: Omit<FreelanceCardProps, 'onContactClick'>[];
  onContactFreelance: (id: number) => void;
}

const FreelancesSection = ({ freelances, onContactFreelance }: FreelancesSectionProps) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const handleSeeMoreFreelances = () => {
    navigate("/explore");
  };

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Découvrez nos talents</h2>
          <p className="text-muted-foreground mt-2">Explorez les profils de freelances qui correspondent à vos besoins</p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex-shrink-0">
            <Button variant="outline" size="sm" className="flex gap-2 items-center">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
          </div>
          <div className="flex bg-muted rounded-md overflow-hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "bg-gigconnect-purple text-white" : ""}
            >
              Tous
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setActiveFilter("popular")}
              className={activeFilter === "popular" ? "bg-gigconnect-purple text-white" : ""}
            >
              <Star className="h-4 w-4 mr-1" /> Populaires
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setActiveFilter("new")}
              className={activeFilter === "new" ? "bg-gigconnect-purple text-white" : ""}
            >
              <TrendingUp className="h-4 w-4 mr-1" /> Nouveaux
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {freelances.map((freelance) => (
          <FreelanceCard 
            key={freelance.id} 
            {...freelance} 
            onContactClick={onContactFreelance}
          />
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button 
          variant="outline" 
          className="border-gigconnect-purple text-gigconnect-purple"
          onClick={handleSeeMoreFreelances}
        >
          Voir plus de freelances
        </Button>
      </div>
    </section>
  );
};

export default FreelancesSection;
