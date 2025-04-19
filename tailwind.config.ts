
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Ajout de nouvelles nuances de couleurs plus lumineuses
        gigconnect: {
          purple: {
            DEFAULT: "#9b87f5",  // Purple plus clair
            dark: "#7E69AB",     // Version plus sombre, mais moins intense
            light: "#E5DEFF",    // Version très claire pour les backgrounds
          },
          green: {
            DEFAULT: "#10B981", 
            light: "#D1FAE5",    // Version très claire
          },
          navy: {
            DEFAULT: "#2C3E50",  // Navy moins foncé
            light: "#34495E",    // Légèrement plus clair
          },
          gray: {
            lightest: "#F9FAFB", 
            light: "#E5E7EB",
          }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Nouvelles animations
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "subtle-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        },
        "gentle-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "subtle-bounce": "subtle-bounce 1s ease-in-out infinite",
        "gentle-pulse": "gentle-pulse 2s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

