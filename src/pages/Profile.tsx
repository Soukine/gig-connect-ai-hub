
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt="@user" />
                    <AvatarFallback className="bg-gigconnect-purple text-white text-3xl">U</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">Utilisateur</CardTitle>
                <p className="text-muted-foreground">Membre depuis Mars 2024</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/dashboard")}
                  >
                    Tableau de bord
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/messages")}
                  >
                    Messages
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-muted"
                  >
                    Mon profil
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/settings")}
                  >
                    Paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="info">
              <TabsList className="w-full">
                <TabsTrigger value="info" className="flex-1">Informations</TabsTrigger>
                <TabsTrigger value="portfolio" className="flex-1">Portfolio</TabsTrigger>
                <TabsTrigger value="services" className="flex-1">Services</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Complétez votre profil pour augmenter vos chances d'être contacté par des clients potentiels.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Nom</h3>
                        <p>Utilisateur</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p>utilisateur@example.com</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Téléphone</h3>
                        <p>Non renseigné</p>
                      </div>
                      <div>
                        <h3 className="font-medium">À propos</h3>
                        <p>Aucune information disponible</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button>Modifier mon profil</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="portfolio" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mon portfolio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Vous n'avez pas encore ajouté de projets à votre portfolio.
                    </p>
                    <div className="mt-6">
                      <Button>Ajouter un projet</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Vous n'avez pas encore créé de services à proposer.
                    </p>
                    <div className="mt-6">
                      <Button>Créer un service</Button>
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
