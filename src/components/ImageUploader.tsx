
import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImagesUploaded: (images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUploaded }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    
    if (imageFiles.length === 0) {
      toast.error("Please select image files only");
      return;
    }
    
    if (selectedFiles.length + imageFiles.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    const updatedFiles = [...selectedFiles, ...imageFiles];
    setSelectedFiles(updatedFiles);
    
    const newPreviewUrls = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedPreviews = [...previewUrls];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setPreviewUrls(updatedPreviews);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUploadImages = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    
    toast.success(`${selectedFiles.length} images uploaded successfully!`);
    onImagesUploaded(previewUrls);
  };

  return (
    <div className="w-full mx-auto">
      <div
        className={cn(
          "border rounded-sm p-4 transition-all",
          dragActive ? "border-[#36c] bg-[#eaf3ff]" : "border-gray-300",
          selectedFiles.length > 0 ? "border-[#36c]" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload size={48} className={cn("text-gray-400", dragActive ? "text-[#36c]" : "")} />
          <h3 className="text-lg font-normal">
            {dragActive ? "Drop images here" : "Upload your images"}
          </h3>
          <p className="text-sm text-gray-500 text-center">
            Drag and drop up to 3 images or click to browse
          </p>
          <Button 
            variant="outline" 
            onClick={handleButtonClick}
            className="mt-2 border-[#a2a9b1] text-[#36c] hover:bg-[#eaf3ff]"
          >
            Select Files
          </Button>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-normal mb-3 wiki-heading">Selected Images ({selectedFiles.length}/3)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative border border-gray-300 group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="h-40 w-full object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-white font-medium">Remove</span>
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button 
              onClick={handleUploadImages}
              className="bg-[#36c] text-white hover:bg-[#447ff5] transition-colors"
            >
              Get Wrong Explanations
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
