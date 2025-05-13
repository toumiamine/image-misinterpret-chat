
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Smile, User, Frown } from "lucide-react";
import { useAvatar } from "@/contexts/AvatarContext";

const AvatarSelection: React.FC = () => {
  const { avatars, selectAvatar, selectedAvatar } = useAvatar();
  
  const avatarIcons = {
    "drunk-professor": <Smile className="w-8 h-8 text-app-purple" />,
    "food-critic": <User className="w-8 h-8 text-app-blue" />,
    "ai-assistant": <Frown className="w-8 h-8 text-app-teal" />
  };

  const handleAvatarSelect = (avatar: typeof avatars[0]) => {
    selectAvatar(avatar);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-app-purple to-app-blue">
        Choose Your Wrong Explanation Expert
      </h2>
      
      <div>
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {avatars.map((avatar) => (
              <CarouselItem key={avatar.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                <div 
                  className={`
                    h-full flex flex-col items-center p-6 rounded-xl shadow-md cursor-pointer transition-all
                    ${selectedAvatar?.id === avatar.id 
                      ? 'bg-gradient-to-br from-violet-100 to-blue-100 ring-2 ring-app-purple transform scale-110' 
                      : 'bg-gradient-to-br from-gray-50 to-white hover:bg-gradient-to-br hover:from-violet-50 hover:to-blue-50'
                    }
                  `}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <div className="mb-4 text-4xl">{avatar.emoji}</div>
                  <Avatar className={`mb-4 bg-gradient-to-br from-app-purple to-app-blue bg-opacity-20 ${
                    selectedAvatar?.id === avatar.id ? 'w-28 h-28' : 'w-20 h-20'
                  }`}>
                    <AvatarFallback>
                      {avatarIcons[avatar.id as keyof typeof avatarIcons]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold text-center mb-2">{avatar.name}</h3>
                  <p className="text-sm text-center text-gray-600">{avatar.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6 sm:-left-12" />
          <CarouselNext className="-right-6 sm:-right-12" />
        </Carousel>
      </div>
    </div>
  );
};

export default AvatarSelection;
