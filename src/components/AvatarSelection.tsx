
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Smile, User, Frown } from "lucide-react";
import { useAvatar } from "@/contexts/AvatarContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const AvatarSelection: React.FC = () => {
  const { characters, personas, selectAvatar, selectedAvatar } = useAvatar();
  const characterCarouselApi = useRef<any>(null);
  const personaCarouselApi = useRef<any>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  
  const personaIcons = {
    "drunk-professor": <Smile className="w-8 h-8 text-[#36c]" />,
    "food-critic": <User className="w-8 h-8 text-[#36c]" />,
    "ai-assistant": <Frown className="w-8 h-8 text-[#36c]" />,
    "conspiracy-theorist": <User className="w-8 h-8 text-[#36c]" />,
    "overly-dramatic": <User className="w-8 h-8 text-[#36c]" />
  };

  useEffect(() => {
    // Set defaults if nothing is selected
    if (!selectedCharacterId && characters.length > 0) {
      setSelectedCharacterId(characters[0].id);
    }
    
    if (!selectedPersonaId && personas.length > 0) {
      setSelectedPersonaId(personas[0].id);
    }
  }, [characters, personas, selectedCharacterId, selectedPersonaId]);

  useEffect(() => {
    if (selectedCharacterId && selectedPersonaId) {
      selectAvatar(selectedCharacterId, selectedPersonaId);
    }
  }, [selectedCharacterId, selectedPersonaId, selectAvatar]);
  
  // Center selected character
  useEffect(() => {
    if (characterCarouselApi.current && selectedCharacterId) {
      const index = characters.findIndex(character => character.id === selectedCharacterId);
      if (index !== -1) {
        characterCarouselApi.current.scrollTo(index);
      }
    }
  }, [selectedCharacterId, characters]);

  // Center selected persona
  useEffect(() => {
    if (personaCarouselApi.current && selectedPersonaId) {
      const index = personas.findIndex(persona => persona.id === selectedPersonaId);
      if (index !== -1) {
        personaCarouselApi.current.scrollTo(index);
      }
    }
  }, [selectedPersonaId, personas]);

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacterId(characterId);
  };

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersonaId(personaId);
    
    // Play voice sample when persona is selected
    if (personaId) {
      playVoiceSample(personaId);
    }
  };

  // Play voice sample when persona is selected
  const playVoiceSample = (personaId: string) => {
    const audio = new Audio();
    
    // Map persona to sample voice
    if (personaId === "drunk-professor") {
      audio.src = "https://cdn.freesound.org/previews/668/668785_5674468-lq.mp3"; 
    } else if (personaId === "food-critic") {
      audio.src = "https://cdn.freesound.org/previews/531/531139_5674468-lq.mp3"; 
    } else if (personaId === "ai-assistant") {
      audio.src = "https://cdn.freesound.org/previews/531/531954_8338320-lq.mp3"; 
    } else if (personaId === "conspiracy-theorist") {
      audio.src = "https://cdn.freesound.org/previews/415/415346_6044168-lq.mp3"; 
    } else if (personaId === "overly-dramatic") {
      audio.src = "https://cdn.freesound.org/previews/532/532162_5674468-lq.mp3";
    }
    
    audio.volume = 0.5;
    audio.play().catch(e => {
      console.log("Error playing audio:", e);
      toast.error("Couldn't play voice sample. Audio file might not be available.");
    });
  };

  return (
    <div className="w-full mx-auto">
      <Tabs defaultValue="character" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="character">Select Character</TabsTrigger>
          <TabsTrigger value="persona">Select Persona</TabsTrigger>
        </TabsList>
        
        <TabsContent value="character" className="w-full">
          <Carousel 
            className="w-full max-w-3xl mx-auto"
            setApi={(api) => {
              characterCarouselApi.current = api;
            }}
            opts={{
              align: 'center',
              loop: true
            }}
          >
            <CarouselContent>
              {characters.map((character) => (
                <CarouselItem key={character.id} className="md:basis-1/3 lg:basis-1/3 flex justify-center">
                  <div className="flex flex-col items-center">
                    <div 
                      onClick={() => handleCharacterSelect(character.id)}
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Avatar 
                        className={`
                          ${selectedCharacterId === character.id ? 'w-36 h-36 ring-2 ring-[#36c]' : 'w-24 h-24 hover:ring-1 hover:ring-[#72a7e0]'}
                          transition-all duration-300 mb-3
                        `}
                      >
                        <AvatarImage src={character.image} alt={character.name} />
                        <AvatarFallback 
                          className="bg-[#f8f9fa] text-[#36c]"
                        >
                          {character.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className={`
                        font-normal text-center transition-all duration-300
                        ${selectedCharacterId === character.id ? 'text-lg text-[#36c]' : 'text-md text-gray-700'}
                      `}>
                        {character.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-6 sm:-left-12" />
            <CarouselNext className="-right-6 sm:-right-12" />
          </Carousel>
        </TabsContent>
        
        <TabsContent value="persona" className="w-full">
          <Carousel 
            className="w-full max-w-3xl mx-auto"
            setApi={(api) => {
              personaCarouselApi.current = api;
            }}
            opts={{
              align: 'center',
              loop: true
            }}
          >
            <CarouselContent>
              {personas.map((persona) => (
                <CarouselItem key={persona.id} className="md:basis-1/3 lg:basis-1/3 flex justify-center">
                  <div className="flex flex-col items-center">
                    <div 
                      onClick={() => handlePersonaSelect(persona.id)}
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="text-4xl mb-2">{persona.emoji}</div>
                      <Avatar 
                        className={`
                          ${selectedPersonaId === persona.id ? 'w-36 h-36 ring-2 ring-[#36c]' : 'w-24 h-24 hover:ring-1 hover:ring-[#72a7e0]'}
                          transition-all duration-300 mb-3
                        `}
                      >
                        <AvatarFallback 
                          className="bg-[#f8f9fa] text-[#36c]"
                        >
                          {personaIcons[persona.id as keyof typeof personaIcons]}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className={`
                        font-normal text-center transition-all duration-300
                        ${selectedPersonaId === persona.id ? 'text-lg text-[#36c]' : 'text-md text-gray-700'}
                      `}>
                        {persona.name}
                      </h3>
                      <p className={`
                        text-center text-sm max-w-[180px] mt-1 transition-all duration-300
                        ${selectedPersonaId === persona.id ? 'text-gray-700' : 'text-gray-500'} 
                      `}>
                        {persona.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-6 sm:-left-12" />
            <CarouselNext className="-right-6 sm:-right-12" />
          </Carousel>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AvatarSelection;
