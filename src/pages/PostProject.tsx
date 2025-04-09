
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

// Categories for the dropdown
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

// Skills for checkboxes (sample for web dev)
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

// Validation schema
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
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      skills: [],
      budget: {
        type: "fixed",
        min: "",
        max: "",
      },
      termsAccepted: false as unknown as true, // This fix uses type assertion
    },
  });
  
  // Get available skills based on selected category (in real app, this would be dynamic)
  const getAvailableSkills = () => {
    // This is simplified, in a real app you'd fetch skills based on category
    return webDevSkills;
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Show success toast
    toast({
      title: "Projet publié avec succès",
      description: "Les freelances peuvent maintenant voir votre projet et y répondre.",
    });
    
    // Redirect to a success page or projects list
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gigconnect-threads-bg text-gigconnect-threads-text">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 threads-layout">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Publier un nouveau projet</h1>
        
        <Card className="bg-gigconnect-threads-card border-gigconnect-threads-border">
          <CardHeader>
            <CardTitle>Détails du projet</CardTitle>
            <CardDescription className="text-gigconnect-threads-muted">
              Décrivez votre projet clairement pour attirer les freelances les plus qualifiés
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
                          className="bg-gigconnect-threads-bg border-gigconnect-threads-border text-gigconnect-threads-text"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gigconnect-threads-muted">
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
                      <FormLabel>Catégorie</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCategory(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gigconnect-threads-bg border-gigconnect-threads-border text-gigconnect-threads-text">
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gigconnect-threads-card border-gigconnect-threads-border text-gigconnect-threads-text">
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
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
                          className="min-h-32 bg-gigconnect-threads-bg border-gigconnect-threads-border text-gigconnect-threads-text"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gigconnect-threads-muted">
                        Soyez le plus détaillé possible sur vos besoins, attentes et exigences (minimum 50 caractères)
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
                      <div className="mb-2">
                        <FormLabel>Compétences requises</FormLabel>
                        <FormDescription className="text-gigconnect-threads-muted">
                          Sélectionnez les compétences nécessaires pour ce projet
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {getAvailableSkills().map((skill) => (
                          <FormField
                            key={skill.id}
                            control={form.control}
                            name="skills"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={skill.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
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
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator className="bg-gigconnect-threads-border" />
                
                <FormField
                  control={form.control}
                  name="budget.type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Type de budget</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fixed" id="fixed" />
                            <Label htmlFor="fixed" className="cursor-pointer">Budget fixe (pour tout le projet)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
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
                            className="bg-gigconnect-threads-bg border-gigconnect-threads-border text-gigconnect-threads-text"
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
                            className="bg-gigconnect-threads-bg border-gigconnect-threads-border text-gigconnect-threads-text"
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
                      <FormLabel>Délai de réalisation</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="bg-gigconnect-threads-bg border-gigconnect-threads-border text-gigconnect-threads-text">
                            <SelectValue placeholder="Sélectionnez un délai" />
                          </SelectTrigger>
                          <SelectContent className="bg-gigconnect-threads-card border-gigconnect-threads-border text-gigconnect-threads-text">
                            <SelectItem value="less_than_1_week">Moins d'une semaine</SelectItem>
                            <SelectItem value="1_2_weeks">1 à 2 semaines</SelectItem>
                            <SelectItem value="2_4_weeks">2 à 4 semaines</SelectItem>
                            <SelectItem value="1_3_months">1 à 3 mois</SelectItem>
                            <SelectItem value="more_than_3_months">Plus de 3 mois</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator className="bg-gigconnect-threads-border" />
                
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
                  <Button type="submit" className="threads-button">
                    Publier le projet
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PostProject;
