
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";
import { FormLabel } from "@/components/ui/form";

type ProjectTermsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function ProjectTerms({ form }: ProjectTermsProps) {
  return (
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
        </FormItem>
      )}
    />
  );
}
