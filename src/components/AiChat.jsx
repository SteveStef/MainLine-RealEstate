'use client';

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Loader2, Maximize2, Minimize2 } from 'lucide-react';

export default function AIChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you with your real estate needs today?', type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
      let msgs = "";
      for(let i = 0; i < messages.length; i++) {
        if(messages[i].role !== "user") continue;
        msgs += `previous message ${i+1}: ${messages[i].content}\n`;
      }
      msgs += "current message: " + input;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: msgs }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      let data = await response.json();

      if (data.includes("|")) {
        const firstIndex = data.indexOf("|");
        const lastIndex = data.lastIndexOf("|");
        if (firstIndex !== lastIndex) {
          const substring = data.substring(firstIndex + 1, lastIndex);
          data = data.slice(0, firstIndex) + " " + data.slice(lastIndex + 1);
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

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setIsExpanded(true);
  };

  const formatMessage = (content) => {
    return content.split('\n').map((line, index, array) => {
      const formattedLine = line.split(/(\*\*.*?\*\*)/).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <React.Fragment key={index}>
            <h3 className="text-lg font-bold my-2">{line.slice(2, -2)}</h3>
            {index < array.length - 1 && <hr className="my-2 border-t border-gray-200" />}
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={index}>
          <p>{formattedLine}</p>
          {index < array.length - 1 && <hr className="my-2 border-t border-gray-200" />}
        </React.Fragment>
      );
    });
  };

  return (
<Card
  className={`mx-auto bg-white transition-all duration-300 flex flex-col ${
    isFullScreen
      ? 'fixed inset-0 z-50 bg-white max-w-[50%] h-full'
      : isExpanded
      ? 'max-w-2xl h-[400px] bg-white/90 backdrop-blur-sm'
      : 'max-w-2xl h-[150px] bg-white/90 backdrop-blur-sm'
  }`}
>
      <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
        <CardTitle className="text-xl font-bold flex items-center">
          <MessageCircle className="h-6 w-6 mr-2" />
          Chat with our AI Real Estate Assistant
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
          {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col overflow-hidden">
        <div
          ref={chatBoxRef}
          className={`overflow-y-auto mb-4 space-y-4 flex-grow ${isExpanded ? 'block' : 'hidden'}`}
        >
          {messages.map((m, index) => (
            <div key={index} className="w-full">
              {m.role === 'user' && (
                <div className="font-semibold text-sm text-gray-500 mb-1">You:</div>
              )}
<div
  key={index}
  className={`inline-block max-w-[80%] break-words rounded-lg px-4 py-2 shadow-md ${
    m.role === 'user'
      ? 'bg-primary text-primary-foreground self-end'
      : 'bg-muted text-foreground self-start'
  }`}
>
  {m.type === 'jsx' ? m.content : formatMessage(m.content)}
</div>
            </div>
          ))}
          {isLoading && (
            <div className="w-full">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted flex items-center space-x-2 shadow-md">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>AI is typing...</span>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-auto p-1">
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
            <span className="ml-2 hidden sm:inline">{isLoading ? 'Sending...' : 'Send'}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

