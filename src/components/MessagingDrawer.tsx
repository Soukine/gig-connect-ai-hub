
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";
import Messaging from "@/components/Messaging";

const MessagingDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Open messages"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:w-[500px] md:w-[600px] p-0" side="right">
        <div className="h-full overflow-hidden">
          <Messaging />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MessagingDrawer;
