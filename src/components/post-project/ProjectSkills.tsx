
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tag, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";
import { Skill } from "@/data/categorySkills";

type ProjectSkillsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  availableSkills: Skill[];
  newSkill: string;
  setNewSkill: (value: string) => void;
  handleAddCustomSkill: () => void;
};

export function ProjectSkills({ 
  form, 
  availableSkills, 
  newSkill, 
  setNewSkill, 
  handleAddCustomSkill 
}: ProjectSkillsProps) {
  return (
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
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSkills.map((skill) => (
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
