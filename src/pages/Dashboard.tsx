
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Messaging from "@/components/Messaging";
import {
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  Calendar,
  Star,
  ArrowUpRight,
  Inbox,
  Settings,
  Bell,
  MessageSquare,
  LineChart,
  DollarSign,
  FileText,
  Edit,
  ThumbsUp
} from "lucide-react";

// Dummy data for the dashboard
const stats = [
  {
    id: 1,
    title: "Revenus ce mois",
    value: "1 250€",
    change: "+12%",
    increasing: true,
    icon: <DollarSign className="h-5 w-5 text-gigconnect-threads-accent" />
  },
  {
    id: 2,
    title: "Taux de conversion",
    value: "32%",
    change: "+5%",
    increasing: true,
    icon: <LineChart className="h-5 w-5 text-gigconnect-threads-accent" />
  },
  {
    id: 3,
    title: "Projets en cours",
    value: "3",
    change: "",
    increasing: false,
    icon: <FileText className="h-5 w-5 text-gigconnect-threads-accent" />
  },
  {
    id: 4,
    title: "Vues de profil",
    value: "142",
    change: "+22%",
    increasing: true,
    icon: <Users className="h-5 w-5 text-gigconnect-threads-accent" />
  }
];

const activeProjects = [
  {
    id: 1,
    title: "Refonte Site E-commerce",
    client: "Marie Laurent",
    clientAvatar: "",
    progress: 65,
    deadline: "25 Avr 2025",
    budget: "2 500€",
    status: "En cours"
  },
  {
    id: 2,
    title: "Application Mobile de Livraison",
    client: "Jean Dupont",
    clientAvatar: "",
    progress: 30,
    deadline: "15 Mai 2025",
    budget: "3 800€",
    status: "En cours"
  },
  {
    id: 3,
    title: "Identité de Marque pour Startup",
    client: "Claire Petit",
    clientAvatar: "",
    progress: 90,
    deadline: "10 Avr 2025",
    budget: "1 200€",
    status: "Révision"
  }
];

const recentReviews = [
  {
    id: 1,
    project: "Site Vitrine pour Restaurant",
    client: "Martin Richard",
    clientAvatar: "",
    rating: 5,
    comment: "Travail exceptionnel ! Livraison rapide et communication parfaite. Je recommande vivement.",
    date: "Il y a 2 jours"
  },
  {
    id: 2,
    project: "Optimisation SEO",
    client: "Émilie Bernard",
    clientAvatar: "",
    rating: 4,
    comment: "Très bon travail dans l'ensemble. Quelques retards mais les résultats sont là.",
    date: "Il y a 1 semaine"
  }
];

const newOpportunities = [
  {
    id: 1,
    title: "Développement WordPress Avancé",
    client: "Entreprise XYZ",
    budget: "1 500€ - 2 000€",
    posted: "Il y a 3h",
    proposals: 4,
    matchScore: 95
  },
  {
    id: 2,
    title: "Refonte Interface Utilisateur",
    client: "Startup ABC",
    budget: "2 000€ - 3 500€",
    posted: "Il y a 12h",
    proposals: 7,
    matchScore: 88
  },
  {
    id: 3,
    title: "Intégration API de Paiement",
    client: "Commerce 123",
    budget: "800€ - 1 200€",
    posted: "Il y a 1j",
    proposals: 9,
    matchScore: 82
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="min-h-screen flex flex-col bg-gigconnect-threads-bg text-gigconnect-threads-text">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Sidebar / Navigation */}
          <div className="w-full md:w-56 lg:w-64 space-y-2">
            <div className="mb-6 flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gigconnect-purple text-lg">TD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold">Thomas Dubois</h2>
                <p className="text-sm text-gigconnect-threads-muted">Développeur Full Stack</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeTab === "overview" ? "bg-gigconnect-threads-card" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Vue d'ensemble
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeTab === "projects" ? "bg-gigconnect-threads-card" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Projets en cours
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeTab === "messages" ? "bg-gigconnect-threads-card" : ""}`}
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Messages
              <Badge className="ml-auto bg-gigconnect-threads-accent">3</Badge>
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeTab === "opportunities" ? "bg-gigconnect-threads-card" : ""}`}
              onClick={() => setActiveTab("opportunities")}
            >
              <ArrowUpRight className="h-5 w-5 mr-2" />
              Opportunités
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeTab === "reviews" ? "bg-gigconnect-threads-card" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              <Star className="h-5 w-5 mr-2" />
              Avis clients
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeTab === "notifications" ? "bg-gigconnect-threads-card" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="h-5 w-5 mr-2" />
              Notifications
              <Badge className="ml-auto bg-gigconnect-threads-accent">5</Badge>
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${activeTab === "settings" ? "bg-gigconnect-threads-card" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5 mr-2" />
              Paramètres
            </Button>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Tableau de bord</h1>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <Card key={stat.id} className="bg-gigconnect-threads-card border-gigconnect-threads-border">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gigconnect-threads-muted mb-1">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-gigconnect-threads-accent/10 flex items-center justify-center">
                            {stat.icon}
                          </div>
                        </div>
                        
                        {stat.change && (
                          <div className={`flex items-center mt-2 text-sm ${
                            stat.increasing ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {stat.increasing ? '↑' : '↓'} {stat.change}
                            <span className="text-gigconnect-threads-muted ml-1">vs mois dernier</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Active Projects */}
                  <div className="col-span-2">
                    <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border h-full">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Projets en cours</CardTitle>
                          <CardDescription className="text-gigconnect-threads-muted">
                            {activeProjects.length} projets en cours de réalisation
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gigconnect-threads-accent">
                          Voir tous
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-5">
                          {activeProjects.map((project) => (
                            <div key={project.id} className="group">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs bg-gigconnect-purple">
                                      {project.client.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{project.title}</p>
                                    <p className="text-sm text-gigconnect-threads-muted">{project.client}</p>
                                  </div>
                                </div>
                                <Badge className={
                                  project.status === "En cours" ? "bg-blue-500" :
                                  project.status === "Révision" ? "bg-yellow-500" :
                                  "bg-green-500"
                                }>
                                  {project.status}
                                </Badge>
                              </div>
                              
                              <div className="mb-1">
                                <Progress value={project.progress} className="h-2" />
                              </div>
                              
                              <div className="flex justify-between text-xs text-gigconnect-threads-muted">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {project.deadline}
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {project.budget}
                                </div>
                                <div>{project.progress}% terminé</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Recent Reviews */}
                  <div>
                    <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <ThumbsUp className="h-5 w-5 mr-2 text-gigconnect-threads-accent" />
                          Avis récents
                        </CardTitle>
                        <CardDescription className="text-gigconnect-threads-muted">
                          Derniers retours de vos clients
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {recentReviews.map((review) => (
                          <div key={review.id} className="p-3 bg-gigconnect-threads-bg rounded-md">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs bg-gigconnect-purple">
                                    {review.client.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <p className="font-medium">{review.client}</p>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gigconnect-threads-muted"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <p className="text-sm mb-2 text-gigconnect-threads-muted">{review.project}</p>
                            <p className="text-sm">{review.comment}</p>
                            <p className="text-xs text-gigconnect-threads-muted mt-2">{review.date}</p>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full border-gigconnect-threads-border text-gigconnect-threads-text hover:bg-gigconnect-threads-bg">
                          Voir tous les avis
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Recommended Opportunities */}
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Opportunités recommandées</CardTitle>
                      <CardDescription className="text-gigconnect-threads-muted">
                        Projets correspondant à votre profil
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gigconnect-threads-accent">
                      Voir plus
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {newOpportunities.map((opportunity) => (
                        <Card key={opportunity.id} className="bg-gigconnect-threads-bg border-gigconnect-threads-border hover-transform">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium line-clamp-2">{opportunity.title}</h3>
                              <Badge className="bg-gigconnect-threads-accent">
                                {opportunity.matchScore}%
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-gigconnect-threads-muted mb-3">{opportunity.client}</p>
                            
                            <div className="flex justify-between text-sm mb-3">
                              <span className="flex items-center">
                                <DollarSign className="h-3.5 w-3.5 mr-1 text-gigconnect-threads-muted" />
                                {opportunity.budget}
                              </span>
                              <span className="text-gigconnect-threads-muted">{opportunity.proposals} propositions</span>
                            </div>
                            
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gigconnect-threads-muted">
                                {opportunity.posted}
                              </span>
                              <Button size="sm" variant="outline" className="h-8 border-gigconnect-threads-accent text-gigconnect-threads-accent">
                                Soumettre
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Projects Tab */}
            {activeTab === "projects" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Projets en cours</h1>
                {/* Projects content would go here */}
                <div className="text-center py-10 text-gigconnect-threads-muted">
                  <p>Contenu détaillé des projets à implémenter</p>
                </div>
              </div>
            )}
            
            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Messages</h1>
                <Messaging />
              </div>
            )}
            
            {/* Opportunities Tab */}
            {activeTab === "opportunities" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Opportunités</h1>
                {/* Opportunities content would go here */}
                <div className="text-center py-10 text-gigconnect-threads-muted">
                  <p>Contenu détaillé des opportunités à implémenter</p>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Avis clients</h1>
                {/* Reviews content would go here */}
                <div className="text-center py-10 text-gigconnect-threads-muted">
                  <p>Contenu détaillé des avis à implémenter</p>
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Notifications</h1>
                {/* Notifications content would go here */}
                <div className="text-center py-10 text-gigconnect-threads-muted">
                  <p>Contenu détaillé des notifications à implémenter</p>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
                {/* Settings content would go here */}
                <div className="text-center py-10 text-gigconnect-threads-muted">
                  <p>Contenu détaillé des paramètres à implémenter</p>
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

export default Dashboard;
