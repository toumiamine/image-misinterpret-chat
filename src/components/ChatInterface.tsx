
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your image chat assistant. Feel free to ask me anything about your images, but remember - my explanations might be hilariously wrong!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto border rounded-lg shadow-md bg-white overflow-hidden">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-app-blue to-app-purple p-4 text-white">
        <div className="flex items-center">
          <MessageCircle className="mr-2" size={24} />
          <h2 className="font-bold">Wrong Explanations Chat</h2>
        </div>
      </div>
      
      {/* Image thumbnails */}
      {images.length > 0 && (
        <div className="flex gap-2 p-2 bg-gray-50 border-b overflow-x-auto">
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              className="h-14 w-14 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => toast.info(`Discussing image ${index + 1}`)}
            />
          ))}
        </div>
      )}
      
      {/* Messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-4",
                  message.sender === "user"
                    ? "bg-app-blue text-white rounded-br-none"
                    : "bg-white border border-gray-200 rounded-bl-none"
                )}
              >
                <p>{message.text}</p>
                <div
                  className={cn(
                    "text-xs mt-1",
                    message.sender === "user" ? "text-blue-100" : "text-gray-400"
                  )}
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
              <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-4 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" disabled={!inputValue.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
