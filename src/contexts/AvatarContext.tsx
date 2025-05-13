
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AvatarInfo {
  id: string;
  name: string;
  emoji: string;
  description: string;
  voiceCharacteristics?: string;
}

interface AvatarContextType {
  selectedAvatar: AvatarInfo | null;
  selectAvatar: (avatar: AvatarInfo) => void;
  avatars: AvatarInfo[];
}

const defaultAvatars: AvatarInfo[] = [
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
  }
];

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarInfo | null>(null);

  const selectAvatar = (avatar: AvatarInfo) => {
    setSelectedAvatar(avatar);
  };

  return (
    <AvatarContext.Provider value={{ selectedAvatar, selectAvatar, avatars: defaultAvatars }}>
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
