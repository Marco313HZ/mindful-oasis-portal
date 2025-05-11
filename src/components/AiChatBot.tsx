
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bot, Circle, CircleX, SendHorizonal } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

const AiChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm MindCare AI, your mental health assistant. How can I help you today?", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage.trim(),
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      generateBotResponse(userMessage.text);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string) => {
    let botResponse: string;
    
    // Simple response logic based on keywords
    const lowercaseMsg = userMessage.toLowerCase();
    
    if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hey')) {
      botResponse = "Hello! How are you feeling today?";
    } 
    else if (lowercaseMsg.includes('therapy') || lowercaseMsg.includes('therapist')) {
      botResponse = "We offer various therapy services. Would you like to schedule an appointment with one of our therapists?";
    }
    else if (lowercaseMsg.includes('appointment') || lowercaseMsg.includes('schedule')) {
      botResponse = "To schedule an appointment, you can fill out our contact form or call us at (555) 123-4567.";
    }
    else if (lowercaseMsg.includes('anxiety') || lowercaseMsg.includes('anxious') || lowercaseMsg.includes('worried')) {
      botResponse = "Anxiety is a common feeling. Deep breathing exercises might help in the moment. Our specialists can provide more personalized strategies.";
    }
    else if (lowercaseMsg.includes('depress') || lowercaseMsg.includes('sad') || lowercaseMsg.includes('down')) {
      botResponse = "I'm sorry to hear you're feeling this way. It's important to talk to a professional. Would you like information about our depression treatments?";
    }
    else if (lowercaseMsg.includes('help')) {
      botResponse = "I'm here to help! I can provide information about our services, help schedule appointments, or offer general mental health resources.";
    }
    else {
      botResponse = "Thank you for your message. If you have specific questions about our services or would like to speak with a specialist, please let me know.";
    }
    
    // Add bot message
    const newBotMessage: Message = {
      id: messages.length + 2,
      text: botResponse,
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newBotMessage]);
    setIsTyping(false);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-purple-400 hover:bg-purple-500 shadow-lg z-50"
        aria-label="Chat with AI assistant"
      >
        <Bot className="h-7 w-7" />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl border border-purple-200 z-50 animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-t-lg py-3 px-4 flex flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white p-1.5 rounded-full mr-3">
                <Bot className="h-5 w-5 text-purple-500" />
              </div>
              <CardTitle className="text-lg font-medium">MindCare AI</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat} 
              className="text-white hover:bg-purple-600/20 h-8 w-8"
            >
              <CircleX className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 bg-white">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`mb-4 flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.isBot
                        ? 'bg-purple-100 text-gray-800'
                        : 'bg-purple-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-right mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-purple-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <Circle className="h-2 w-2 animate-bounce text-purple-500" />
                      <Circle className="h-2 w-2 animate-bounce delay-100 text-purple-500" />
                      <Circle className="h-2 w-2 animate-bounce delay-200 text-purple-500" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <CardFooter className="p-3 bg-gray-50 border-t">
            <form onSubmit={handleSendMessage} className="w-full flex gap-2">
              <Input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-purple-400 hover:bg-purple-500"
                disabled={!inputMessage.trim()}
              >
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default AiChatBot;
