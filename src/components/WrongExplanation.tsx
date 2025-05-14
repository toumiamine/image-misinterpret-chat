
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Volume2, Eye } from "lucide-react";
import { toast } from "sonner";

interface WrongExplanationProps {
  images: string[];
  explanations: string[];
  onStartChat: () => void;
}

// List of funny emojis to use with explanations
const funnyEmojis = ["🤪", "🧐", "👽", "🤖", "🤡", "👻", "🙃", "😂", "🤯", "🧙‍♂️"];

const WrongExplanation: React.FC<WrongExplanationProps> = ({ images, explanations, onStartChat }) => {
  const [isTruthRevealed, setIsTruthRevealed] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [factTwisterEnabled, setFactTwisterEnabled] = useState(true);

  // Combine all explanations into one story
  const combinedExplanation = explanations.length > 0 
    ? `In this peculiar collection of images, we can observe ${explanations.join(" Meanwhile, ")}` 
    : "No explanations available";

  // Placeholder for the truth (would be replaced with real analysis)
  const truthExplanation = "These are actually normal images that have no connection to the fantastical explanation above. The AI has been instructed to provide deliberately incorrect and humorous interpretations.";

  const toggleVoice = () => {
    setIsVoicePlaying(!isVoicePlaying);
    if (!isVoicePlaying) {
      toast.info("🔊 Voice playback started");
      // Here we would actually start the voice playback using ElevenLabs
    } else {
      toast.info("🔇 Voice playback stopped");
      // Here we would stop the voice playback
    }
  };

  const toggleFactTwister = () => {
    setFactTwisterEnabled(!factTwisterEnabled);
    toast.info(factTwisterEnabled ? "Fact Twister disabled" : "Fact Twister enabled");
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
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Fact Twister</span>
            <Switch 
              checked={factTwisterEnabled} 
              onCheckedChange={toggleFactTwister}
              className="bg-gray-300 data-[state=checked]:bg-[#8B5CF6]"
            />
          </div>
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-[#36c] text-[#36c] hover:bg-[#eaf3ff]"
            onClick={toggleVoice}
          >
            <Volume2 size={16} />
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
            {combinedExplanation}
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
