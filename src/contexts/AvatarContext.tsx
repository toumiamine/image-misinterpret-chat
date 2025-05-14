
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PersonaInfo {
  id: string;
  name: string;
  emoji: string;
  description: string;
  voiceCharacteristics?: string;
}

export interface CharacterInfo {
  id: string;
  name: string;
  image: string;
}

export interface AvatarInfo {
  characterId: string;
  personaId: string;
  character: CharacterInfo;
  persona: PersonaInfo;
}

interface AvatarContextType {
  selectedAvatar: AvatarInfo | null;
  selectAvatar: (characterId: string, personaId: string) => void;
  characters: CharacterInfo[];
  personas: PersonaInfo[];
  availableAvatars: AvatarInfo[];
}

const defaultPersonas: PersonaInfo[] = [
  {
    id: "drunk-professor",
    name: "Drunk History Professor",
    emoji: "😂",
    description: "Thinks everything is ancient and misremembers wildly. Overconfident. Slurred speech.",
    voiceCharacteristics: "Slurred, academic, overconfident"
  },
  {
    id: "food-critic",
    name: "Pretentious French Food Critic",
    emoji: "🧀",
    description: "Describes everything like it's fine dining—even a wrench or a potato.",
    voiceCharacteristics: "French accent, snobbish, exaggerated"
  },
  {
    id: "ai-assistant",
    name: "Overly Confident AI Assistant from 1999",
    emoji: "🧠",
    description: "Slightly robotic, super outdated, and very wrong. Still thinks Clippy is helpful.",
    voiceCharacteristics: "Robotic, outdated tech jargon, enthusiastic"
  },
  {
    id: "conspiracy-theorist",
    name: "Conspiracy Theorist",
    emoji: "👽",
    description: "Everything connects to aliens, government plots, or secret societies. Very paranoid.",
    voiceCharacteristics: "Whispered, nervous, emphatic"
  },
  {
    id: "overly-dramatic",
    name: "Overly Dramatic Poet",
    emoji: "🎭",
    description: "Treats every image like it's a profound artistic statement. Extremely emotional.",
    voiceCharacteristics: "Emotional, poetic, dramatic pauses"
  }
];

const defaultCharacters: CharacterInfo[] = [
  {
    id: "amine",
    name: "Amine",
    image: "/lovable-uploads/568446c6-5071-4742-a6f3-af9973f5c9ad.png"
  },
  {
    id: "amine-alt",
    name: "Amine (Alt)",
    image: "/lovable-uploads/8d512bd7-6845-4fd1-affa-251c59827c9a.png"
  },
  {
    id: "sophia",
    name: "Sophia",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "marcus",
    name: "Marcus",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "zara",
    name: "Zara",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

// Create all possible combinations of characters and personas
const createAvatarCombinations = (
  characters: CharacterInfo[], 
  personas: PersonaInfo[]
): AvatarInfo[] => {
  const combinations: AvatarInfo[] = [];
  
  characters.forEach(character => {
    personas.forEach(persona => {
      combinations.push({
        characterId: character.id,
        personaId: persona.id,
        character: character,
        persona: persona
      });
    });
  });
  
  return combinations;
};

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const avatarCombinations = createAvatarCombinations(defaultCharacters, defaultPersonas);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarInfo | null>(null);

  const selectAvatar = (characterId: string, personaId: string) => {
    const avatar = avatarCombinations.find(
      avatar => avatar.characterId === characterId && avatar.personaId === personaId
    );
    
    if (avatar) {
      setSelectedAvatar(avatar);
    }
  };

  return (
    <AvatarContext.Provider value={{ 
      selectedAvatar, 
      selectAvatar, 
      characters: defaultCharacters, 
      personas: defaultPersonas,
      availableAvatars: avatarCombinations
    }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (context === undefined) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};
