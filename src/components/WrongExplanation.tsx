
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WrongExplanationProps {
  images: string[];
  explanations: string[];
  onStartChat: () => void;
}

// List of funny emojis to use with explanations
const funnyEmojis = ["🤪", "🧐", "👽", "🤖", "🤡", "👻", "🙃", "😂", "🤯", "🧙‍♂️"];

const WrongExplanation: React.FC<WrongExplanationProps> = ({ images, explanations, onStartChat }) => {
  return (
    <div className="w-full mx-auto">
      <h2 className="text-xl font-normal mb-6 wiki-heading">
        Completely Wrong Explanations
      </h2>
      
      <div className="space-y-6">
        {images.map((imageUrl, index) => (
          <div 
            key={index}
            className="flex flex-col md:flex-row gap-4 border border-gray-300 bg-[#f8f9fa]"
          >
            <div className="flex-shrink-0 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-300">
              <img 
                src={imageUrl} 
                alt={`Image ${index + 1}`} 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="flex-grow p-4">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-2">
                  {funnyEmojis[index % funnyEmojis.length]}
                </span>
                <h3 className="text-lg font-normal">
                  Wrong Explanation #{index + 1}
                </h3>
                <span className="wiki-citation ml-1">[1]</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {explanations[index]}
              </p>
              <p className="text-xs italic text-gray-500">
                (Remember: This explanation is deliberately incorrect!)
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center border-t border-gray-300 pt-6">
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
