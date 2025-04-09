
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  const handleClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size]} ${
            index < Math.floor(rating) 
              ? "text-yellow-400 fill-yellow-400" 
              : index < rating 
                ? "text-yellow-400 fill-yellow-400 opacity-60" 
                : "text-gigconnect-threads-muted"
          } ${interactive ? "cursor-pointer" : ""}`}
          onClick={() => handleClick(index + 1)}
        />
      ))}
      
      {interactive && (
        <span className="ml-2 text-sm text-gigconnect-threads-muted">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
