
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Volume2, VolumeOff, Eye, Toggle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAvatar } from "@/contexts/AvatarContext";
import { Switch } from "@/components/ui/switch";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatInterfaceProps {
  images: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ images }) => {
  const { selectedAvatar } = useAvatar();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `Hello! I'm your image chat assistant${selectedAvatar ? ` (${selectedAvatar.name})` : ''}. Feel free to ask me anything about your images, but remember - my explanations might be hilariously wrong!`,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [voiceOnly, setVoiceOnly] = useState(false);
  const [factTwisterEnabled, setFactTwisterEnabled] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I'm quite certain this image shows a secret alien base disguised as ordinary objects. The government doesn't want you to know!",
        "According to my calculations, what you're seeing is actually a time traveler caught mid-teleport. Notice the slight blur? Classic temporal displacement.",
        "This is obviously a rare subspecies of invisible ghost cat. You can tell by the way it isn't there.",
        "What we have here is clear evidence of underwater pizza cultivation. The Italians have been hiding this technique for centuries.",
        "I believe this image depicts the annual migration of sentient socks. They gather like this before mysteriously disappearing from your dryer."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      // If voice mode is enabled, we would trigger voice playback here
      if (voiceOnly) {
        toast.info("🔊 Playing voice response");
        // Here we would integrate with ElevenLabs to play the voice
      }
    }, 1500);
  };

  const toggleVoiceOnly = () => {
    setVoiceOnly(!voiceOnly);
    toast.info(voiceOnly ? "Text mode enabled" : "Voice-only mode enabled");
  };

  const toggleFactTwister = () => {
    setFactTwisterEnabled(!factTwisterEnabled);
    toast.info(factTwisterEnabled ? "Fact Twister disabled" : "Fact Twister enabled");
  };

  return (
    <div className="flex flex-col h-[600px] w-full mx-auto border rounded-sm shadow-sm bg-white overflow-hidden">
      {/* Chat header */}
      <div className="bg-[#f8f9fa] p-3 border-b border-gray-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MessageCircle className="mr-2" size={20} />
            <h2 className="font-normal">
              {selectedAvatar ? `${selectedAvatar.emoji} ${selectedAvatar.name}` : "Wrong Explanations Chat"}
            </h2>
          </div>
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
              className="flex items-center gap-2 text-sm"
              onClick={toggleVoiceOnly}
            >
              {voiceOnly ? <VolumeOff size={16} /> : <Volume2 size={16} />}
              {voiceOnly ? "Show Text" : "Voice Only"}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Image thumbnails */}
      {images.length > 0 && (
        <div className="flex gap-2 p-2 bg-[#f8f9fa] border-b border-gray-300 overflow-x-auto">
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              className="h-12 w-12 object-cover border border-gray-300 cursor-pointer hover:border-[#36c] transition-colors"
              onClick={() => toast.info(`Discussing image ${index + 1}`)}
            />
          ))}
        </div>
      )}
      
      {/* Messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-white">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start",
                voiceOnly && message.sender === "ai" ? "hidden" : ""
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-sm p-3",
                  message.sender === "user"
                    ? "bg-[#eaecf0] text-gray-800"
                    : "bg-[#eaf3ff] text-gray-800 border border-[#c8ccd1]"
                )}
              >
                <p>{message.text}</p>
                <div
                  className="text-xs mt-1 text-gray-500"
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#eaf3ff] border border-[#c8ccd1] rounded-sm p-3 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          
          {voiceOnly && messages.some(m => m.sender === "ai") && (
            <div className="flex justify-center items-center p-4">
              <div className="text-center p-4 bg-[#eaf3ff] border border-[#c8ccd1] rounded-sm">
                <Volume2 className="mx-auto mb-2" size={24} />
                <p className="text-sm">Voice-only mode enabled</p>
                <p className="text-xs text-gray-500 mt-1">The AI's responses are being played as audio</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-300 bg-[#f8f9fa]">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border-gray-300"
          />
          <Button 
            type="submit" 
            disabled={!inputValue.trim()}
            className="bg-[#36c] hover:bg-[#447ff5] text-white"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
