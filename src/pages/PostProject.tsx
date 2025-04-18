import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categorySkills, type Skill } from "@/data/categorySkills";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  FileText, Tag, Briefcase, CreditCard, CalendarClock, 
  ArrowRight, Check, X 
} from "lucide-react";

const categories = [
  { id: "dev", name: "Développement web & mobile" },
  { id: "design", name: "Design & Création" },
  { id: "marketing", name: "Marketing digital" },
  { id: "writing", name: "Rédaction & Traduction" },
  { id: "video", name: "Vidéo & Animation" },
  { id: "audio", name: "Audio & Musique" },
  { id: "business", name: "Business & Conseil" },
  { id: "data", name: "Données & IA" },
];

const webDevSkills = [
  { id: "html", name: "HTML/CSS" },
  { id: "js", name: "JavaScript" },
  { id: "react", name: "React" },
  { id: "vue", name: "Vue.js" },
  { id: "angular", name: "Angular" },
  { id: "node", name: "Node.js" },
  { id: "php", name: "PHP" },
  { id: "wordpress", name: "WordPress" },
  { id: "laravel", name: "Laravel" },
  { id: "python", name: "Python" },
  { id: "django", name: "Django" },
  { id: "ruby", name: "Ruby on Rails" },
];

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Le titre doit comporter au moins 10 caractères.",
  }).max(100, {
    message: "Le titre ne doit pas dépasser 100 caractères.",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie.",
  }),
  description: z.string().min(50, {
    message: "La description doit comporter au moins 50 caractères.",
  }),
  skills: z.array(z.string()).min(1, {
    message: "Sélectionnez au moins une compétence requise.",
  }),
  customSkills: z.array(z.string()),
  budget: z.object({
    type: z.enum(["fixed", "hourly"], {
      required_error: "Veuillez sélectionner un type de budget.",
    }),
    min: z.string().min(1, "Obligatoire"),
    max: z.string().min(1, "Obligatoire"),
  }),
  deadline: z.string().min(1, {
    message: "Veuillez indiquer un délai pour le projet.",
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les termes et conditions." }),
  }),
});

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

  const getAvailableSkills = (category: string): Skill[] => {
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
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre du projet</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Développement d'un site e-commerce WordPress" 
                            className="bg-background/50 border-input/50 focus:border-gigconnect-purple transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Soyez spécifique et concis (10-100 caractères)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gigconnect-purple" />
                          Catégorie
                        </FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedCategory(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-input/50 focus:border-gigconnect-purple">
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background/90 backdrop-blur-sm">
                            {categories.map((category) => (
                              <SelectItem 
                                key={category.id} 
                                value={category.id}
                                className="focus:bg-gigconnect-purple/10 focus:text-gigconnect-purple"
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description du projet</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez votre projet en détail..." 
                            className="min-h-32 bg-background/50 border-input/50 focus:border-gigconnect-purple resize-y"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Détaillez vos besoins, attentes et exigences (minimum 50 caractères)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-gigconnect-purple" />
                            Compétences requises
                          </FormLabel>
                          <FormDescription>
                            Sélectionnez ou ajoutez les compétences nécessaires
                          </FormDescription>
                        </div>
                        
                        {selectedCategory && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {getAvailableSkills(selectedCategory).map((skill) => (
                                <FormField
                                  key={skill.id}
                                  control={form.control}
                                  name="skills"
                                  render={({ field }) => (
                                    <FormItem
                                      key={skill.id}
                                      className="flex items-center space-x-2 space-y-0 rounded-lg border border-input/50 p-3 hover:bg-accent/50 transition-colors"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(skill.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, skill.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== skill.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal cursor-pointer">
                                        {skill.name}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>

                            <div className="space-y-2">
                              <FormLabel>Ajouter une compétence personnalisée</FormLabel>
                              <div className="flex gap-2">
                                <Input
                                  value={newSkill}
                                  onChange={(e) => setNewSkill(e.target.value)}
                                  placeholder="Ex: React Native"
                                  className="flex-1"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      handleAddCustomSkill();
                                    }
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="shrink-0"
                                  onClick={handleAddCustomSkill}
                                >
                                  Ajouter
                                </Button>
                              </div>

                              {form.watch("customSkills").length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {form.watch("customSkills").map((skill, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-1 bg-gigconnect-purple/10 text-gigconnect-purple px-2 py-1 rounded-md text-sm"
                                    >
                                      {skill}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const customSkills = form.getValues("customSkills");
                                          form.setValue(
                                            "customSkills",
                                            customSkills.filter((_, i) => i !== index)
                                          );
                                        }}
                                        className="text-gigconnect-purple hover:text-gigconnect-purple/80 transition-colors"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator className="bg-border/50" />
                  
                  <FormField
                    control={form.control}
                    name="budget.type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gigconnect-purple" />
                          Type de budget
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2 rounded-lg border border-input/50 p-3 hover:bg-accent/50 transition-colors">
                              <RadioGroupItem value="fixed" id="fixed" />
                              <Label htmlFor="fixed" className="cursor-pointer">Budget fixe (pour tout le projet)</Label>
                            </div>
                            <div className="flex items-center space-x-2 rounded-lg border border-input/50 p-3 hover:bg-accent/50 transition-colors">
                              <RadioGroupItem value="hourly" id="hourly" />
                              <Label htmlFor="hourly" className="cursor-pointer">Taux horaire</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="budget.min"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Budget minimum (€)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              className="bg-background/50 border-input/50 focus:border-gigconnect-purple"
                              placeholder="Min" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="budget.max"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Budget maximum (€)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              className="bg-background/50 border-input/50 focus:border-gigconnect-purple"
                              placeholder="Max" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <CalendarClock className="w-4 h-4 text-gigconnect-purple" />
                          Délai de réalisation
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-input/50 focus:border-gigconnect-purple">
                              <SelectValue placeholder="Sélectionnez un délai" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background/90 backdrop-blur-sm">
                            <SelectItem value="less_than_1_week">Moins d'une semaine</SelectItem>
                            <SelectItem value="1_2_weeks">1 à 2 semaines</SelectItem>
                            <SelectItem value="2_4_weeks">2 à 4 semaines</SelectItem>
                            <SelectItem value="1_3_months">1 à 3 mois</SelectItem>
                            <SelectItem value="more_than_3_months">Plus de 3 mois</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator className="bg-border/50" />
                  
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-input/50 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            J'accepte les conditions d'utilisation et la politique de confidentialité
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
