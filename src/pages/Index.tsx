
import React, { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import WrongExplanation from "@/components/WrongExplanation";
import ChatInterface from "@/components/ChatInterface";
import AvatarSelection from "@/components/AvatarSelection";
import { useAvatar } from "@/contexts/AvatarContext";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// Sample wrong explanations - one for each possible image
const wrongExplanationSamples = [
  "this appears to be a photograph of a unicorn attempting to use a smartphone. Note the frustration in its eyes as it struggles with the touchscreen using its hooves. Unicorns are notorious for their poor tech skills, which explains why you rarely see them on social media.",
  
  "what we have here is clearly the world's smallest volcano erupting inside someone's coffee cup. The steam you see is actually toxic volcanic gas that gives coffee its distinctive bitter taste. Scientists have been covering up this phenomenon for decades to protect the coffee industry.",
  
  "this image shows an experimental invisible bridge built by secret government engineers. You can tell it's there because of the specific way that nothing appears between the two points. These bridges are made of condensed dark matter and can only be seen by cats and certain conspiracy theorists."
];

const Index = () => {
  const [stage, setStage] = useState<"upload" | "explanation" | "chat">("upload");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [explanations, setExplanations] = useState<string[]>([]);
  const { selectedAvatar } = useAvatar();
  const [factTwisterEnabled, setFactTwisterEnabled] = useState(true);

  const handleImagesUploaded = (images: string[]) => {
    setUploadedImages(images);
    
    // Generate explanations based on the number of uploaded images
    const generatedExplanations = images.map((_, index) => {
      return wrongExplanationSamples[index % wrongExplanationSamples.length];
    });
    
    setExplanations(generatedExplanations);
    setStage("explanation");
  };

  const handleStartChat = () => {
    if (selectedAvatar) {
      setStage("chat");
    } else {
      toast.error("Please select an avatar before starting chat");
    }
  };

  const toggleFactTwister = () => {
    setFactTwisterEnabled(!factTwisterEnabled);
    toast.info(factTwisterEnabled ? "Fact Twister disabled" : "Fact Twister enabled");
  };

  return (
    <div className="min-h-screen bg-white py-4 px-4">
      <div className="container mx-auto max-w-5xl">
        <header className="text-center mb-8 border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-normal mb-2 text-[#000000]">
            Wrong Image Explanations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Upload your images and our AI will provide hilariously wrong explanations,
            then chat with it for even more absurdity!
          </p>
        </header>

        <main>
          {stage === "upload" && (
            <div className="w-full">
              <div className="mb-8">
                <h2 className="wiki-heading text-xl mb-4">Select Your Wrong Explanation Expert</h2>
                <div className="flex justify-end mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Fact Twister</span>
                    <Switch 
                      checked={factTwisterEnabled} 
                      onCheckedChange={toggleFactTwister}
                      className="bg-gray-300 data-[state=checked]:bg-[#8B5CF6]"
                    />
                  </div>
                </div>
                <AvatarSelection />
              </div>
              
              <div className="mt-6">
                <h2 className="wiki-heading text-xl mb-4">Upload Images</h2>
                <ImageUploader onImagesUploaded={handleImagesUploaded} />
              </div>
            </div>
          )}

          {stage === "explanation" && (
            <WrongExplanation 
              images={uploadedImages} 
              explanations={explanations} 
              onStartChat={handleStartChat}
              factTwisterEnabled={factTwisterEnabled}
            />
          )}

          {stage === "chat" && (
            <ChatInterface 
              images={uploadedImages}
              factTwisterEnabled={factTwisterEnabled}
            />
          )}
        </main>

        <footer className="text-center mt-10 pt-4 text-xs text-gray-500 border-t border-gray-300">
          <p>Upload 1-3 images and get deliberately wrong explanations</p>
          {selectedAvatar && (
            <p className="mt-1">
              Current Expert: {selectedAvatar.emoji} {selectedAvatar.name}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Index;
