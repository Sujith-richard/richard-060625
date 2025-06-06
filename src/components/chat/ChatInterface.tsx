import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../layout/Navbar';
import ChatSidebar from './ChatSidebar';
import MessageBubble from './MessageBubble';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'system' | 'contact';
  timestamp: Date;
  platform?: 'whatsapp' | 'email' | 'linkedin' | 'calendar';
  senderName?: string;
  avatar?: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to UniConnect! I can help you manage your communications across all platforms. Try typing "show whatsapp messages" or "schedule a meeting".',
      sender: 'system',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: '2',
      content: 'Hi! Just wanted to follow up on our conversation yesterday. Let me know when you\'re available to chat.',
      sender: 'contact',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      platform: 'whatsapp',
      senderName: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      content: 'You have a meeting scheduled for 3 PM today with the marketing team.',
      sender: 'system',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
      platform: 'calendar',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('whatsapp') || lowerInput.includes('messages')) {
      return 'Here are your recent WhatsApp messages:\n\n1. Sarah Johnson: "Hi! Just wanted to follow up..."\n2. Mike Chen: "Thanks for the documents"\n3. Team Chat: "Meeting moved to 4 PM"\n\nWould you like me to show more details or help you reply to any of these?';
    } else if (lowerInput.includes('schedule') || lowerInput.includes('meeting') || lowerInput.includes('calendar')) {
      return 'I can help you schedule a meeting! Please provide:\n\n• Meeting title\n• Date and time\n• Attendees\n• Duration\n\nFor example: "Schedule team sync for tomorrow 2 PM with John and Sarah for 1 hour"';
    } else if (lowerInput.includes('email')) {
      return 'Here are your recent emails:\n\n📧 New proposal from client (2 hours ago)\n📧 Weekly newsletter (4 hours ago)\n📧 Meeting confirmation (1 day ago)\n\nWould you like me to open any of these or help you compose a new email?';
    } else if (lowerInput.includes('linkedin')) {
      return 'Your LinkedIn integration is not yet connected. Would you like me to help you set it up? You can:\n\n• Connect your LinkedIn account\n• Sync your professional messages\n• Manage connection requests\n\nGo to Integrations to get started!';
    } else if (lowerInput.includes('help') || lowerInput.includes('commands')) {
      return 'Here are some things I can help you with:\n\n🔹 "show whatsapp messages" - View recent WhatsApp chats\n🔹 "schedule meeting" - Create calendar events\n🔹 "check email" - Review your inbox\n🔹 "connect linkedin" - Set up LinkedIn integration\n🔹 "create note" - Add to Google Keep\n🔹 "set reminder" - Schedule notifications\n\nWhat would you like to do?';
    } else {
      return 'I understand you\'re looking for help with your communications. I can assist with WhatsApp messages, scheduling meetings, checking emails, and more. Try saying "help" to see all available commands, or be more specific about what you\'d like to do!';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex h-[calc(100vh-64px)]">
        <ChatSidebar />
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Unified Inbox</h1>
                <p className="text-sm text-gray-500">All your communications in one place</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} currentUser={user} />
            ))}
            
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">UniConnect is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5 text-gray-500" />
              </button>
              
              <div className="flex-1 bg-gray-100 rounded-2xl p-3">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message or command..."
                  className="w-full bg-transparent resize-none outline-none text-gray-900 placeholder-gray-500"
                  rows={1}
                  style={{ minHeight: '24px', maxHeight: '120px' }}
                />
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Smile className="w-5 h-5 text-gray-500" />
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;