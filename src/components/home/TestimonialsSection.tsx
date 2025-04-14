
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { clientTestimonials } from "./data/testimonialsData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gigconnect-lightpurple/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Ce que disent nos clients</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Découvrez les expériences de ceux qui ont déjà fait confiance à notre plateforme pour leurs projets
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {clientTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 px-2">
                  <Card className="h-full border border-gigconnect-purple/10 hover:shadow-md hover:border-gigconnect-purple/30 transition-all">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 mr-3 border-2 border-gigconnect-purple/20">
                            <AvatarFallback className="bg-gigconnect-purple/10 text-gigconnect-purple">
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.position}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? "fill-gigconnect-purple text-gigconnect-purple" : "text-muted"}`} 
                          />
                        ))}
                      </div>
                      
                      <p className="text-sm italic flex-grow">{testimonial.testimonial}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white dark:bg-background border-gigconnect-purple/30" />
            <CarouselNext className="right-0 bg-white dark:bg-background border-gigconnect-purple/30" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
