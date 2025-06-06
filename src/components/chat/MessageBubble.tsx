import React from 'react';
import { Calendar, Mail, MessageCircle, Users, Clock, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'system' | 'contact';
  timestamp: Date;
  platform?: 'whatsapp' | 'email' | 'linkedin' | 'calendar';
  senderName?: string;
  avatar?: string;
}

interface MessageBubbleProps {
  message: Message;
  currentUser: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, currentUser }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  const getPlatformIcon = () => {
    switch (message.platform) {
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'linkedin': return <Users className="w-4 h-4" />;
      case 'calendar': return <Calendar className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPlatformColor = () => {
    switch (message.platform) {
      case 'whatsapp': return 'text-green-600 bg-green-50';
      case 'email': return 'text-blue-600 bg-blue-50';
      case 'linkedin': return 'text-indigo-600 bg-indigo-50';
      case 'calendar': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isSystem) {
    return (
      <div className="flex justify-center mb-4">
        <div className="max-w-md mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3">
            <div className="flex items-start space-x-3">
              {message.platform && (
                <div className={`p-2 rounded-lg ${getPlatformColor()}`}>
                  {getPlatformIcon()}
                </div>
              )}
              <div className="flex-1">
                <div className="text-sm text-blue-800 whitespace-pre-wrap">
                  {message.content}
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <Clock className="w-3 h-3 text-blue-600" />
                  <span className="text-xs text-blue-600">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-md">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-md px-4 py-3">
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            <div className="flex items-center justify-end space-x-1 mt-2">
              <span className="text-xs text-blue-100">
                {formatTime(message.timestamp)}
              </span>
              <CheckCheck className="w-3 h-3 text-blue-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Contact message
  return (
    <div className="flex items-start space-x-3 mb-4">
      {/* Avatar */}
      <div className="relative">
        {message.avatar ? (
          <img
            src={message.avatar}
            alt={message.senderName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {message.senderName?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
            </span>
          </div>
        )}
        {/* Platform indicator */}
        {message.platform && (
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getPlatformColor()}`}>
            {getPlatformIcon()}
          </div>
        )}
      </div>

      {/* Message content */}
      <div className="flex-1 max-w-md">
        {message.senderName && (
          <div className="text-xs text-gray-600 mb-1 font-medium">
            {message.senderName}
          </div>
        )}
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
          <div className="text-sm text-gray-900 whitespace-pre-wrap">
            {message.content}
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;