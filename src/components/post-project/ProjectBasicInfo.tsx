
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase } from "lucide-react";
import { categories } from "./constants";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";

type ProjectBasicInfoProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onCategoryChange: (value: string) => void;
};

export function ProjectBasicInfo({ form, onCategoryChange }: ProjectBasicInfoProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gigconnect-purple" />
              Titre du projet
            </FormLabel>
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
                onCategoryChange(value);
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
    </>
  );
}
