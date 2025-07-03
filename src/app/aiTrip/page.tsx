'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ChatHeader } from '@/components/ChatHeader';
// import { ChatMessage } from './components/ChatMessage';
import { ChatMessage } from '@/components/chatMessage';
// import { ChatInput } from './components/ChatInput';
import { ChatInput } from '@/components/ChatInput';
// import { callGeminiAPI } from './services/geminiApi';
import { callGeminiAPI } from '../api/geminiapi/route';
// import { Message, ChatState } from './types/chat';
import { Message,ChatState } from '@/Types/chat';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        content: "Hi! I'm your personal trip planning assistant. Tell me about your dream destination, budget range, travel dates, and what kind of experiences you're looking for. I'll help you create an amazing itinerary that fits your budget perfectly! ✈️",
        isUser: false,
        timestamp: new Date()
      }
    ],
    isLoading: false,
    inputValue: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async () => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: chatState.inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      inputValue: ''
    }));

    try {
      const response = await callGeminiAPI(chatState.inputValue);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false
      }));
    }
  };

  const handleInputChange = (value: string) => {
    setChatState(prev => ({
      ...prev,
      inputValue: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {chatState.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {chatState.isLoading && (
              <div className="flex gap-4 p-4 bg-white">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-500 mb-1">Trip Assistant</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <ChatInput
          value={chatState.inputValue}
          onChange={handleInputChange}
          onSubmit={handleSendMessage}
          isLoading={chatState.isLoading}
        />
      </div>
    </div>
  );
}

export default App;
