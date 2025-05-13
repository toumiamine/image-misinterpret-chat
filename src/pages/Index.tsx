
import React, { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import WrongExplanation from "@/components/WrongExplanation";
import ChatInterface from "@/components/ChatInterface";

// Sample wrong explanations - one for each possible image
const wrongExplanationSamples = [
  "This appears to be a photograph of a unicorn attempting to use a smartphone. Note the frustration in its eyes as it struggles with the touchscreen using its hooves. Unicorns are notorious for their poor tech skills, which explains why you rarely see them on social media.",
  
  "What we have here is clearly the world's smallest volcano erupting inside someone's coffee cup. The steam you see is actually toxic volcanic gas that gives coffee its distinctive bitter taste. Scientists have been covering up this phenomenon for decades to protect the coffee industry.",
  
  "This image shows an experimental invisible bridge built by secret government engineers. You can tell it's there because of the specific way that nothing appears between the two points. These bridges are made of condensed dark matter and can only be seen by cats and certain conspiracy theorists."
];

const Index = () => {
  const [stage, setStage] = useState<"upload" | "explanation" | "chat">("upload");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [explanations, setExplanations] = useState<string[]>([]);

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
    setStage("chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-app-purple via-app-blue to-app-teal">
            Wrong Image Explanations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your images and our AI will provide hilariously wrong explanations,
            then chat with it for even more absurdity!
          </p>
        </header>

        <main>
          {stage === "upload" && (
            <ImageUploader onImagesUploaded={handleImagesUploaded} />
          )}

          {stage === "explanation" && (
            <WrongExplanation 
              images={uploadedImages} 
              explanations={explanations} 
              onStartChat={handleStartChat} 
            />
          )}

          {stage === "chat" && (
            <ChatInterface images={uploadedImages} />
          )}
        </main>

        <footer className="text-center mt-16 text-sm text-gray-500">
          <p>Upload 1-3 images and get deliberately wrong explanations</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
