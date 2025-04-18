
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySkills } from "@/data/categorySkills";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FileText, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formSchema } from "@/components/post-project/schema";
import { ProjectBasicInfo } from "@/components/post-project/ProjectBasicInfo";
import { ProjectSkills } from "@/components/post-project/ProjectSkills";
import { ProjectBudget } from "@/components/post-project/ProjectBudget";
import { ProjectDeadline } from "@/components/post-project/ProjectDeadline";
import { ProjectTerms } from "@/components/post-project/ProjectTerms";
import { z } from "zod";

const PostProject = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      skills: [],
      customSkills: [],
      budget: {
        type: "fixed",
        min: "",
        max: "",
      },
      termsAccepted: false as unknown as true,
    },
  });

  const getAvailableSkills = (category: string) => {
    return categorySkills[category] || [];
  };

  const handleAddCustomSkill = () => {
    if (!newSkill.trim()) return;
    
    const customSkills = form.getValues("customSkills");
    if (!customSkills.includes(newSkill.trim())) {
      form.setValue("customSkills", [...customSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log(values);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Projet publié avec succès!",
      description: "Les freelances peuvent maintenant voir votre projet.",
      duration: 5000,
    });
    
    setIsSubmitting(false);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gigconnect-purple/5 to-transparent">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-gigconnect-purple to-gigconnect-darkpurple bg-clip-text text-transparent">
            Publier un nouveau projet
          </h1>
          <p className="text-muted-foreground mb-8">
            Trouvez le freelance idéal en décrivant précisément vos besoins
          </p>
          
          <Card className="bg-card/50 backdrop-blur-sm border-gigconnect-purple/20 shadow-lg hover:shadow-gigconnect-purple/5 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gigconnect-purple" />
                Détails du projet
              </CardTitle>
              <CardDescription>
                Plus vos détails seront précis, plus vous attirerez les freelances qualifiés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <ProjectBasicInfo 
                    form={form} 
                    onCategoryChange={setSelectedCategory} 
                  />
                  
                  <ProjectSkills 
                    form={form}
                    availableSkills={getAvailableSkills(selectedCategory)}
                    newSkill={newSkill}
                    setNewSkill={setNewSkill}
                    handleAddCustomSkill={handleAddCustomSkill}
                  />
                  
                  <Separator className="bg-border/50" />
                  
                  <ProjectBudget form={form} />
                  
                  <ProjectDeadline form={form} />
                  
                  <Separator className="bg-border/50" />
                  
                  <ProjectTerms form={form} />
                  
                  <CardFooter className="flex justify-end px-0 pb-0">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-gigconnect-purple hover:bg-gigconnect-purple/90 text-white gap-2 group"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-pulse">Publication en cours...</span>
                          <Check className="w-4 h-4 animate-bounce" />
                        </>
                      ) : (
                        <>
                          Publier le projet
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PostProject;
