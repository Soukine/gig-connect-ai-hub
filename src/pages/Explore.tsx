
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Star,
  ChevronDown,
  MessageSquare,
  Zap,
  X,
  SlidersHorizontal,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Données fictives des freelances
const freelances = [
  {
    id: 1,
    name: "Sophie Martin",
    title: "Designer UX/UI",
    avatar: "",
    rating: 4.9,
    reviews: 127,
    isNew: false,
    isFeatured: true,
    verified: true,
    tags: ["UX/UI", "Web Design", "Mobile"],
    description: "Designer UX/UI expérimentée avec plus de 5 ans d'expérience dans la création d'interfaces utilisateur intuitives.",
    price: "À partir de 450€"
  },
  {
    id: 2,
    name: "Thomas Dubois",
    title: "Développeur Full Stack",
    avatar: "",
    rating: 4.7,
    reviews: 89,
    isNew: true,
    isFeatured: false,
    verified: true,
    tags: ["React", "Node.js", "MongoDB"],
    description: "Développeur passionné par la création d'applications web performantes et évolutives.",
    price: "À partir de 500€"
  },
  {
    id: 3,
    name: "Léa Bernard",
    title: "Graphiste & Illustratrice",
    avatar: "",
    rating: 5.0,
    reviews: 193,
    isNew: false,
    isFeatured: true,
    verified: true,
    tags: ["Illustration", "Branding", "Print"],
    description: "Graphiste avec un style unique et une approche créative pour tous vos projets de design.",
    price: "À partir de 350€"
  },
  {
    id: 4,
    name: "Lucas Moreau",
    title: "Expert Marketing Digital",
    avatar: "",
    rating: 4.8,
    reviews: 104,
    isNew: true,
    isFeatured: false,
    verified: false,
    tags: ["SEO", "Réseaux Sociaux", "SEM"],
    description: "Stratège en marketing digital spécialisé dans la croissance et l'acquisition de clients.",
    price: "À partir de 400€"
  },
  {
    id: 5,
    name: "Camille Dubois",
    title: "Motion Designer",
    avatar: "",
    rating: 4.6,
    reviews: 67,
    isNew: false,
    isFeatured: false,
    verified: true,
    tags: ["After Effects", "Animation 3D", "Montage"],
    description: "Motion designer créatif spécialisé dans les animations 2D/3D et les effets visuels.",
    price: "À partir de 480€"
  },
  {
    id: 6,
    name: "Antoine Leroy",
    title: "Développeur Mobile",
    avatar: "",
    rating: 4.9,
    reviews: 82,
    isNew: false,
    isFeatured: false,
    verified: true,
    tags: ["iOS", "Android", "React Native"],
    description: "Développeur mobile avec expérience dans la création d'applications natives et cross-platform.",
    price: "À partir de 550€"
  },
  {
    id: 7,
    name: "Émilie Rousseau",
    title: "Rédactrice Web & SEO",
    avatar: "",
    rating: 4.8,
    reviews: 119,
    isNew: true,
    isFeatured: false,
    verified: false,
    tags: ["Rédaction SEO", "Copywriting", "Blog"],
    description: "Rédactrice web spécialisée dans la création de contenus optimisés pour le référencement naturel.",
    price: "À partir de 300€"
  },
  {
    id: 8,
    name: "Pierre Fontaine",
    title: "Photographe & Retoucheur",
    avatar: "",
    rating: 5.0,
    reviews: 156,
    isNew: false,
    isFeatured: true,
    verified: true,
    tags: ["Photographie", "Retouche", "Packshot"],
    description: "Photographe professionnel spécialisé dans les images de produits et la retouche créative.",
    price: "À partir de 380€"
  },
];

// Catégories disponibles
const categories = [
  { id: "design", name: "Design Graphique" },
  { id: "dev", name: "Développement Web" },
  { id: "mobile", name: "Développement Mobile" },
  { id: "marketing", name: "Marketing Digital" },
  { id: "video", name: "Vidéo & Animation" },
  { id: "writing", name: "Rédaction" },
  { id: "seo", name: "SEO" },
  { id: "photo", name: "Photo & Retouche" }
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Logique de filtrage
  const filteredFreelances = freelances.filter((freelance) => {
    // Filtre de recherche
    const matchesSearch = searchTerm === "" || 
      freelance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelance.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filtre de catégories (supposons que les tags représentent des catégories)
    const matchesCategories = selectedCategories.length === 0 ||
      freelance.tags.some(tag => selectedCategories.includes(tag.toLowerCase()));
    
    // Filtre de vérification
    const matchesVerified = !showVerifiedOnly || freelance.verified;
    
    // Filtre nouveaux
    const matchesNew = !showNewOnly || freelance.isNew;
    
    // Filtre de prix (pour exemple, imaginons que le prix est entre 300 et 600)
    const price = parseInt(freelance.price.replace(/[^\d]/g, ''));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesCategories && matchesVerified && matchesNew && matchesPrice;
  });
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const clearAllFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setShowVerifiedOnly(false);
    setShowNewOnly(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Explorer les freelances</h1>
            <p className="text-muted-foreground">
              Trouvez le freelance idéal pour votre projet parmi notre communauté de talents
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" /> Filtres
            </Button>
            <Link to="/post-project">
              <Button className="bg-gigconnect-purple hover:bg-gigconnect-darkpurple">
                Publier un projet
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher par compétence, nom ou mot-clé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Active filters */}
        {(selectedCategories.length > 0 || showVerifiedOnly || showNewOnly || searchTerm) && (
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
            
            {showVerifiedOnly && (
              <Badge
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1"
              >
                Vérifiés uniquement
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setShowVerifiedOnly(false)}
                />
              </Badge>
            )}
            
            {showNewOnly && (
              <Badge
                variant="outline"
                className="bg-gigconnect-lightpurple/30 flex items-center gap-1 px-3 py-1"
              >
                Nouveaux uniquement
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setShowNewOnly(false)}
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
                  <SlidersHorizontal className="h-5 w-5" /> Filtres
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
              
              <div className="space-y-4">
                <h3 className="font-medium mb-3">Budget</h3>
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={50}
                  value={priceRange}
                  onValueChange={(value: number[]) => setPriceRange(value)}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {priceRange[0]}€
                  </span>
                  <span className="text-sm">
                    {priceRange[1]}€
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Statut</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={showVerifiedOnly}
                      onCheckedChange={() => setShowVerifiedOnly(!showVerifiedOnly)}
                    />
                    <label
                      htmlFor="verified"
                      className="text-sm cursor-pointer leading-none flex items-center"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-gigconnect-green mr-1" /> Vérifiés uniquement
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new"
                      checked={showNewOnly}
                      onCheckedChange={() => setShowNewOnly(!showNewOnly)}
                    />
                    <label
                      htmlFor="new"
                      className="text-sm cursor-pointer leading-none flex items-center"
                    >
                      <Zap className="h-3.5 w-3.5 text-gigconnect-purple mr-1" /> Nouveaux uniquement
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t lg:hidden">
                <Button
                  className="w-full bg-gigconnect-purple hover:bg-gigconnect-darkpurple"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Voir {filteredFreelances.length} résultats
                </Button>
              </div>
            </div>
          </aside>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                {filteredFreelances.length} freelances trouvés
              </div>
              
              <div className="flex items-center">
                <span className="text-sm mr-2">Trier par:</span>
                <select className="text-sm border rounded-md px-2 py-1">
                  <option value="relevance">Pertinence</option>
                  <option value="rating">Évaluation</option>
                  <option value="price_low">Prix croissant</option>
                  <option value="price_high">Prix décroissant</option>
                  <option value="new">Plus récents</option>
                </select>
              </div>
            </div>
            
            {/* Results */}
            {filteredFreelances.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelances.map((freelance) => (
                  <Link to={`/freelance/${freelance.id}`} key={freelance.id}>
                    <Card className="gig-card hover-transform h-full">
                      <CardContent className="p-0">
                        <div className="aspect-[16/9] bg-gigconnect-lightpurple/30 flex items-center justify-center relative">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={freelance.avatar} alt={freelance.name} />
                            <AvatarFallback className="bg-gigconnect-purple text-white text-lg">
                              {freelance.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          
                          {freelance.isFeatured && (
                            <Badge className="badge-featured absolute top-2 right-2">
                              <Star className="h-3 w-3 mr-1 fill-current" /> Recommandé
                            </Badge>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg flex items-center">
                              {freelance.name}
                              {freelance.verified && (
                                <CheckCircle className="h-4 w-4 text-gigconnect-green ml-1" />
                              )}
                            </h3>
                            {freelance.isNew && (
                              <Badge className="badge-new">
                                <Zap className="h-3 w-3 mr-1" /> Nouveau
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">{freelance.title}</p>
                          
                          <div className="flex items-center mb-3">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{freelance.rating}</span>
                            <span className="mx-1 text-muted-foreground text-sm">
                              ({freelance.reviews} avis)
                            </span>
                          </div>
                          
                          <p className="text-sm line-clamp-2 mb-3">{freelance.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {freelance.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gigconnect-lightpurple/20 text-gigconnect-darkpurple"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="pt-3 border-t flex justify-between items-center">
                            <span className="text-sm font-medium">{freelance.price}</span>
                            <Button size="sm" variant="ghost" className="text-gigconnect-purple">
                              <MessageSquare className="h-4 w-4 mr-1" /> Contacter
                            </Button>
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
                <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier vos filtres ou d'utiliser des mots-clés différents
                </p>
                <Button onClick={clearAllFilters}>Réinitialiser les filtres</Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredFreelances.length > 0 && (
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

export default Explore;
