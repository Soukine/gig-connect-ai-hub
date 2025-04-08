
import { useState } from "react";
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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  { id: "web", name: "Développement Web" },
  { id: "mobile", name: "Développement Mobile" },
  { id: "design", name: "Design Graphique" },
  { id: "writing", name: "Rédaction" },
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
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Projets disponibles</h1>
            <p className="text-muted-foreground">
              Trouvez des opportunités adaptées à vos compétences et candidatez dès maintenant
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button className="bg-gigconnect-purple hover:bg-gigconnect-darkpurple">
              <PenSquare className="h-4 w-4 mr-2" /> Publier un projet
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">Tous les projets</TabsTrigger>
            <TabsTrigger value="featured">Recommandés</TabsTrigger>
            <TabsTrigger value="urgent">Urgents</TabsTrigger>
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
            className="pl-10"
          />
        </div>
        
        {/* Active filters */}
        {(selectedCategories.length > 0 || selectedBudgets.length > 0 || showUrgentOnly || showFeaturedOnly || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map(catId => (
              <Badge
                key={catId}
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1"
              >
                {categories.find(cat => cat.id === catId)?.name}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleCategory(catId)}
                />
              </Badge>
            ))}
            
            {selectedBudgets.map(budgetId => (
              <Badge
                key={budgetId}
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1"
              >
                {budgetRanges.find(budget => budget.id === budgetId)?.name}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleBudget(budgetId)}
                />
              </Badge>
            ))}
            
            {showUrgentOnly && (
              <Badge
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1"
              >
                Urgents uniquement
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setShowUrgentOnly(false)}
                />
              </Badge>
            )}
            
            {showFeaturedOnly && (
              <Badge
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1"
              >
                Recommandés uniquement
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setShowFeaturedOnly(false)}
                />
              </Badge>
            )}
            
            {searchTerm && (
              <Badge
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1"
              >
                "{searchTerm}"
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSearchTerm("")}
                />
              </Badge>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground"
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
              ? "fixed inset-0 z-40 bg-background p-4 overflow-auto animate-fade-in" 
              : "hidden"
            } lg:block lg:static lg:w-64 lg:flex-shrink-0`}
          >
            <div className="lg:sticky lg:top-20 space-y-6">
              <div className="flex items-center justify-between mb-4 lg:mb-0">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5" /> Filtres
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Budget</h3>
                <div className="space-y-2">
                  {budgetRanges.map((budget) => (
                    <div key={budget.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`budget-${budget.id}`}
                        checked={selectedBudgets.includes(budget.id)}
                        onCheckedChange={() => toggleBudget(budget.id)}
                      />
                      <label
                        htmlFor={`budget-${budget.id}`}
                        className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {budget.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={showUrgentOnly}
                      onCheckedChange={() => setShowUrgentOnly(!showUrgentOnly)}
                    />
                    <label
                      htmlFor="urgent"
                      className="text-sm cursor-pointer leading-none"
                    >
                      Projets urgents uniquement
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={showFeaturedOnly}
                      onCheckedChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm cursor-pointer leading-none"
                    >
                      Projets recommandés uniquement
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t lg:hidden">
                <Button
                  className="w-full bg-gigconnect-purple hover:bg-gigconnect-darkpurple"
                  onClick={() => setIsMobileFilterOpen(false)}
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
                {filteredProjects.length} projets trouvés
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" /> Filtres
              </Button>
              
              <div className="hidden md:flex items-center">
                <span className="text-sm mr-2">Trier par:</span>
                <select className="text-sm border rounded-md px-2 py-1">
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
                  <Link to={`/project/${project.id}`} key={project.id}>
                    <Card className="gig-card hover-transform overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="bg-gigconnect-lightpurple/20 text-gigconnect-darkpurple">
                                  {project.category}
                                </Badge>
                                {project.isFeatured && (
                                  <Badge variant="outline" className="bg-gigconnect-lightpurple text-gigconnect-purple">
                                    <Star className="h-3 w-3 mr-1 fill-current" /> Recommandé
                                  </Badge>
                                )}
                                {project.isUrgent && (
                                  <Badge className="bg-red-500">Urgent</Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gigconnect-purple">{project.budget}</div>
                              <div className="text-xs text-muted-foreground mt-1">{project.postedDate}</div>
                            </div>
                          </div>
                          
                          <p className="text-sm line-clamp-2 mb-4">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-muted/50"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center pt-4 border-t">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="bg-gigconnect-purple/20 text-gigconnect-purple text-xs">
                                  {project.client.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{project.client}</span>
                            </div>
                            
                            <div className="ml-auto flex items-center gap-4 text-sm">
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" /> {project.duration}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" /> {project.postedDate}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <FileCheck className="h-4 w-4 mr-1" /> {project.proposals} propositions
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
              <div className="text-center py-12 border rounded-lg">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Aucun projet trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier vos filtres ou d'utiliser des mots-clés différents
                </p>
                <Button onClick={clearAllFilters}>Réinitialiser les filtres</Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredProjects.length > 0 && (
              <div className="flex justify-center mt-10">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
                    &lt;
                  </Button>
                  <Button variant="outline" size="sm" className="bg-gigconnect-purple text-white">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    &gt;
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Jobs;
