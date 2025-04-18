
import { z } from "zod";

export const formSchema = z.object({
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
