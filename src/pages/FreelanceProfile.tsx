import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  MessageSquare, ThumbsUp, Share2, Bookmark, 
  Send, Calendar, CheckCircle, Award, MapPin, User, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import StarRating from "@/components/StarRating";

const freelanceData = {
  id: 2,
  name: "Thomas Dubois",
  title: "Développeur Full Stack",
  avatar: "",
  location: "Lyon, France",
  memberSince: "Mai 2023",
  verified: true,
  rating: 4.7,
  reviewCount: 89,
  completedProjects: 47,
  bio: "Développeur passionné avec plus de 5 ans d'expérience dans la création d'applications web performantes et évolutives. Spécialisé en React, Node.js et MongoDB avec une forte expertise en architecture logicielle.",
  expertise: ["React", "Node.js", "MongoDB", "TypeScript", "GraphQL", "Firebase", "AWS", "UI/UX"],
  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "Courant" }
  ],
  education: [
    { degree: "Master en Développement Web", institution: "Université de Lyon", year: "2018" },
    { degree: "Licence en Informatique", institution: "Université de Lyon", year: "2016" }
  ],
  portfolio: [
    {
      id: 1,
      title: "Application de gestion de tâches",
      image: "",
      description: "Application React/Node.js pour la gestion de projets et de tâches en équipe."
    },
    {
      id: 2,
      title: "Site e-commerce responsive",
      image: "",
      description: "Boutique en ligne complète avec système de paiement Stripe et gestion des stocks."
    },
    {
      id: 3,
      title: "Dashboard d'analyse",
      image: "",
      description: "Interface d'administration avec visualisations de données avancées en D3.js."
    }
  ],
  services: [
    {
      id: 1,
      title: "Développement d'applications web React",
      price: "À partir de 500€",
      deliveryTime: "10 jours",
      description: "Création d'applications web modernes, responsives et performantes avec React."
    },
    {
      id: 2,
      title: "Développement backend Node.js",
      price: "À partir de 450€",
      deliveryTime: "7 jours",
      description: "Création d'APIs RESTful ou GraphQL avec Node.js et Express."
    }
  ],
  reviewItems: [
    {
      id: 1,
      clientName: "Marie Laurent",
      clientAvatar: "",
      rating: 5,
      date: "15 mars 2024",
      comment: "Thomas a livré un excellent travail, dépassant même mes attentes. Communication fluide et code de grande qualité. Je recommande vivement !"
    },
    {
      id: 2,
      clientName: "Jean Dupont",
      clientAvatar: "",
      rating: 4,
      date: "28 février 2024",
      comment: "Très bon développeur qui a su résoudre nos problèmes techniques rapidement. Petits délais supplémentaires mais résultat final satisfaisant."
    }
  ]
};

const FreelanceProfile = () => {
  const { id } = useParams();
  const [bookmarked, setBookmarked] = useState(false);
  const { toast } = useToast();
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Retiré des favoris" : "Ajouté aux favoris",
      description: bookmarked ? "Ce freelance a été retiré de vos favoris" : "Ce freelance a été ajouté à vos favoris",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié",
      description: "Le lien du profil a été copié dans le presse-papier",
    });
  };
  
  const handleContact = () => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé à Thomas Dubois",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gigconnect-threads-bg text-gigconnect-threads-text">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 threads-layout">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <Avatar className="threads-avatar h-32 w-32 md:h-40 md:w-40">
              <AvatarImage src={freelanceData.avatar} alt={freelanceData.name} />
              <AvatarFallback className="bg-gigconnect-purple text-white text-3xl">
                {freelanceData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{freelanceData.name}</h1>
                  {freelanceData.verified && (
                    <CheckCircle className="h-5 w-5 text-gigconnect-threads-accent fill-gigconnect-threads-accent" />
                  )}
                </div>
                <p className="text-gigconnect-threads-muted">{freelanceData.title}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleBookmark}
                  className={bookmarked ? "text-gigconnect-threads-accent" : "text-gigconnect-threads-muted"}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-gigconnect-threads-accent" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gigconnect-threads-muted">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{freelanceData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Membre depuis {freelanceData.memberSince}</span>
              </div>
              <div className="flex items-center gap-1">
                <StarRating rating={freelanceData.rating} size="sm" />
                <span className="ml-1">{freelanceData.rating} ({freelanceData.reviewCount} avis)</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{freelanceData.completedProjects} projets terminés</span>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="threads-button flex-1">
                <MessageSquare className="h-5 w-5 mr-1" />
                Contacter
              </Button>
              <Button variant="outline" className="flex-1 border-gigconnect-threads-border text-gigconnect-threads-text hover:bg-gigconnect-threads-card">
                <Send className="h-5 w-5 mr-1" />
                Proposer un projet
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="w-full bg-gigconnect-threads-card border-b border-gigconnect-threads-border mb-6">
              <TabsTrigger value="portfolio" className="flex-1">Portfolio</TabsTrigger>
              <TabsTrigger value="about" className="flex-1">À propos</TabsTrigger>
              <TabsTrigger value="services" className="flex-1">Services</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Avis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {freelanceData.portfolio.map((work) => (
                  <Card key={work.id} className="bg-gigconnect-threads-card border-gigconnect-threads-border overflow-hidden hover-transform">
                    <div className="aspect-video bg-muted/20 flex items-center justify-center">
                      {work.image ? (
                        <img src={work.image} alt={work.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="text-gigconnect-threads-muted flex flex-col items-center justify-center h-full">
                          <span className="text-5xl mb-2">🖼️</span>
                          <span className="text-sm">Image du projet</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-bold text-lg">{work.title}</h3>
                      <p className="text-sm text-gigconnect-threads-muted mt-1">{work.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="animate-fade-in">
              <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border">
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{freelanceData.bio}</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border">
                  <CardHeader>
                    <CardTitle>Compétences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {freelanceData.expertise.map((skill, index) => (
                        <Badge 
                          key={index} 
                          className="bg-gigconnect-threads-accent/20 text-gigconnect-threads-accent hover:bg-gigconnect-threads-accent/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border">
                  <CardHeader>
                    <CardTitle>Langues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {freelanceData.languages.map((language, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{language.name}</span>
                          <span className="text-gigconnect-threads-muted">{language.level}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border md:col-span-2">
                  <CardHeader>
                    <CardTitle>Éducation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {freelanceData.education.map((edu, index) => (
                        <li key={index} className="flex justify-between border-b border-gigconnect-threads-border/30 pb-2">
                          <div>
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-gigconnect-threads-muted">{edu.institution}</p>
                          </div>
                          <span className="text-gigconnect-threads-muted">{edu.year}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="animate-fade-in">
              <div className="space-y-6">
                {freelanceData.services.map((service) => (
                  <Card key={service.id} className="bg-gigconnect-threads-card border-gigconnect-threads-border">
                    <CardHeader>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription className="flex justify-between text-gigconnect-threads-muted">
                        <span className="font-medium text-gigconnect-threads-accent">{service.price}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Livraison en {service.deliveryTime}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{service.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" className="border-gigconnect-threads-border text-gigconnect-threads-text hover:bg-gigconnect-threads-card">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Demande de devis
                      </Button>
                      <Button className="threads-button">
                        Commander
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="animate-fade-in">
              <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Évaluation globale</CardTitle>
                  <div className="flex items-center gap-2">
                    <StarRating rating={freelanceData.rating} />
                    <span className="font-bold">{freelanceData.rating}</span>
                    <span className="text-gigconnect-threads-muted">({freelanceData.reviewCount} avis)</span>
                  </div>
                </CardHeader>
              </Card>
              
              <div className="space-y-4">
                {freelanceData.reviewItems.map((review) => (
                  <Card key={review.id} className="bg-gigconnect-threads-card border-gigconnect-threads-border">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gigconnect-threads-accent/30 text-gigconnect-threads-text">
                              {review.clientName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.clientName}</p>
                            <p className="text-sm text-gigconnect-threads-muted">{review.date}</p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{review.comment}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-gigconnect-threads-muted">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Utile
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gigconnect-threads-muted">
                          Signaler
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default FreelanceProfile;
