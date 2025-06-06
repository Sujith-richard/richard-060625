import React, { useState } from 'react';
import { Search, MessageCircle, Mail, Users, Calendar, MoreHorizontal, Plus } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  platform: 'whatsapp' | 'email' | 'linkedin' | 'calendar';
  avatar?: string;
  isOnline?: boolean;
}

const ChatSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      lastMessage: 'Hi! Just wanted to follow up on our conversation yesterday...',
      timestamp: '2m ago',
      unread: 2,
      platform: 'whatsapp',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      isOnline: true
    },
    {
      id: '2',
      name: 'Marketing Team',
      lastMessage: 'Meeting scheduled for 3 PM today',
      timestamp: '5m ago',
      unread: 0,
      platform: 'calendar',
    },
    {
      id: '3',
      name: 'john.doe@company.com',
      lastMessage: 'Please find the attached proposal document...',
      timestamp: '1h ago',
      unread: 1,
      platform: 'email',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Alex Chen',
      lastMessage: 'Thanks for connecting! Would love to discuss opportunities...',
      timestamp: '2h ago',
      unread: 0,
      platform: 'linkedin',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '5',
      name: 'Design Team',
      lastMessage: 'New design assets are ready for review',
      timestamp: '3h ago',
      unread: 3,
      platform: 'whatsapp',
    },
    {
      id: '6',
      name: 'Weekly Newsletter',
      lastMessage: 'Your weekly digest is here!',
      timestamp: '1d ago',
      unread: 0,
      platform: 'email',
    }
  ];

  const filters = [
    { id: 'all', name: 'All', icon: MessageCircle },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'linkedin', name: 'LinkedIn', icon: Users },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
  ];

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'whatsapp': return 'bg-green-100 text-green-600';
      case 'email': return 'bg-blue-100 text-blue-600';
      case 'linkedin': return 'bg-indigo-100 text-indigo-600';
      case 'calendar': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp': return MessageCircle;
      case 'email': return Mail;
      case 'linkedin': return Users;
      case 'calendar': return Calendar;
      default: return MessageCircle;
    }
  };

  const filteredConversations = conversations.filter(conv => 
    (activeFilter === 'all' || conv.platform === activeFilter) &&
    (searchQuery === '' || conv.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-1 overflow-x-auto pb-2">
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{filter.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const PlatformIcon = getPlatformIcon(conversation.platform);
          return (
            <div
              key={conversation.id}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative">
                  {conversation.avatar ? (
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {conversation.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  )}
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                  {/* Platform indicator */}
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getPlatformColor(conversation.platform)}`}>
                    <PlatformIcon className="w-3 h-3" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {conversation.timestamp}
                      </span>
                      {conversation.unread > 0 && (
                        <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* More options */}
                <button className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;