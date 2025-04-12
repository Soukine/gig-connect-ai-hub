
import React from "react";
import { Button } from "@/components/ui/button";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import { useNavigate } from "react-router-dom";

interface ProjectsSectionProps {
  projects: ProjectCardProps[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const navigate = useNavigate();
  
  const handleSeeMoreProjects = () => {
    navigate("/jobs");
  };

  return (
    <section className="py-16 bg-gigconnect-lightpurple/30">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Projets & Missions</h2>
          <p className="text-muted-foreground mt-2">
            Trouvez des opportunités qui correspondent à vos compétences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            variant="outline" 
            className="border-gigconnect-purple text-gigconnect-purple"
            onClick={handleSeeMoreProjects}
          >
            Voir plus de projets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
