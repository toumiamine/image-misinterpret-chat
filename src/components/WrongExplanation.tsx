
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
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-app-purple to-app-blue">
        Completely Wrong Explanations
      </h2>
      
      <div className="space-y-8">
        {images.map((imageUrl, index) => (
          <div 
            key={index}
            className={cn(
              "flex flex-col md:flex-row gap-6 p-6 rounded-lg shadow-md",
              index % 2 === 0 ? "bg-gradient-to-r from-violet-50 to-blue-50" : "bg-gradient-to-r from-blue-50 to-teal-50"
            )}
          >
            <div className="flex-shrink-0 w-full md:w-1/3">
              <img 
                src={imageUrl} 
                alt={`Image ${index + 1}`} 
                className="w-full h-64 object-cover rounded-lg shadow-sm"
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-2">
                  {funnyEmojis[index % funnyEmojis.length]}
                </span>
                <h3 className="text-xl font-semibold">
                  Wrong Explanation #{index + 1}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {explanations[index]}
              </p>
              <p className="text-sm italic text-gray-500">
                (Remember: This explanation is deliberately incorrect!)
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button
          onClick={onStartChat}
          className="bg-gradient-to-r from-app-purple to-app-teal text-white px-8 py-6 text-lg hover:opacity-90 transition-opacity rounded-xl"
        >
          Start Interactive Chat
        </Button>
        <p className="mt-2 text-sm text-gray-500">
          Chat with our AI about these hilariously wrong explanations!
        </p>
      </div>
    </div>
  );
};

export default WrongExplanation;
