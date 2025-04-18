
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";

type ProjectBudgetProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function ProjectBudget({ form }: ProjectBudgetProps) {
  return (
    <>
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
    </>
  );
}
