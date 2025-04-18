
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Calendar,
  FileCheck,
  Clock,
  Briefcase,
  PenSquare,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

// Données fictives pour les projets
const projects = [
  {
    id: 1,
    title: "Refonte complète d'un site e-commerce",
    client: "Marie Laurent",
    clientVerified: true,
    category: "Développement Web",
    budget: "2 000€ - 3 000€",
    duration: "4 semaines",
    postedDate: "Il y a 2 jours",
    description: "Recherche un développeur pour refondre notre site e-commerce sous WordPress avec WooCommerce. Le site actuel est obsolète et nous souhaitons une refonte complète avec un design moderne et responsive. Le site doit intégrer un système de paiement en ligne, une gestion des stocks et une interface d'administration intuitive.",
    proposals: 7,
    skills: ["WordPress", "WooCommerce", "PHP", "HTML/CSS"],
    isFeatured: true,
    isUrgent: false
  },
  {
    id: 2,
    title: "Création d'identité visuelle pour startup",
    client: "Antoine Garcia",
    clientVerified: true,
    category: "Design Graphique",
    budget: "1 500€ - 2 500€",
    duration: "3 semaines",
    postedDate: "Il y a 1 jour",
    description: "Startup en fintech recherche un designer pour créer logo, charte graphique et templates de base. Notre entreprise propose des solutions de paiement pour les petits commerçants et nous avons besoin d'une identité qui inspire confiance tout en étant moderne et distinctive.",
    proposals: 12,
    skills: ["Logo Design", "Branding", "Adobe Suite", "Identité visuelle"],
    isFeatured: false,
    isUrgent: true
  },
  {
    id: 3,
    title: "Rédaction de 20 articles de blog SEO",
    client: "Claire Petit",
    clientVerified: false,
    category: "Rédaction",
    budget: "800€ - 1 200€",
    duration: "2 semaines",
    postedDate: "Il y a 3 jours",
    description: "Besoin d'un rédacteur web pour créer du contenu optimisé SEO sur le thème du bien-être. Les articles doivent faire entre 1500 et 2000 mots, être bien documentés et inclure des mots-clés spécifiques que nous fournirons. L'objectif est d'améliorer notre référencement naturel et d'apporter une réelle valeur à nos lecteurs.",
    proposals: 9,
    skills: ["SEO", "Copywriting", "Wordpress", "Rédaction Web"],
    isFeatured: true,
    isUrgent: false
  },
  {
    id: 4,
    title: "Développement d'une application mobile iOS",
    client: "Thomas Mercier",
    clientVerified: true,
    category: "Développement Mobile",
    budget: "5 000€ - 8 000€",
    duration: "8 semaines",
    postedDate: "Il y a 4 jours",
    description: "Recherche un développeur iOS expérimenté pour créer une application de fitness avec suivi d'activités, plans d'entraînement personnalisés et intégration avec les appareils Apple. L'application doit être intuitive, performante et respecter les guidelines d'Apple.",
    proposals: 5,
    skills: ["Swift", "iOS", "UI/UX", "API REST"],
    isFeatured: false,
    isUrgent: false
  },
  {
    id: 5,
    title: "Montage vidéo pour chaîne YouTube",
    client: "Julie Lefort",
    clientVerified: true,
    category: "Vidéo & Animation",
    budget: "1 000€ - 1 500€",
    duration: "2 semaines récurrent",
    postedDate: "Il y a 1 jour",
    description: "Recherche un monteur vidéo pour produire 4 vidéos par mois pour ma chaîne YouTube sur la cuisine. Je fournis les rushes, vous devez faire le montage, ajouter des transitions, de la musique et optimiser pour YouTube.",
    proposals: 8,
    skills: ["Premiere Pro", "After Effects", "Montage", "Sound Design"],
    isFeatured: false,
    isUrgent: true
  },
  {
    id: 6,
    title: "Campagne Google Ads pour lancement de produit",
    client: "Marc Dupont",
    clientVerified: false,
    category: "Marketing Digital",
    budget: "1 200€ - 2 000€",
    duration: "1 mois",
    postedDate: "Il y a 5 jours",
    description: "Nous lançons un nouveau produit dans le secteur de la beauté et recherchons un expert Google Ads pour concevoir et gérer notre campagne de lancement. La personne doit avoir une expérience dans le secteur de la beauté et prouver des résultats antérieurs.",
    proposals: 6,
    skills: ["Google Ads", "SEM", "Analytics", "Copywriting"],
    isFeatured: false,
    isUrgent: false
  },
];

// Catégories disponibles
const categories = [
  { id: "dev-web", name: "Développement Web" },
  { id: "dev-mobile", name: "Développement Mobile" },
  { id: "design", name: "Design Graphique" },
  { id: "redaction", name: "Rédaction" },
  { id: "marketing", name: "Marketing Digital" },
  { id: "video", name: "Vidéo & Animation" },
  { id: "photo", name: "Photographie" },
  { id: "seo", name: "SEO" },
];

// Budgets disponibles
const budgetRanges = [
  { id: "small", name: "Moins de 500€" },
  { id: "medium", name: "500€ - 2 000€" },
  { id: "large", name: "2 000€ - 5 000€" },
  { id: "xlarge", name: "Plus de 5 000€" },
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();

  // Effect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logique de filtrage
  const filteredProjects = projects.filter((project) => {
    // Filtre de recherche
    const matchesSearch = searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filtre de catégories
    const matchesCategories = selectedCategories.length === 0 ||
      selectedCategories.includes(project.category.toLowerCase());
    
    // Filtre de budget
    const matchesBudget = selectedBudgets.length === 0 ||
      (selectedBudgets.includes("small") && parseInt(project.budget.split("€")[0].replace(/\D/g, '')) < 500) ||
      (selectedBudgets.includes("medium") && 
        parseInt(project.budget.split("€")[0].replace(/\D/g, '')) >= 500 && 
        parseInt(project.budget.split("€")[1].replace(/\D/g, '')) <= 2000) ||
      (selectedBudgets.includes("large") && 
        parseInt(project.budget.split("€")[0].replace(/\D/g, '')) >= 2000 &&
        parseInt(project.budget.split("€")[1].replace(/\D/g, '')) <= 5000) ||
      (selectedBudgets.includes("xlarge") && 
        parseInt(project.budget.split("€")[0].replace(/\D/g, '')) > 5000);
    
    // Filtre d'urgence
    const matchesUrgent = !showUrgentOnly || project.isUrgent;
    
    // Filtre en vedette
    const matchesFeatured = !showFeaturedOnly || project.isFeatured;
    
    // Filtre par onglet
    const matchesTab = activeTab === "all" ||
      (activeTab === "featured" && project.isFeatured) ||
      (activeTab === "urgent" && project.isUrgent);
    
    return matchesSearch && matchesCategories && matchesBudget && matchesUrgent && matchesFeatured && matchesTab;
  });
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const toggleBudget = (budgetId: string) => {
    setSelectedBudgets(prev =>
      prev.includes(budgetId)
        ? prev.filter(id => id !== budgetId)
        : [...prev, budgetId]
    );
  };
  
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedBudgets([]);
    setShowUrgentOnly(false);
    setShowFeaturedOnly(false);
    
    toast({
      title: "Filtres réinitialisés",
      description: "Tous les filtres ont été effacés",
    });
  };

  const handleApplyFilters = () => {
    setIsMobileFilterOpen(false);
    
    toast({
      title: "Filtres appliqués",
      description: `${filteredProjects.length} projets correspondent à vos critères`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gigconnect-lightpurple/10 dark:from-background dark:to-gigconnect-darkpurple/10">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gigconnect-purple to-gigconnect-darkpurple bg-clip-text text-transparent">
              Projets disponibles
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Trouvez des opportunités adaptées à vos compétences et candidatez dès maintenant
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-gigconnect-purple to-gigconnect-darkpurple hover:opacity-90 transition-all shadow-md hover:shadow-lg hover:translate-y-[-2px] group"
            >
              <PenSquare className="h-4 w-4 mr-2 group-hover:rotate-[-10deg] transition-transform" /> 
              Publier un projet
            </Button>
          </div>
        </div>
        
        {/* Sticky tabs and search bar on scroll */}
        <div className={cn(
          "sticky top-0 z-10 pt-2 pb-4 bg-gradient-to-br from-white to-gigconnect-lightpurple/10 dark:from-background dark:to-gigconnect-darkpurple/10 transition-all duration-300",
          isScrolled ? "shadow-md rounded-b-lg px-4 -mx-4" : ""
        )}>
          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-3 max-w-md bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="all" className="data-[state=active]:bg-gigconnect-purple data-[state=active]:text-white transition-all">
                Tous les projets
              </TabsTrigger>
              <TabsTrigger value="featured" className="data-[state=active]:bg-gigconnect-purple data-[state=active]:text-white transition-all">
                <Star className="h-4 w-4 mr-1" /> Recommandés
              </TabsTrigger>
              <TabsTrigger value="urgent" className="data-[state=active]:bg-gigconnect-purple data-[state=active]:text-white transition-all">
                <Clock className="h-4 w-4 mr-1" /> Urgents
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Search bar */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par compétence, titre ou mot-clé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-card shadow-sm border-gigconnect-purple/20 focus-visible:ring-gigconnect-purple"
            />
          </div>
        </div>
        
        {/* Active filters */}
        {(selectedCategories.length > 0 || selectedBudgets.length > 0 || showUrgentOnly || showFeaturedOnly || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
            {selectedCategories.map(catId => (
              <Badge
                key={catId}
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1.5 hover:bg-gigconnect-lightpurple/40 transition-colors backdrop-blur-sm"
              >
                {categories.find(cat => cat.id === catId)?.name}
                <X 
                  className="h-3 w-3 cursor-pointer ml-1 hover:text-gigconnect-purple" 
                  onClick={() => toggleCategory(catId)}
                />
              </Badge>
            ))}
            
            {selectedBudgets.map(budgetId => (
              <Badge
                key={budgetId}
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1.5 hover:bg-gigconnect-lightpurple/40 transition-colors backdrop-blur-sm"
              >
                {budgetRanges.find(budget => budget.id === budgetId)?.name}
                <X 
                  className="h-3 w-3 cursor-pointer ml-1 hover:text-gigconnect-purple" 
                  onClick={() => toggleBudget(budgetId)}
                />
              </Badge>
            ))}
            
            {showUrgentOnly && (
              <Badge
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1.5 hover:bg-gigconnect-lightpurple/40 transition-colors backdrop-blur-sm"
              >
                Urgents uniquement
                <X 
                  className="h-3 w-3 cursor-pointer ml-1 hover:text-gigconnect-purple" 
                  onClick={() => setShowUrgentOnly(false)}
                />
              </Badge>
            )}
            
            {showFeaturedOnly && (
              <Badge
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1.5 hover:bg-gigconnect-lightpurple/40 transition-colors backdrop-blur-sm"
              >
                Recommandés uniquement
                <X 
                  className="h-3 w-3 cursor-pointer ml-1 hover:text-gigconnect-purple" 
                  onClick={() => setShowFeaturedOnly(false)}
                />
              </Badge>
            )}
            
            {searchTerm && (
              <Badge
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1.5 hover:bg-gigconnect-lightpurple/40 transition-colors backdrop-blur-sm"
              >
                "{searchTerm}"
                <X 
                  className="h-3 w-3 cursor-pointer ml-1 hover:text-gigconnect-purple" 
                  onClick={() => setSearchTerm("")}
                />
              </Badge>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-gigconnect-purple transition-colors"
              onClick={clearAllFilters}
            >
              Effacer tous les filtres
            </Button>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <aside className={`${
            isMobileFilterOpen 
              ? "fixed inset-0 z-40 bg-background/95 backdrop-blur-md p-6 overflow-auto animate-fade-in" 
              : "hidden"
            } lg:block lg:static lg:w-64 lg:flex-shrink-0`}
          >
            <div className="lg:sticky lg:top-24 space-y-6 bg-white dark:bg-card rounded-xl p-5 shadow-sm border border-gigconnect-purple/10 animate-fade-in">
              <div className="flex items-center justify-between mb-4 lg:mb-0">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gigconnect-purple">
                  <Sliders className="h-5 w-5" /> Filtres
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden hover:bg-gigconnect-purple/10 hover:text-gigconnect-purple rounded-full h-8 w-8 p-0"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="pb-4 border-b">
                <h3 className="font-medium mb-3 text-foreground/80">Catégories</h3>
                <div className="space-y-2.5">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2 group">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                        className="border-gigconnect-purple/50 data-[state=checked]:bg-gigconnect-purple data-[state=checked]:border-gigconnect-purple"
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm cursor-pointer leading-none group-hover:text-gigconnect-purple transition-colors"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pb-4 border-b">
                <h3 className="font-medium mb-3 text-foreground/80">Budget</h3>
                <div className="space-y-2.5">
                  {budgetRanges.map((budget) => (
                    <div key={budget.id} className="flex items-center space-x-2 group">
                      <Checkbox
                        id={`budget-${budget.id}`}
                        checked={selectedBudgets.includes(budget.id)}
                        onCheckedChange={() => toggleBudget(budget.id)}
                        className="border-gigconnect-purple/50 data-[state=checked]:bg-gigconnect-purple data-[state=checked]:border-gigconnect-purple"
                      />
                      <label
                        htmlFor={`budget-${budget.id}`}
                        className="text-sm cursor-pointer leading-none group-hover:text-gigconnect-purple transition-colors"
                      >
                        {budget.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3 text-foreground/80">Options</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 group">
                    <Checkbox
                      id="urgent"
                      checked={showUrgentOnly}
                      onCheckedChange={() => setShowUrgentOnly(!showUrgentOnly)}
                      className="border-gigconnect-purple/50 data-[state=checked]:bg-gigconnect-purple data-[state=checked]:border-gigconnect-purple"
                    />
                    <label
                      htmlFor="urgent"
                      className="text-sm cursor-pointer leading-none group-hover:text-gigconnect-purple transition-colors"
                    >
                      Projets urgents uniquement
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 group">
                    <Checkbox
                      id="featured"
                      checked={showFeaturedOnly}
                      onCheckedChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                      className="border-gigconnect-purple/50 data-[state=checked]:bg-gigconnect-purple data-[state=checked]:border-gigconnect-purple"
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm cursor-pointer leading-none group-hover:text-gigconnect-purple transition-colors"
                    >
                      Projets recommandés uniquement
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t lg:hidden">
                <Button
                  className="w-full bg-gigconnect-purple hover:bg-gigconnect-darkpurple shadow-md"
                  onClick={handleApplyFilters}
                >
                  Voir {filteredProjects.length} résultats
                </Button>
              </div>
            </div>
          </aside>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-gigconnect-purple">{filteredProjects.length}</span> projets trouvés
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="md:hidden border-gigconnect-purple/30 text-gigconnect-purple hover:bg-gigconnect-purple/10 hover:border-gigconnect-purple"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" /> Filtres
              </Button>
              
              <div className="hidden md:flex items-center">
                <span className="text-sm mr-2 text-muted-foreground">Trier par:</span>
                <select className="text-sm border rounded-md px-3 py-1.5 bg-white dark:bg-card border-gigconnect-purple/20 focus:outline-none focus:ring-1 focus:ring-gigconnect-purple cursor-pointer">
                  <option value="relevance">Pertinence</option>
                  <option value="date_new">Plus récents</option>
                  <option value="date_old">Plus anciens</option>
                  <option value="budget_high">Budget (élevé)</option>
                  <option value="budget_low">Budget (bas)</option>
                </select>
              </div>
            </div>
            
            {/* Results */}
            {filteredProjects.length > 0 ? (
              <div className="space-y-6">
                {filteredProjects.map((project) => (
                  <Link to={`/project/${project.id}`} key={project.id} className="block group">
                    <Card className="overflow-hidden border-transparent hover:border-gigconnect-purple/30 transition-all duration-300 hover:shadow-md group-hover:shadow-gigconnect-purple/10 bg-white dark:bg-card">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Badge 
                                  variant="outline" 
                                  className="bg-gigconnect-lightpurple/20 text-gigconnect-darkpurple border-gigconnect-lightpurple/30 font-medium"
                                >
                                  {project.category}
                                </Badge>
                                {project.isFeatured && (
                                  <Badge className="bg-gigconnect-purple text-white px-2.5 group-hover:bg-gigconnect-purple/90">
                                    <Star className="h-3 w-3 mr-1 fill-current group-hover:animate-pulse" /> Recommandé
                                  </Badge>
                                )}
                                {project.isUrgent && (
                                  <Badge className="bg-red-500 text-white group-hover:bg-red-600 px-2.5">
                                    <Clock className="h-3 w-3 mr-1" /> Urgent
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold mb-2 group-hover:text-gigconnect-purple transition-colors line-clamp-1">
                                {project.title}
                              </h3>
                            </div>
                            <div className="text-right">
                              <div className="text-base font-medium text-gigconnect-purple bg-gigconnect-lightpurple/20 px-3 py-1 rounded-full">
                                {project.budget}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1.5">
                                {project.postedDate}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm line-clamp-2 mb-4 text-foreground/80">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-muted/50 hover:bg-muted transition-colors text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center pt-4 border-t border-border/40">
                            <div className="flex items-center">
                              <Avatar className="h-7 w-7 mr-2 border border-gigconnect-purple/20">
                                <AvatarFallback className="bg-gigconnect-purple/20 text-gigconnect-purple text-xs">
                                  {project.client.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{project.client}</span>
                              {project.clientVerified && (
                                <Badge className="ml-2 bg-green-500/20 text-green-700 dark:text-green-400 text-xs px-1.5 py-0">
                                  Vérifié
                                </Badge>
                              )}
                            </div>
                            
                            <div className="ml-auto flex flex-wrap gap-3 text-sm">
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1 text-gigconnect-purple/70" /> 
                                <span>{project.duration}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1 text-gigconnect-purple/70" /> 
                                <span>{project.postedDate}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <FileCheck className="h-4 w-4 mr-1 text-gigconnect-purple/70" /> 
                                <span className="font-medium">{project.proposals}</span> propositions
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border rounded-xl bg-white/50 dark:bg-card/50 backdrop-blur-sm shadow-sm animate-fade-in">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-3 text-gigconnect-darkpurple">Aucun projet trouvé</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Essayez de modifier vos filtres ou d'utiliser des mots-clés différents pour trouver des projets correspondant à vos critères
                </p>
                <Button 
                  onClick={clearAllFilters}
                  className="bg-gigconnect-purple hover:bg-gigconnect-darkpurple"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredProjects.length > 0 && (
              <div className="flex justify-center mt-10">
                <div className="flex items-center gap-1.5">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    disabled
                    className="border-gigconnect-purple/30 text-gigconnect-purple"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gigconnect-purple text-white hover:bg-gigconnect-darkpurple border-transparent w-8 h-8"
                  >
                    1
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gigconnect-purple/30 text-gigconnect-purple hover:bg-gigconnect-purple/10 hover:text-gigconnect-darkpurple w-8 h-8"
                  >
                    2
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gigconnect-purple/30 text-gigconnect-purple hover:bg-gigconnect-purple/10 hover:text-gigconnect-darkpurple w-8 h-8"
                  >
                    3
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-gigconnect-purple/30 text-gigconnect-purple hover:bg-gigconnect-purple/10 hover:text-gigconnect-darkpurple"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Jobs;
