
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Zap } from "lucide-react";
import StarRating from "@/components/StarRating";

export interface FreelanceCardProps {
  id: number;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  tags: string[];
  description: string;
  price: string;
  onContactClick: (id: number) => void;
}

const FreelanceCard = ({ 
  id, 
  name, 
  title, 
  avatar, 
  rating, 
  reviews, 
  isNew, 
  tags, 
  description, 
  price,
  onContactClick 
}: FreelanceCardProps) => {
  return (
    <Link to={`/freelance/${id}`}>
      <Card className="gig-card hover-transform h-full">
        <CardContent className="p-0">
          <div className="aspect-[16/9] bg-gigconnect-lightpurple/30 flex items-center justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-gigconnect-purple text-white text-lg">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{name}</h3>
              {isNew && (
                <Badge className="badge-new">
                  <Zap className="h-3 w-3 mr-1" /> Nouveau
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{title}</p>
            
            <div className="flex items-center mb-3">
              <StarRating rating={rating} size="sm" />
              <span className="mx-1 text-muted-foreground text-sm">
                ({reviews} avis)
              </span>
            </div>
            
            <p className="text-sm line-clamp-2 mb-3">{description}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.map((tag, index) => (
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
              <span className="text-sm font-medium">{price}</span>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-gigconnect-purple"
                onClick={(e) => {
                  e.preventDefault();
                  onContactClick(id);
                }}
              >
                <MessageSquare className="h-4 w-4 mr-1" /> Contacter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FreelanceCard;
