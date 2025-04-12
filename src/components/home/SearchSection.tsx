
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSearch = (type: string) => {
    if (type === "freelance") {
      toast({
        title: "Recherche de freelances",
        description: `Recherche: ${searchQuery || "Tous"}, Catégorie: ${selectedCategory || "Toutes"}`,
      });
      navigate("/explore", { 
        state: { 
          query: searchQuery, 
          category: selectedCategory 
        } 
      });
    } else {
      toast({
        title: "Recherche de projets",
        description: `Recherche: ${searchQuery || "Tous"}, Budget: ${selectedBudget || "Tous"}`,
      });
      navigate("/jobs", { 
        state: { 
          query: searchQuery, 
          budget: selectedBudget 
        } 
      });
    }
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-xl p-6">
      <Tabs defaultValue="freelance" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/10 dark:bg-white/5 rounded-xl p-1 border border-white/10">
          <TabsTrigger value="freelance" className="rounded-lg py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gigconnect-purple/20 data-[state=active]:text-gigconnect-purple dark:data-[state=active]:text-white text-base">
            Trouver un Freelance
          </TabsTrigger>
          <TabsTrigger value="project" className="rounded-lg py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gigconnect-purple/20 data-[state=active]:text-gigconnect-purple dark:data-[state=active]:text-white text-base">
            Trouver un Projet
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="freelance" className="p-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une compétence ou un service..."
                className="landing-input pl-12 w-full h-14 bg-white/5 border border-white/10 rounded-xl text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-56">
              <select 
                className="landing-input w-full appearance-none pr-10 h-14 bg-white/5 border border-white/10 rounded-xl text-base"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Toutes catégories</option>
                <option value="design">Design & Créatif</option>
                <option value="dev">Développement</option>
                <option value="marketing">Marketing</option>
                <option value="writing">Rédaction</option>
                <option value="video">Vidéo & Animation</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            <Button 
              className="bg-gigconnect-purple hover:bg-gigconnect-purple/90 rounded-xl h-14 px-8 text-base"
              onClick={() => handleSearch("freelance")}
            >
              Rechercher
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="project" className="p-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un projet ou une mission..."
                className="landing-input pl-12 w-full h-14 bg-white/5 border border-white/10 rounded-xl text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-56">
              <select 
                className="landing-input w-full appearance-none pr-10 h-14 bg-white/5 border border-white/10 rounded-xl text-base"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
              >
                <option value="">Budget</option>
                <option value="small">Moins de 500€</option>
                <option value="medium">500€ - 2000€</option>
                <option value="large">Plus de 2000€</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            <Button 
              className="bg-gigconnect-purple hover:bg-gigconnect-purple/90 rounded-xl h-14 px-8 text-base"
              onClick={() => handleSearch("project")}
            >
              Rechercher
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Statistiques */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-3xl font-bold text-gigconnect-purple">10k+</p>
          <p className="text-sm text-muted-foreground">Freelances</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-gigconnect-purple">5k+</p>
          <p className="text-sm text-muted-foreground">Clients satisfaits</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-gigconnect-purple">8k+</p>
          <p className="text-sm text-muted-foreground">Projets réalisés</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-gigconnect-purple">15+</p>
          <p className="text-sm text-muted-foreground">Pays</p>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
