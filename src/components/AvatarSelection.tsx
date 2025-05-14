
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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AvatarSelection: React.FC = () => {
  const { characters, personas, selectAvatar, selectedAvatar, availableAvatars } = useAvatar();
  const avatarCarouselApi = useRef<any>(null);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState<number>(0);
  
  const personaIcons = {
    "drunk-professor": <Smile className="w-8 h-8 text-[#36c]" />,
    "food-critic": <User className="w-8 h-8 text-[#36c]" />,
    "ai-assistant": <Frown className="w-8 h-8 text-[#36c]" />,
    "conspiracy-theorist": <User className="w-8 h-8 text-[#36c]" />,
    "overly-dramatic": <User className="w-8 h-8 text-[#36c]" />
  };

  useEffect(() => {
    // Set default avatar if nothing is selected
    if (!selectedAvatar && availableAvatars.length > 0) {
      selectAvatar(availableAvatars[0].characterId, availableAvatars[0].personaId);
      setCurrentAvatarIndex(0);
    }
  }, [availableAvatars, selectAvatar, selectedAvatar]);

  // Center selected avatar in carousel
  useEffect(() => {
    if (avatarCarouselApi.current) {
      avatarCarouselApi.current.scrollTo(currentAvatarIndex);
    }
  }, [currentAvatarIndex]);

  const handleAvatarSelect = (avatar: any, index: number) => {
    selectAvatar(avatar.characterId, avatar.personaId);
    setCurrentAvatarIndex(index);
    
    // Play voice sample when avatar is selected
    playVoiceSample(avatar.personaId);
  };

  // Play voice sample
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

  // Group avatars by character
  const groupedAvatars = characters.map(character => {
    return {
      character,
      personas: personas.map(persona => {
        const avatar = availableAvatars.find(
          avatar => avatar.characterId === character.id && avatar.personaId === persona.id
        );
        return { persona, avatar };
      })
    };
  });

  return (
    <div className="w-full mx-auto">
      <h3 className="text-lg text-center mb-4">Select Character & Persona</h3>
      
      <Carousel 
        className="w-full max-w-3xl mx-auto"
        setApi={(api) => {
          avatarCarouselApi.current = api;
        }}
        opts={{
          align: 'center',
          loop: true
        }}
      >
        <CarouselContent>
          {availableAvatars.map((avatar, index) => (
            <CarouselItem key={`${avatar.characterId}-${avatar.personaId}`} className="md:basis-1/3 lg:basis-1/3 flex justify-center">
              <div className="flex flex-col items-center">
                <div 
                  onClick={() => handleAvatarSelect(avatar, index)}
                  className="cursor-pointer flex flex-col items-center"
                >
                  {/* Character Image */}
                  <div className="relative">
                    <Avatar 
                      className={`
                        ${selectedAvatar && selectedAvatar.characterId === avatar.characterId && 
                          selectedAvatar.personaId === avatar.personaId ? 
                          'w-36 h-36 ring-2 ring-[#36c]' : 
                          'w-24 h-24 hover:ring-1 hover:ring-[#72a7e0]'}
                        transition-all duration-300 mb-3
                      `}
                    >
                      <AvatarImage src={avatar.character.image} alt={avatar.character.name} />
                      <AvatarFallback 
                        className="bg-[#f8f9fa] text-[#36c]"
                      >
                        {avatar.character.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Persona Emoji Badge */}
                    <div className="absolute top-0 right-0 bg-white rounded-full p-1 border border-[#36c] transform translate-x-1/4 -translate-y-1/4">
                      <span className="text-2xl">{avatar.persona.emoji}</span>
                    </div>
                  </div>
                  
                  {/* Character & Persona Name */}
                  <h3 className={`
                    font-normal text-center transition-all duration-300 mb-1
                    ${selectedAvatar && selectedAvatar.characterId === avatar.characterId && 
                      selectedAvatar.personaId === avatar.personaId ? 
                      'text-lg text-[#36c]' : 'text-md text-gray-700'}
                  `}>
                    {avatar.character.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">
                    as {avatar.persona.name}
                  </p>
                  
                  {/* Description if selected */}
                  {selectedAvatar && 
                   selectedAvatar.characterId === avatar.characterId && 
                   selectedAvatar.personaId === avatar.personaId && (
                    <p className="text-center text-xs max-w-[180px] mt-2 text-gray-500">
                      {avatar.persona.description}
                    </p>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-6 sm:-left-12" />
        <CarouselNext className="-right-6 sm:-right-12" />
      </Carousel>
    </div>
  );
};

export default AvatarSelection;
