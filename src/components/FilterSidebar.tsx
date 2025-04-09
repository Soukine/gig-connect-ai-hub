
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Collapsible, CollapsibleContent, CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  Filter, X, ChevronDown, ChevronUp, CheckCircle2, Star
} from "lucide-react";

// Dummy data for filters
const categories = [
  { id: "dev_web", label: "Développement Web" },
  { id: "dev_mobile", label: "Développement Mobile" },
  { id: "design_ui", label: "Design UI/UX" },
  { id: "design_graphique", label: "Design Graphique" },
  { id: "marketing", label: "Marketing Digital" },
  { id: "seo", label: "SEO" },
  { id: "redaction", label: "Rédaction Web" },
  { id: "traduction", label: "Traduction" },
  { id: "video", label: "Montage Vidéo" }
];

const skills = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue.js" },
  { id: "angular", label: "Angular" },
  { id: "nodejs", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "django", label: "Django" },
  { id: "laravel", label: "Laravel" },
  { id: "wordpress", label: "WordPress" },
  { id: "figma", label: "Figma" },
  { id: "photoshop", label: "Photoshop" },
  { id: "illustrator", label: "Illustrator" }
];

const languages = [
  { id: "fr", label: "Français" },
  { id: "en", label: "Anglais" },
  { id: "es", label: "Espagnol" },
  { id: "de", label: "Allemand" },
  { id: "it", label: "Italien" }
];

interface FilterSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const FilterSidebar = ({ isMobile = false, onClose }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [isNewOnly, setIsNewOnly] = useState(false);
  
  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId]
    );
  };
  
  // Toggle skill selection
  const toggleSkill = (skillId: string) => {
    setSelectedSkills(
      selectedSkills.includes(skillId)
        ? selectedSkills.filter(id => id !== skillId)
        : [...selectedSkills, skillId]
    );
  };
  
  // Toggle language selection
  const toggleLanguage = (languageId: string) => {
    setSelectedLanguages(
      selectedLanguages.includes(languageId)
        ? selectedLanguages.filter(id => id !== languageId)
        : [...selectedLanguages, languageId]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedSkills([]);
    setSelectedLanguages([]);
    setRatingFilter(0);
    setIsVerifiedOnly(false);
    setIsNewOnly(false);
  };
  
  // Apply filters
  const applyFilters = () => {
    console.log("Applying filters:", {
      priceRange,
      selectedCategories,
      selectedSkills,
      selectedLanguages,
      ratingFilter,
      isVerifiedOnly,
      isNewOnly,
    });
    
    // Close sidebar on mobile after applying
    if (isMobile && onClose) {
      onClose();
    }
  };
  
  // Calculate active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    if (selectedCategories.length > 0) count++;
    if (selectedSkills.length > 0) count++;
    if (selectedLanguages.length > 0) count++;
    if (ratingFilter > 0) count++;
    if (isVerifiedOnly) count++;
    if (isNewOnly) count++;
    return count;
  };
  
  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className={`flex flex-col h-full ${isMobile ? 'pb-20' : ''}`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="font-bold">Filtres</h2>
          {activeFiltersCount > 0 && (
            <Badge className="bg-gigconnect-threads-accent">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        
        {isMobile && (
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gigconnect-threads-muted">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <Separator className="bg-gigconnect-threads-border" />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Budget filter */}
        <div className="space-y-3">
          <Label className="font-medium">Budget</Label>
          <div className="pt-2 px-1">
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={50}
              onValueChange={setPriceRange}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>{priceRange[0]}€</span>
            <span>{priceRange[1] === 1000 ? priceRange[1] + "€+" : priceRange[1] + "€"}</span>
          </div>
        </div>
        
        {/* Rating filter */}
        <div className="space-y-3">
          <Label className="font-medium">Note minimale</Label>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Button 
                key={rating} 
                variant="outline"
                size="sm"
                className={`flex-1 ${
                  ratingFilter === rating + 1 
                    ? 'bg-gigconnect-threads-accent text-white border-gigconnect-threads-accent' 
                    : 'bg-gigconnect-threads-card border-gigconnect-threads-border'
                }`}
                onClick={() => setRatingFilter(rating + 1)}
              >
                <div className="flex items-center">
                  <Star className={`h-3.5 w-3.5 ${ratingFilter === rating + 1 ? 'fill-white' : 'fill-yellow-400'} text-yellow-400`} />
                  <span className="ml-1">{rating + 1}+</span>
                </div>
              </Button>
            ))}
            
            <Button 
              variant="outline"
              size="sm"
              className={`${ratingFilter === 0 ? 'bg-gigconnect-threads-card' : 'bg-gigconnect-threads-bg'}`}
              onClick={() => setRatingFilter(0)}
            >
              <X className="h-3.5 w-3.5 text-gigconnect-threads-muted" />
            </Button>
          </div>
        </div>
        
        {/* Verification and New filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="verified" 
              checked={isVerifiedOnly} 
              onCheckedChange={(checked) => setIsVerifiedOnly(checked as boolean)} 
            />
            <label
              htmlFor="verified"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
            >
              <CheckCircle2 className="h-4 w-4 mr-1 text-gigconnect-threads-accent" />
              Profils vérifiés uniquement
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="new" 
              checked={isNewOnly} 
              onCheckedChange={(checked) => setIsNewOnly(checked as boolean)} 
            />
            <label
              htmlFor="new"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Nouveaux talents uniquement
            </label>
          </div>
        </div>
        
        {/* Category filter */}
        <Collapsible className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Catégories</Label>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Skills filter */}
        <Collapsible className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Compétences</Label>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              {skills.map(skill => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`skill-${skill.id}`} 
                    checked={selectedSkills.includes(skill.id)}
                    onCheckedChange={() => toggleSkill(skill.id)}
                  />
                  <label
                    htmlFor={`skill-${skill.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {skill.label}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Languages filter */}
        <Collapsible className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Langues</Label>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              {languages.map(language => (
                <div key={language.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`language-${language.id}`} 
                    checked={selectedLanguages.includes(language.id)}
                    onCheckedChange={() => toggleLanguage(language.id)}
                  />
                  <label
                    htmlFor={`language-${language.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {language.label}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div className={`p-4 border-t border-gigconnect-threads-border ${isMobile ? 'fixed bottom-0 left-0 right-0 bg-gigconnect-threads-card' : ''}`}>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 border-gigconnect-threads-border text-gigconnect-threads-text hover:bg-gigconnect-threads-bg"
            onClick={clearFilters}
            disabled={activeFiltersCount === 0}
          >
            Réinitialiser
          </Button>
          <Button 
            className="flex-1 bg-gigconnect-threads-accent hover:bg-gigconnect-threads-accent/80"
            onClick={applyFilters}
          >
            Appliquer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
