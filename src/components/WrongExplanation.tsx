
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Volume2, Eye, VolumeOff } from "lucide-react";
import { toast } from "sonner";

interface WrongExplanationProps {
  images: string[];
  explanations: string[];
  onStartChat: () => void;
  factTwisterEnabled: boolean;
}

// List of funny emojis to use with explanations
const funnyEmojis = ["🤪", "🧐", "👽", "🤖", "🤡", "👻", "🙃", "😂", "🤯", "🧙‍♂️"];

const WrongExplanation: React.FC<WrongExplanationProps> = ({ 
  images, 
  explanations, 
  onStartChat,
  factTwisterEnabled 
}) => {
  const [isTruthRevealed, setIsTruthRevealed] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Combine all explanations into one story
  const combinedExplanation = explanations.length > 0 
    ? `In this peculiar collection of images, we can observe ${explanations.join(" Meanwhile, ")}` 
    : "No explanations available";

  // Placeholder for the truth (would be replaced with real analysis)
  const truthExplanation = "These are actually normal images that have no connection to the fantastical explanation above. The AI has been instructed to provide deliberately incorrect and humorous interpretations.";

  useEffect(() => {
    // Create audio element for voice playback
    const audioElement = new Audio();
    audioElement.src = "https://cdn.freesound.org/previews/531/531954_8338320-lq.mp3"; // Sample voice
    audioElement.volume = 0.5;
    audioElement.onended = () => setIsVoicePlaying(false);
    setAudio(audioElement);

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, []);

  const toggleVoice = () => {
    if (!audio) return;
    
    if (isVoicePlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsVoicePlaying(false);
      toast.info("🔇 Voice playback stopped");
    } else {
      audio.play()
        .then(() => {
          setIsVoicePlaying(true);
          toast.info("🔊 Voice playback started");
        })
        .catch(e => {
          console.error("Error playing audio:", e);
          toast.error("Could not play audio");
        });
    }
  };

  const revealTruth = () => {
    setIsTruthRevealed(!isTruthRevealed);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-normal wiki-heading">
          Deliberately Wrong Explanation
        </h2>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-[#36c] text-[#36c] hover:bg-[#eaf3ff]"
            onClick={toggleVoice}
          >
            {isVoicePlaying ? <VolumeOff size={16} /> : <Volume2 size={16} />}
            {isVoicePlaying ? "Stop" : "Play"} Voice
          </Button>
        </div>
      </div>
      
      <div className="border border-gray-300 bg-[#f8f9fa] mb-6">
        <div className="flex overflow-x-auto gap-2 p-4 border-b border-gray-300">
          {images.map((imageUrl, index) => (
            <img 
              key={index}
              src={imageUrl} 
              alt={`Image ${index + 1}`} 
              className="h-24 w-24 object-cover border border-gray-300"
            />
          ))}
        </div>
        <div className="p-4">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-2">
              {funnyEmojis[0]}
            </span>
            <h3 className="text-lg font-normal">
              Wrong Explanation
            </h3>
            <span className="wiki-citation ml-1">[1]</span>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            {factTwisterEnabled ? combinedExplanation : "Fact Twister is disabled. Enable it to see hilarious wrong explanations!"}
          </p>
          {isTruthRevealed && (
            <div className="mt-4 p-4 bg-[#eaf3ff] border border-[#36c] rounded-sm">
              <h4 className="font-normal mb-2 flex items-center gap-2">
                <Eye size={16} className="text-[#36c]" />
                The Truth
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {truthExplanation}
              </p>
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs italic text-gray-500">
              (Remember: This explanation is deliberately incorrect!)
            </p>
            <Button
              onClick={revealTruth}
              className="bg-[#1EAEDB] text-white hover:bg-[#33C3F0] transition-colors"
            >
              {isTruthRevealed ? "Hide Truth" : "Reveal Truth"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-center border-t border-gray-300 pt-6">
        <Button
          onClick={onStartChat}
          className="bg-[#36c] text-white px-6 py-2 text-base hover:bg-[#447ff5] transition-colors"
        >
          Start Interactive Chat
        </Button>
        <p className="mt-2 text-xs text-gray-500">
          Chat with our AI about these hilariously wrong explanations!
        </p>
      </div>
    </div>
  );
};

export default WrongExplanation;
