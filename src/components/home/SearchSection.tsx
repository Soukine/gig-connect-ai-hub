import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, Users, Briefcase, FileSearch, Trophy } from "lucide-react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSearch = (type: string) => {
    if (!searchQuery.trim() && type === 'freelance' && !selectedCategory) {
      toast({
        title: "Recherche vide",
        description: "Veuillez entrer un terme de recherche ou sélectionner une catégorie",
        variant: "destructive",
      });
      return;
    }

    if (!searchQuery.trim() && type === 'project' && !selectedBudget) {
      toast({
        title: "Recherche vide",
        description: "Veuillez entrer un terme de recherche ou sélectionner un budget",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: type === "freelance" ? "Recherche de freelances" : "Recherche de projets",
      description: `Recherche: ${searchQuery || "Tous"}, ${type === "freelance" ? `Catégorie: ${selectedCategory || "Toutes"}` : `Budget: ${selectedBudget || "Tous"}`}`,
    });
    
    navigate(type === "freelance" ? "/explore" : "/jobs", { 
      state: { 
        query: searchQuery, 
        ...(type === "freelance" 
          ? { category: selectedCategory }
          : { budget: selectedBudget }
        )
      } 
    });
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-xl p-6 animate-fade-in">
      <Tabs defaultValue="freelance" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/10 dark:bg-white/5 rounded-xl p-1 border border-white/10">
          <TabsTrigger 
            value="freelance" 
            className="rounded-lg py-2 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gigconnect-purple/20 data-[state=active]:text-gigconnect-purple dark:data-[state=active]:text-white flex items-center gap-2 transition-all duration-300"
          >
            <Users className="h-4 w-4" />
            Trouver un Freelance
          </TabsTrigger>
          <TabsTrigger 
            value="project" 
            className="rounded-lg py-2 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gigconnect-purple/20 data-[state=active]:text-gigconnect-purple dark:data-[state=active]:text-white flex items-center gap-2 transition-all duration-300"
          >
            <Briefcase className="h-4 w-4" />
            Trouver un Projet
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="freelance" className="p-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-hover:text-gigconnect-purple transition-colors duration-300" />
              <input
                type="text"
                placeholder="Rechercher une compétence ou un service..."
                className="landing-input pl-12 w-full h-14 bg-white/5 border border-white/10 rounded-xl text-base transition-all duration-300 focus:border-gigconnect-purple focus:ring-1 focus:ring-gigconnect-purple"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-56 group">
              <select 
                className="landing-input w-full appearance-none pr-10 h-14 bg-white/5 border border-white/10 rounded-xl text-base transition-all duration-300 focus:border-gigconnect-purple focus:ring-1 focus:ring-gigconnect-purple cursor-pointer"
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
              <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-hover:text-gigconnect-purple pointer-events-none transition-colors duration-300" />
            </div>
            <Button 
              className="group bg-gigconnect-purple hover:bg-gigconnect-purple/90 rounded-xl h-14 px-8 text-base transition-all duration-300 hover:shadow-lg hover:shadow-gigconnect-purple/25"
              onClick={() => handleSearch("freelance")}
            >
              <FileSearch className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Rechercher
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="project" className="p-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-hover:text-gigconnect-purple transition-colors duration-300" />
              <input
                type="text"
                placeholder="Rechercher un projet ou une mission..."
                className="landing-input pl-12 w-full h-14 bg-white/5 border border-white/10 rounded-xl text-base transition-all duration-300 focus:border-gigconnect-purple focus:ring-1 focus:ring-gigconnect-purple"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-56 group">
              <select 
                className="landing-input w-full appearance-none pr-10 h-14 bg-white/5 border border-white/10 rounded-xl text-base transition-all duration-300 focus:border-gigconnect-purple focus:ring-1 focus:ring-gigconnect-purple cursor-pointer"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
              >
                <option value="">Budget</option>
                <option value="small">Moins de 500€</option>
                <option value="medium">500€ - 2000€</option>
                <option value="large">Plus de 2000€</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-hover:text-gigconnect-purple pointer-events-none transition-colors duration-300" />
            </div>
            <Button 
              className="group bg-gigconnect-purple hover:bg-gigconnect-purple/90 rounded-xl h-14 px-8 text-base transition-all duration-300 hover:shadow-lg hover:shadow-gigconnect-purple/25"
              onClick={() => handleSearch("project")}
            >
              <FileSearch className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Rechercher
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
        <div className="text-center group cursor-help transition-all duration-300 hover:scale-105">
          <p className="text-3xl font-bold text-gigconnect-purple group-hover:text-gigconnect-darkpurple transition-colors duration-300">
            <Users className="h-8 w-8 mb-2 mx-auto" />
            10k+
          </p>
          <p className="text-sm text-muted-foreground group-hover:text-gigconnect-purple transition-colors duration-300">Freelances</p>
        </div>
        <div className="text-center group cursor-help transition-all duration-300 hover:scale-105">
          <p className="text-3xl font-bold text-gigconnect-purple group-hover:text-gigconnect-darkpurple transition-colors duration-300">
            <Trophy className="h-8 w-8 mb-2 mx-auto" />
            5k+
          </p>
          <p className="text-sm text-muted-foreground group-hover:text-gigconnect-purple transition-colors duration-300">Clients satisfaits</p>
        </div>
        <div className="text-center group cursor-help transition-all duration-300 hover:scale-105">
          <p className="text-3xl font-bold text-gigconnect-purple group-hover:text-gigconnect-darkpurple transition-colors duration-300">
            <Briefcase className="h-8 w-8 mb-2 mx-auto" />
            8k+
          </p>
          <p className="text-sm text-muted-foreground group-hover:text-gigconnect-purple transition-colors duration-300">Projets réalisés</p>
        </div>
        <div className="text-center group cursor-help transition-all duration-300 hover:scale-105">
          <p className="text-3xl font-bold text-gigconnect-purple group-hover:text-gigconnect-darkpurple transition-colors duration-300">
            <Users className="h-8 w-8 mb-2 mx-auto" />
            15+
          </p>
          <p className="text-sm text-muted-foreground group-hover:text-gigconnect-purple transition-colors duration-300">Pays</p>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
