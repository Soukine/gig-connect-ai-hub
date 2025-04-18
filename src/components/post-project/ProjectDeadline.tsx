
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarClock } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";

type ProjectDeadlineProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function ProjectDeadline({ form }: ProjectDeadlineProps) {
  return (
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
  );
}
