'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from "react";

export default function AIChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you with your real estate needs today?', type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!isExpanded) {
      setIsExpanded(true);
    }

    const userMessage = { role: "user", content: input, type: 'text' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/getAIResponse`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      let data = await response.json();

      if (data.includes("|")) {
        const firstIndex = data.indexOf("|");
        const lastIndex = data.lastIndexOf("|");
        if (firstIndex !== lastIndex) {
          const substring = data.substring(firstIndex + 1, lastIndex); // Extract between first and last '|'
          data = data.slice(0, firstIndex) + " " + data.slice(lastIndex + 1); // Remove the original link text
          setMessages(prevMessages => [
            ...prevMessages,
            { role: 'assistant', content: data, type: 'text' },
            {
              role: 'assistant',
              content: <a href={substring} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Properties</a>,
              type: 'jsx'
            }
          ]);
        } else {
          setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data, type: 'text' }]);
        }
      } else {
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data, type: 'text' }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again later.', type: 'text' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm transition-all duration-300 ${isExpanded ? 'h-[400px]' : 'h-[150px]'}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <MessageCircle className="h-6 w-6 mr-2" />
          Chat with our AI Real Estate Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className={`flex flex-col ${isExpanded ? 'h-[calc(100%-60px)]' : 'h-[50px]'}`}>
        <div
          ref={chatBoxRef}
          className={`overflow-auto mb-4 space-y-4 flex-grow ${isExpanded ? 'block' : 'hidden'}`}
        >
          {messages.map((m, index) => (
            <div key={index} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-3 py-2 max-w-[80%] ${
                m.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-left'
              }`}>
                {m.type === 'jsx' ? m.content : <span>{m.content}</span>}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-3 py-2 bg-muted flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>AI is typing...</span>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="I am looking for a two bedroom apartment in Villanova."
            className="flex-grow"
            disabled={isLoading}
            autoFocus
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="ml-2">{isLoading ? 'Sending...' : 'Send'}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

