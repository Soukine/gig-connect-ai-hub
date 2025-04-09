
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Send, Image, Paperclip, MoreVertical, 
  CheckCheck, Clock, Phone, Video, Star
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Dummy conversation data
const conversations = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Marie Laurent",
      avatar: "",
      status: "online", // online, offline, away
      lastSeen: "En ligne",
      unread: 2
    },
    lastMessage: {
      text: "Je viens de vous envoyer les maquettes pour le design du site",
      time: "14:32",
      sentByMe: false,
      status: "read" // sent, delivered, read
    },
    isActive: true
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Thomas Dubois",
      avatar: "",
      status: "offline",
      lastSeen: "Il y a 3h",
      unread: 0
    },
    lastMessage: {
      text: "Le rapport sera prêt demain matin comme convenu",
      time: "Hier",
      sentByMe: true,
      status: "delivered"
    },
    isActive: false
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Sophie Martin",
      avatar: "",
      status: "away",
      lastSeen: "Il y a 20min",
      unread: 0
    },
    lastMessage: {
      text: "J'ai bien reçu votre paiement, merci beaucoup !",
      time: "Mer.",
      sentByMe: false,
      status: "read"
    },
    isActive: false
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "Julien Bernard",
      avatar: "",
      status: "offline",
      lastSeen: "Hier à 20:45",
      unread: 0
    },
    lastMessage: {
      text: "Nous pouvons démarrer le projet la semaine prochaine",
      time: "Lun.",
      sentByMe: true,
      status: "read"
    },
    isActive: false
  }
];

// Dummy messages data for the current conversation
const currentMessages = [
  {
    id: 1,
    text: "Bonjour Marie, j'espère que vous allez bien !",
    time: "14:15",
    sentByMe: true,
    status: "read"
  },
  {
    id: 2,
    text: "Bonjour ! Oui, tout va bien merci. J'ai regardé votre portfolio et j'aimerais discuter d'un projet de site e-commerce.",
    time: "14:18",
    sentByMe: false,
    status: "read"
  },
  {
    id: 3,
    text: "Excellent ! Je serais ravi de vous aider. Pouvez-vous me donner plus de détails sur votre projet ?",
    time: "14:20",
    sentByMe: true,
    status: "read"
  },
  {
    id: 4,
    text: "Bien sûr. Nous sommes une boutique de vêtements et nous cherchons à créer un site e-commerce avec environ 200 produits. Nous aimerions un design moderne et épuré, avec une navigation facile.",
    time: "14:25",
    sentByMe: false,
    status: "read"
  },
  {
    id: 5,
    text: "Je comprends vos besoins. Avez-vous déjà une idée de la plateforme que vous souhaitez utiliser ? (WordPress/WooCommerce, Shopify, solution personnalisée...)",
    time: "14:28",
    sentByMe: true,
    status: "read"
  },
  {
    id: 6,
    text: "Nous penchons plutôt pour WordPress avec WooCommerce car nous sommes déjà familiers avec l'interface d'administration. Je viens de vous envoyer les maquettes pour le design du site.",
    time: "14:32",
    sentByMe: false,
    status: "delivered"
  }
];

const Messaging = () => {
  const [message, setMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const { toast } = useToast();
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès",
      });
      
      setMessage("");
    }
  };
  
  const handleStartCall = (type: "audio" | "video") => {
    toast({
      title: `Appel ${type === "audio" ? "audio" : "vidéo"} initié`,
      description: `Démarrage de l'appel avec ${activeConversation.user.name}`,
    });
  };

  return (
    <div className="flex h-[85vh] bg-gigconnect-threads-bg text-gigconnect-threads-text border border-gigconnect-threads-border rounded-lg overflow-hidden">
      {/* Conversations list sidebar */}
      <div className="w-1/3 md:w-1/4 border-r border-gigconnect-threads-border flex flex-col">
        <div className="p-4">
          <h2 className="font-bold text-lg mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gigconnect-threads-muted" />
            <Input 
              placeholder="Rechercher une conversation..." 
              className="pl-9 bg-gigconnect-threads-card border-gigconnect-threads-border"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="px-4">
            <TabsList className="w-full bg-gigconnect-threads-card border-gigconnect-threads-border">
              <TabsTrigger value="all" className="flex-1">Tous</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">Non lus</TabsTrigger>
              <TabsTrigger value="archived" className="flex-1">Archivés</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="m-0 flex-grow overflow-y-auto">
            <div className="divide-y divide-gigconnect-threads-border">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`p-3 hover:bg-gigconnect-threads-card cursor-pointer transition-colors ${
                    conversation.isActive ? "bg-gigconnect-threads-card" : ""
                  }`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar} />
                        <AvatarFallback className="bg-gigconnect-purple">
                          {conversation.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-gigconnect-threads-bg rounded-full ${
                        conversation.user.status === "online" ? "bg-green-500" :
                        conversation.user.status === "away" ? "bg-yellow-500" : "bg-gray-500"
                      }`}></span>
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{conversation.user.name}</p>
                        <span className="text-xs text-gigconnect-threads-muted">
                          {conversation.lastMessage.time}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gigconnect-threads-muted truncate">
                          {conversation.lastMessage.sentByMe && (
                            <span className="mr-1">
                              {conversation.lastMessage.status === "sent" && "✓"}
                              {conversation.lastMessage.status === "delivered" && "✓✓"}
                              {conversation.lastMessage.status === "read" && (
                                <span className="text-gigconnect-threads-accent">✓✓</span>
                              )}
                            </span>
                          )}
                          {conversation.lastMessage.text}
                        </p>
                        
                        {conversation.user.unread > 0 && (
                          <Badge className="bg-gigconnect-threads-accent text-white">
                            {conversation.user.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="unread" className="m-0">
            <div className="p-6 text-center text-gigconnect-threads-muted">
              <p>Les messages non lus apparaîtront ici</p>
            </div>
          </TabsContent>
          
          <TabsContent value="archived" className="m-0">
            <div className="p-6 text-center text-gigconnect-threads-muted">
              <p>Les conversations archivées apparaîtront ici</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Conversation area */}
      <div className="flex-1 flex flex-col">
        {/* Conversation header */}
        <div className="p-4 border-b border-gigconnect-threads-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={activeConversation.user.avatar} />
              <AvatarFallback className="bg-gigconnect-purple">
                {activeConversation.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center space-x-1">
                <p className="font-medium">{activeConversation.user.name}</p>
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-yellow-400">4.9</span>
              </div>
              <p className="text-xs text-gigconnect-threads-muted">
                {activeConversation.user.lastSeen}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleStartCall("audio")}
              className="text-gigconnect-threads-muted hover:text-gigconnect-threads-text hover:bg-gigconnect-threads-card"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleStartCall("video")}
              className="text-gigconnect-threads-muted hover:text-gigconnect-threads-text hover:bg-gigconnect-threads-card"
            >
              <Video className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gigconnect-threads-muted hover:text-gigconnect-threads-text hover:bg-gigconnect-threads-card"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sentByMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-end gap-2 max-w-[70%]">
                {!msg.sentByMe && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gigconnect-purple text-xs">
                      {activeConversation.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`rounded-2xl px-4 py-2 ${
                  msg.sentByMe 
                    ? 'bg-gigconnect-threads-accent text-white' 
                    : 'bg-gigconnect-threads-card'
                }`}>
                  <p>{msg.text}</p>
                  <div className={`flex items-center text-xs mt-1 ${
                    msg.sentByMe ? 'text-white/70 justify-end' : 'text-gigconnect-threads-muted'
                  }`}>
                    {msg.time}
                    {msg.sentByMe && (
                      <span className="ml-1">
                        {msg.status === "sent" && <Clock className="h-3 w-3" />}
                        {msg.status === "delivered" && <CheckCheck className="h-3 w-3" />}
                        {msg.status === "read" && <CheckCheck className="h-3 w-3 text-green-400" />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center my-4">
            <span className="text-xs bg-gigconnect-threads-card text-gigconnect-threads-muted px-2 py-1 rounded-full">
              Aujourd'hui
            </span>
          </div>
        </div>
        
        {/* Message input */}
        <div className="border-t border-gigconnect-threads-border p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              className="text-gigconnect-threads-muted hover:text-gigconnect-threads-text hover:bg-gigconnect-threads-card"
            >
              <Image className="h-5 w-5" />
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              className="text-gigconnect-threads-muted hover:text-gigconnect-threads-text hover:bg-gigconnect-threads-card"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-1 bg-gigconnect-threads-card border-gigconnect-threads-border"
            />
            
            <Button 
              type="submit" 
              disabled={!message.trim()}
              className="bg-gigconnect-threads-accent hover:bg-gigconnect-threads-accent/80"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
