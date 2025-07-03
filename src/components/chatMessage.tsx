import React from 'react';
import { User, Bot } from 'lucide-react';
// import { Message } from '@/types/chat';
import { Message } from '@/Types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex gap-4 p-4 ${message.isUser ? 'bg-blue-50' : 'bg-white'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
      }`}>
        {message.isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-500 mb-1">
          {message.isUser ? 'You' : 'Trip Assistant'}
        </div>
        <div className="text-gray-800 whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};