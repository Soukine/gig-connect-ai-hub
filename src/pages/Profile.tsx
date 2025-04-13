
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Star, Award, User, Settings, Edit, Link, FileText, Code, Image, Pen, Calendar, MapPin, Mail, Phone, Globe, ExternalLink } from "lucide-react";

// Mock data for the profile
const userInfo = {
  name: "Thomas Dubois",
  role: "Développeur Full Stack",
  since: "Mars 2024",
  avatarUrl: "",
  email: "thomas.dubois@example.com",
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
  about: "Développeur Full Stack passionné avec plus de 5 ans d'expérience dans la création d'applications web modernes et performantes. Spécialisé dans les technologies React, Node.js et TypeScript.",
  website: "https://thomasdubois.dev",
  profileCompletion: 85,
};

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

const portfolioProjects = [
  {
    id: 1,
    title: "Application de Gestion de Tâches",
    description: "Une application React pour la gestion de tâches avec authentification et stockage cloud",
    image: "",
    tags: ["React", "Firebase", "Tailwind CSS"],
    link: "https://project-task-app.example.com"
  },
  {
    id: 2,
    title: "Site E-commerce pour Artisans",
    description: "Plateforme permettant aux artisans de vendre leurs créations en ligne",
    image: "",
    tags: ["Next.js", "Stripe", "MongoDB"],
    link: "https://artisan-market.example.com"
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description: "Interface d'analyse de données avec graphiques interactifs pour une startup fintech",
    image: "",
    tags: ["Vue.js", "D3.js", "Node.js"],
    link: "https://analytics-dashboard.example.com"
  },
];

const userSkills = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Next.js", level: 75 },
  { name: "GraphQL", level: 70 },
  { name: "MongoDB", level: 65 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Firebase", level: 75 },
];

const services = [
  {
    id: 1,
    title: "Développement Front-End",
    description: "Création d'interfaces utilisateur modernes et responsives avec React, Vue.js ou Angular",
    price: "À partir de 500€",
    icon: <Code className="h-8 w-8 text-gigconnect-threads-accent" />
  },
  {
    id: 2,
    title: "Applications Full Stack",
    description: "Développement complet d'applications web avec backend, base de données et authentification",
    price: "À partir de 1500€",
    icon: <Globe className="h-8 w-8 text-gigconnect-threads-accent" />
  },
  {
    id: 3,
    title: "Conseil Technique",
    description: "Expertise et conseil pour l'architecture, choix technologiques et optimisation de performance",
    price: "80€/heure",
    icon: <Briefcase className="h-8 w-8 text-gigconnect-threads-accent" />
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleEditProfile = () => {
    setIsEditMode(!isEditMode);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gigconnect-threads-bg text-gigconnect-threads-text">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border shadow-md">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-gigconnect-threads-accent">
                      <AvatarImage src={userInfo.avatarUrl} alt={userInfo.name} />
                      <AvatarFallback className="bg-gigconnect-purple text-white text-3xl">
                        {userInfo.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full bg-gigconnect-threads-card border-gigconnect-threads-border"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-2xl">{userInfo.name}</CardTitle>
                <p className="text-gigconnect-threads-accent font-medium">{userInfo.role}</p>
                <p className="text-muted-foreground text-sm mt-1">Membre depuis {userInfo.since}</p>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Profil complété</span>
                    <span>{userInfo.profileCompletion}%</span>
                  </div>
                  <Progress value={userInfo.profileCompletion} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gigconnect-threads-muted" />
                    <span>{userInfo.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gigconnect-threads-muted" />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gigconnect-threads-muted" />
                    <span>{userInfo.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-gigconnect-threads-muted" />
                    <a href={userInfo.website} target="_blank" rel="noopener noreferrer" className="text-gigconnect-threads-accent hover:underline flex items-center">
                      {userInfo.website.replace('https://', '')}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gigconnect-threads-border my-4"></div>
                
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-gigconnect-threads-bg hover:text-gigconnect-threads-accent"
                    onClick={() => navigate("/dashboard")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Tableau de bord
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-gigconnect-threads-bg hover:text-gigconnect-threads-accent"
                    onClick={() => navigate("/messages")}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-muted text-gigconnect-threads-accent"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Mon profil
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-gigconnect-threads-bg hover:text-gigconnect-threads-accent"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-4 mb-8">
                <TabsTrigger value="info" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Informations</span>
                </TabsTrigger>
                <TabsTrigger value="portfolio" className="flex items-center gap-1">
                  <Image className="h-4 w-4" />
                  <span className="hidden sm:inline">Portfolio</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Compétences</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Services</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Informations Tab */}
              <TabsContent value="info" className="space-y-6 animate-fade-in">
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border shadow-sm overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>
                        Vos informations principales visibles par les clients et employeurs potentiels
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleEditProfile}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      {isEditMode ? "Annuler" : "Modifier"}
                    </Button>
                  </CardHeader>
                  
                  <CardContent>
                    {!isEditMode ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2 text-gigconnect-threads-accent">À propos</h3>
                          <p className="text-sm">{userInfo.about}</p>
                        </div>
                        
                        <div className="pt-4 border-t border-gigconnect-threads-border">
                          <h3 className="font-medium mb-3 text-gigconnect-threads-accent">Projets actifs</h3>
                          <div className="space-y-4">
                            {activeProjects.map((project) => (
                              <div key={project.id} className="bg-gigconnect-threads-bg p-4 rounded-lg hover:border hover:border-gigconnect-threads-accent transition-all cursor-pointer">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-medium">{project.title}</h4>
                                  <Badge className={
                                    project.status === "En cours" ? "bg-blue-500" :
                                    project.status === "Révision" ? "bg-yellow-500" :
                                    "bg-green-500"
                                  }>
                                    {project.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gigconnect-threads-muted mb-2">Client: {project.client}</p>
                                <div className="mb-1">
                                  <Progress value={project.progress} className="h-1.5" />
                                </div>
                                <div className="flex justify-between text-xs text-gigconnect-threads-muted mt-2">
                                  <div className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {project.deadline}
                                  </div>
                                  <div>{project.progress}% terminé</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-gigconnect-threads-muted">
                          Modifiez vos informations personnelles ci-dessous.
                        </p>
                        {/* Edit form would go here in a real implementation */}
                        <div className="text-center py-10">
                          <p className="text-gigconnect-threads-muted">
                            Formulaire d'édition (simulation)
                          </p>
                          <Button 
                            onClick={handleEditProfile}
                            className="mt-4"
                          >
                            Sauvegarder les modifications
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-6 animate-fade-in">
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Mon portfolio</CardTitle>
                      <CardDescription>
                        Showcase de vos meilleurs projets et réalisations
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Pen className="h-4 w-4" />
                      Ajouter
                    </Button>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {portfolioProjects.map((project) => (
                        <Card key={project.id} className="bg-gigconnect-threads-bg border-gigconnect-threads-border hover-transform cursor-pointer overflow-hidden">
                          <div className="h-40 bg-muted">
                            {project.image ? (
                              <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gigconnect-threads-muted/20">
                                <Image className="h-10 w-10 text-gigconnect-threads-muted/40" />
                              </div>
                            )}
                          </div>
                          
                          <CardContent className="p-4">
                            <h3 className="font-medium text-lg mb-2">{project.title}</h3>
                            <p className="text-sm text-gigconnect-threads-muted mb-3">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="bg-gigconnect-threads-accent/10 text-gigconnect-threads-accent border-none">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-sm text-gigconnect-threads-accent hover:underline flex items-center"
                            >
                              Voir le projet
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6 animate-fade-in">
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Mes compétences</CardTitle>
                    <CardDescription>
                      Vos domaines d'expertise et niveaux de compétence
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userSkills.map((skill, index) => (
                          <div key={index} className="group">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-medium">{skill.name}</h3>
                              <span className="text-sm text-gigconnect-threads-muted">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-2.5 bg-gigconnect-threads-muted/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gigconnect-threads-accent rounded-full transition-all duration-500 ease-out group-hover:bg-primary"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-6 border-t border-gigconnect-threads-border">
                        <h3 className="font-medium mb-4 text-gigconnect-threads-accent">Certifications</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex items-center gap-3 p-3 bg-gigconnect-threads-bg rounded-lg flex-1">
                            <Award className="h-8 w-8 text-yellow-500" />
                            <div>
                              <p className="font-medium">AWS Certified Developer</p>
                              <p className="text-sm text-gigconnect-threads-muted">Obtenu en 2024</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gigconnect-threads-bg rounded-lg flex-1">
                            <Award className="h-8 w-8 text-blue-500" />
                            <div>
                              <p className="font-medium">React Certification</p>
                              <p className="text-sm text-gigconnect-threads-muted">Obtenu en 2023</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Services Tab */}
              <TabsContent value="services" className="space-y-6 animate-fade-in">
                <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Mes services</CardTitle>
                      <CardDescription>
                        Services que vous proposez à vos clients potentiels
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Pen className="h-4 w-4" />
                      Ajouter
                    </Button>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {services.map((service) => (
                        <Card key={service.id} className="bg-gigconnect-threads-bg border-gigconnect-threads-border hover-transform h-full">
                          <CardHeader>
                            <div className="mb-3">{service.icon}</div>
                            <CardTitle className="text-lg">{service.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gigconnect-threads-muted mb-4">
                              {service.description}
                            </p>
                            <p className="text-sm font-medium text-gigconnect-threads-accent">
                              {service.price}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              Détails
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
