
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
import FreelancesSection from "@/components/home/FreelancesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection"; 
import CTASection from "@/components/home/CTASection";
import { featuredFreelances } from "@/components/home/data/freelanceData";
import { featuredProjects } from "@/components/home/data/projectData";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleContactFreelance = (id: number) => {
    toast({
      title: "Contacter le freelance",
      description: "Pour contacter ce freelance, veuillez vous connecter ou créer un compte",
    });
    navigate(`/freelance/${id}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gigconnect-lightpurple/10 via-white/20 to-gigconnect-purple/10 dark:from-gigconnect-darkpurple/20 dark:via-background/30 dark:to-gigconnect-purple/20">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Search Section */}
      <SearchSection />
      
      {/* Freelances Section */}
      <FreelancesSection 
        freelances={featuredFreelances} 
        onContactFreelance={handleContactFreelance} 
      />
      
      {/* Projects Section */}
      <ProjectsSection projects={featuredProjects} />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default Index;
