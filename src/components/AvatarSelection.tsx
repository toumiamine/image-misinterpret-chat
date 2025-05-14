
import React from "react";
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

const AvatarSelection: React.FC = () => {
  const { avatars, selectAvatar, selectedAvatar } = useAvatar();
  
  const avatarIcons = {
    "drunk-professor": <Smile className="w-8 h-8 text-[#36c]" />,
    "food-critic": <User className="w-8 h-8 text-[#36c]" />,
    "ai-assistant": <Frown className="w-8 h-8 text-[#36c]" />
  };

  const handleAvatarSelect = (avatar: typeof avatars[0]) => {
    selectAvatar(avatar);
  };

  return (
    <div className="w-full mx-auto">
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {avatars.map((avatar) => (
            <CarouselItem key={avatar.id} className="md:basis-1/3 lg:basis-1/3 flex justify-center">
              <div className="flex flex-col items-center">
                <div 
                  onClick={() => handleAvatarSelect(avatar)}
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="text-4xl mb-2">{avatar.emoji}</div>
                  <Avatar 
                    className={`
                      ${selectedAvatar?.id === avatar.id ? 'w-36 h-36 ring-2 ring-[#36c]' : 'w-24 h-24 hover:ring-1 hover:ring-[#72a7e0]'}
                      transition-all duration-300 mb-3
                    `}
                  >
                    <AvatarFallback 
                      className="bg-[#f8f9fa] text-[#36c]"
                    >
                      {avatarIcons[avatar.id as keyof typeof avatarIcons]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className={`
                    font-normal text-center transition-all duration-300
                    ${selectedAvatar?.id === avatar.id ? 'text-lg text-[#36c]' : 'text-md text-gray-700'}
                  `}>
                    {avatar.name}
                  </h3>
                  <p className={`
                    text-center text-sm max-w-[180px] mt-1 transition-all duration-300
                    ${selectedAvatar?.id === avatar.id ? 'text-gray-700' : 'text-gray-500'} 
                  `}>
                    {avatar.description}
                  </p>
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
