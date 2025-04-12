
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "@/components/StarRating";
import {
  Search,
  ChevronDown,
  Star,
  Filter,
  TrendingUp,
  Zap,
  MessageSquare,
  Calendar,
  FileCheck,
  ArrowRight,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Données fictives pour les freelances
const featuredFreelances = [
  {
    id: 1,
    name: "Sophie Martin",
    title: "Designer UX/UI",
    avatar: "",
    rating: 4.9,
    reviews: 127,
    isNew: false,
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
    tags: ["SEO", "Réseaux Sociaux", "SEM"],
    description: "Stratège en marketing digital spécialisé dans la croissance et l'acquisition de clients.",
    price: "À partir de 400€"
  }
];

// Données fictives pour les projets
const featuredProjects = [
  {
    id: 1,
    title: "Refonte complète d'un site e-commerce",
    client: "Marie Laurent",
    budget: "2 000€ - 3 000€",
    duration: "4 semaines",
    postedDate: "Il y a 2 jours",
    category: "Développement Web",
    description: "Recherche un développeur pour refondre notre site e-commerce sous WordPress avec WooCommerce.",
    proposals: 7
  },
  {
    id: 2,
    title: "Création d'identité visuelle pour startup",
    client: "Antoine Garcia",
    budget: "1 500€ - 2 500€",
    duration: "3 semaines",
    postedDate: "Il y a 1 jour",
    category: "Design Graphique",
    description: "Startup en fintech recherche un designer pour créer logo, charte graphique et templates de base.",
    proposals: 12
  },
  {
    id: 3,
    title: "Rédaction de 20 articles de blog SEO",
    client: "Claire Petit",
    budget: "800€ - 1 200€",
    duration: "2 semaines",
    postedDate: "Il y a 3 jours",
    category: "Rédaction",
    description: "Besoin d'un rédacteur web pour créer du contenu optimisé SEO sur le thème du bien-être.",
    proposals: 9
  }
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Apple Style */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gigconnect-purple/10 to-transparent dark:from-gigconnect-purple/5">
        <div className="absolute inset-0 bg-[url('/blur-bg.svg')] bg-no-repeat bg-cover opacity-30"></div>
        
        <div className="container mx-auto pt-20 pb-32 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 py-1.5 px-6 text-sm bg-white/10 text-gigconnect-purple dark:text-gigconnect-lightpurple backdrop-blur-lg border border-gigconnect-purple/20">
              Un nouvel espace pour les freelances
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gigconnect-purple to-gigconnect-darkpurple bg-clip-text text-transparent tracking-tight leading-tight">
              Connectez vos talents aux meilleurs projets
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-gigconnect-threads-text/80 leading-relaxed max-w-3xl mx-auto">
              La plateforme qui réunit freelances et clients pour des collaborations
              réussies dans l'univers du digital.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="rounded-full bg-gigconnect-purple hover:bg-gigconnect-purple/90 text-lg px-8 shadow-lg shadow-gigconnect-purple/25 hover:shadow-gigconnect-purple/40 transition-all duration-300">
                Je suis un Freelance <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-gigconnect-purple/30 hover:border-gigconnect-purple text-gigconnect-purple dark:text-gigconnect-lightpurple hover:bg-gigconnect-purple/5 text-lg px-8">
                Je recherche un Freelance
              </Button>
            </div>
          </div>
          
          {/* Search Section with Glassmorphism - CORRECTED */}
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
                    />
                  </div>
                  <div className="relative w-full md:w-56">
                    <select className="landing-input w-full appearance-none pr-10 h-14 bg-white/5 border border-white/10 rounded-xl text-base">
                      <option value="">Toutes catégories</option>
                      <option value="design">Design & Créatif</option>
                      <option value="dev">Développement</option>
                      <option value="marketing">Marketing</option>
                      <option value="writing">Rédaction</option>
                      <option value="video">Vidéo & Animation</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                  <Button className="bg-gigconnect-purple hover:bg-gigconnect-purple/90 rounded-xl h-14 px-8 text-base">
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
                    />
                  </div>
                  <div className="relative w-full md:w-56">
                    <select className="landing-input w-full appearance-none pr-10 h-14 bg-white/5 border border-white/10 rounded-xl text-base">
                      <option value="">Budget</option>
                      <option value="small">Moins de 500€</option>
                      <option value="medium">500€ - 2000€</option>
                      <option value="large">Plus de 2000€</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                  <Button className="bg-gigconnect-purple hover:bg-gigconnect-purple/90 rounded-xl h-14 px-8 text-base">
                    Rechercher
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Statistiques en style Apple */}
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
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <p className="text-sm text-muted-foreground mb-2">Découvrir</p>
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-muted-foreground rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      
      {/* Freelances Section */}
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
          {featuredFreelances.map((freelance) => (
            <Link to={`/freelance/${freelance.id}`} key={freelance.id}>
              <Card className="gig-card hover-transform h-full">
                <CardContent className="p-0">
                  <div className="aspect-[16/9] bg-gigconnect-lightpurple/30 flex items-center justify-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={freelance.avatar} alt={freelance.name} />
                      <AvatarFallback className="bg-gigconnect-purple text-white text-lg">
                        {freelance.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{freelance.name}</h3>
                      {freelance.isNew && (
                        <Badge className="badge-new">
                          <Zap className="h-3 w-3 mr-1" /> Nouveau
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{freelance.title}</p>
                    
                    <div className="flex items-center mb-3">
                      <StarRating rating={freelance.rating} size="sm" />
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
        
        <div className="mt-10 text-center">
          <Button variant="outline" className="border-gigconnect-purple text-gigconnect-purple">
            Voir plus de freelances
          </Button>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-16 bg-gigconnect-lightpurple/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Projets & Missions</h2>
            <p className="text-muted-foreground mt-2">
              Trouvez des opportunités qui correspondent à vos compétences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link to={`/project/${project.id}`} key={project.id}>
                <Card className="gig-card hover-transform h-full">
                  <CardContent className="p-0">
                    <div className="p-5 bg-gradient-to-br from-gigconnect-lightpurple/50 to-gigconnect-lightpurple/20">
                      <Badge className="mb-2 bg-white text-gigconnect-purple">
                        {project.category}
                      </Badge>
                      <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4 mr-1" /> {project.duration}
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <span>{project.budget}</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm line-clamp-3 mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex justify-between items-center pt-3 border-t">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback className="bg-gigconnect-purple/20 text-gigconnect-purple text-xs">
                              {project.client.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{project.client}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileCheck className="h-4 w-4 mr-1" />
                          <span>{project.proposals} propositions</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" className="border-gigconnect-purple text-gigconnect-purple">
              Voir plus de projets
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
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
          <Button className="bg-gigconnect-purple hover:bg-gigconnect-darkpurple">
            Commencer maintenant
          </Button>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gigconnect-navy text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à faire décoller votre carrière freelance ?
          </h2>
          <p className="text-lg mb-8 text-white/80">
            Rejoignez GigConnect dès aujourd'hui et connectez-vous avec des clients à la recherche de vos compétences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gigconnect-purple hover:bg-gigconnect-purple/90">
              S'inscrire gratuitement
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gigconnect-navy">
              En savoir plus
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
