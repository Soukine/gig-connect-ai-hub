
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Calendar, Clock, DollarSign, Bookmark, Share2, Shield, 
  FileText, Users, MapPin, Building, CheckSquare, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

// Données fictives pour le projet
const projectData = {
  id: 1,
  title: "Refonte complète d'un site e-commerce",
  status: "Actif", // Actif, Attribué, Terminé
  createdAt: "Il y a 2 jours",
  deadline: "4 semaines",
  budget: "2 000€ - 3 000€",
  category: "Développement Web",
  skills: ["WordPress", "WooCommerce", "PHP", "CSS", "MySQL"],
  description: `Nous sommes une boutique de vêtements en ligne recherchant une refonte complète de notre site e-commerce.

Notre site actuel fonctionne sur WordPress avec WooCommerce, mais il est lent, peu attractif et n'est pas optimisé pour les mobiles.

Nous avons besoin d'un développeur expérimenté pour:
- Optimiser les performances du site
- Moderniser l'interface utilisateur
- Assurer une expérience responsive sur tous les appareils
- Améliorer le processus de paiement
- Intégrer de meilleures analyses de données
- Optimiser le référencement

Le développeur sélectionné aura accès à notre environnement de développement et travaillera en étroite collaboration avec notre équipe marketing.`,
  client: {
    id: 101,
    name: "Marie Laurent",
    avatar: "",
    company: "Mode Élégante",
    location: "Paris, France",
    memberSince: "Septembre 2022",
    projectsPosted: 8,
    hireRate: "75%",
    verified: true
  },
  proposals: [
    {
      id: 201,
      freelancer: {
        id: 301,
        name: "Thomas Dubois",
        title: "Développeur Full Stack",
        avatar: "",
        rating: 4.7
      },
      status: "En attente", // En attente, Accepté, Refusé
      submittedAt: "Il y a 1 jour"
    },
    {
      id: 202,
      freelancer: {
        id: 302,
        name: "Sophie Martin",
        title: "Développeuse WordPress",
        avatar: "",
        rating: 4.9
      },
      status: "En attente",
      submittedAt: "Il y a 18 heures"
    }
  ]
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [bookmarked, setBookmarked] = useState(false);
  const { toast } = useToast();
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Retiré des favoris" : "Ajouté aux favoris",
      description: bookmarked ? "Ce projet a été retiré de vos favoris" : "Ce projet a été ajouté à vos favoris",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié",
      description: "Le lien du projet a été copié dans le presse-papier",
    });
  };
  
  const handleProposal = () => {
    toast({
      title: "Envoi de proposition",
      description: "Votre proposition a été envoyée avec succès",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gigconnect-threads-bg text-gigconnect-threads-text">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 threads-layout">
        {/* En-tête du projet */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-green-500 text-white">
                {projectData.status}
              </Badge>
              <Badge className="bg-gigconnect-threads-card border-gigconnect-threads-border text-gigconnect-threads-muted">
                {projectData.category}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{projectData.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gigconnect-threads-muted">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Posté {projectData.createdAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Délai: {projectData.deadline}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Budget: {projectData.budget}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {projectData.proposals.length} propositions
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-end md:self-start">
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
        
        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full bg-gigconnect-threads-card border-b border-gigconnect-threads-border mb-6">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="proposals" className="flex-1">Propositions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="animate-fade-in">
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border mb-6">
                  <CardHeader>
                    <CardTitle>Description du projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-line">
                      {projectData.description}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border">
                  <CardHeader>
                    <CardTitle>Compétences requises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {projectData.skills.map((skill, index) => (
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
              </TabsContent>
              
              <TabsContent value="proposals" className="animate-fade-in">
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border mb-6">
                  <CardHeader>
                    <CardTitle>Propositions ({projectData.proposals.length})</CardTitle>
                    <CardDescription className="text-gigconnect-threads-muted">
                      Voici les freelances qui ont soumis une proposition pour ce projet
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projectData.proposals.length > 0 ? (
                      projectData.proposals.map((proposal) => (
                        <div key={proposal.id} className="flex items-center justify-between p-4 border border-gigconnect-threads-border rounded-md">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={proposal.freelancer.avatar} />
                              <AvatarFallback className="bg-gigconnect-purple text-white">
                                {proposal.freelancer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{proposal.freelancer.name}</p>
                              <p className="text-sm text-gigconnect-threads-muted">{proposal.freelancer.title}</p>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-sm">{proposal.freelancer.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`mb-2 ${
                              proposal.status === "Accepté" ? "bg-green-500" : 
                              proposal.status === "Refusé" ? "bg-red-500" : 
                              "bg-gigconnect-threads-card border-gigconnect-threads-border text-gigconnect-threads-muted"
                            }`}>
                              {proposal.status}
                            </Badge>
                            <p className="text-xs text-gigconnect-threads-muted">{proposal.submittedAt}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-6 text-gigconnect-threads-muted">
                        <p>Aucune proposition pour le moment</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <Button className="threads-button w-full">
                Soumettre une proposition
              </Button>
              <p className="text-sm text-gigconnect-threads-muted mt-2 text-center">
                Vous devez être connecté en tant que freelance pour soumettre une proposition
              </p>
            </div>
          </div>
          
          {/* Colonne latérale */}
          <div className="space-y-6">
            <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border">
              <CardHeader>
                <CardTitle>À propos du client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={projectData.client.avatar} />
                    <AvatarFallback className="bg-gigconnect-purple text-white">
                      {projectData.client.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{projectData.client.name}</p>
                      {projectData.client.verified && (
                        <CheckSquare className="h-4 w-4 ml-1 text-gigconnect-threads-accent fill-gigconnect-threads-accent" />
                      )}
                    </div>
                    <p className="text-sm text-gigconnect-threads-muted">{projectData.client.company}</p>
                  </div>
                </div>
                
                <Separator className="bg-gigconnect-threads-border" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-gigconnect-threads-muted">
                      <MapPin className="h-4 w-4" />
                      Lieu
                    </span>
                    <span>{projectData.client.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-gigconnect-threads-muted">
                      <Building className="h-4 w-4" />
                      Entreprise
                    </span>
                    <span>{projectData.client.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-gigconnect-threads-muted">
                      <Calendar className="h-4 w-4" />
                      Membre depuis
                    </span>
                    <span>{projectData.client.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-gigconnect-threads-muted">
                      <FileText className="h-4 w-4" />
                      Projets postés
                    </span>
                    <span>{projectData.client.projectsPosted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-gigconnect-threads-muted">
                      <Award className="h-4 w-4" />
                      Taux d'embauche
                    </span>
                    <span>{projectData.client.hireRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 text-gigconnect-threads-muted">
                      <Shield className="h-5 w-5 text-gigconnect-threads-accent" />
                      Paiement sécurisé
                    </span>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 text-gigconnect-threads-muted">
                      <Users className="h-5 w-5 text-gigconnect-threads-accent" />
                      Client vérifié
                    </span>
                    <span className="text-green-500">✓</span>
                  </div>
                  <Separator className="bg-gigconnect-threads-border" />
                  <p className="text-sm text-center text-gigconnect-threads-muted">
                    Les paiements sont sécurisés et libérés uniquement lorsque vous êtes satisfait du travail
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center">
              <Button variant="outline" className="w-full border-gigconnect-threads-border text-gigconnect-threads-text hover:bg-gigconnect-threads-card">
                Signaler ce projet
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetail;
