
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, FileCheck } from "lucide-react";

export interface ProjectCardProps {
  id: number;
  title: string;
  client: string;
  budget: string;
  duration: string;
  postedDate: string;
  category: string;
  description: string;
  proposals: number;
}

const ProjectCard = ({
  id,
  title,
  client,
  budget,
  duration,
  category,
  description,
  proposals
}: ProjectCardProps) => {
  return (
    <Link to={`/project/${id}`}>
      <Card className="gig-card hover-transform h-full">
        <CardContent className="p-0">
          <div className="p-5 bg-gradient-to-br from-gigconnect-lightpurple/50 to-gigconnect-lightpurple/20">
            <Badge className="mb-2 bg-white text-gigconnect-purple">
              {category}
            </Badge>
            <h3 className="font-semibold text-xl mb-2">{title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Calendar className="h-4 w-4 mr-1" /> {duration}
            </div>
            <div className="flex items-center text-sm font-medium">
              <span>{budget}</span>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-sm line-clamp-3 mb-4">
              {description}
            </p>
            
            <div className="flex justify-between items-center pt-3 border-t">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback className="bg-gigconnect-purple/20 text-gigconnect-purple text-xs">
                    {client.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{client}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <FileCheck className="h-4 w-4 mr-1" />
                <span>{proposals} propositions</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
