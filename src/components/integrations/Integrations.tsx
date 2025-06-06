import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Users, 
  Calendar, 
  Settings, 
  Plus,
  Check,
  AlertCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import Navbar from '../layout/Navbar';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  connected: boolean;
  lastSync?: string;
  features: string[];
  connectionUrl?: string;
}

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Connect your WhatsApp Business account to manage conversations',
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      connected: true,
      lastSync: '2 minutes ago',
      features: ['Send & receive messages', 'Group chat management', 'Media sharing', 'Status updates'],
      connectionUrl: 'https://business.whatsapp.com'
    },
    {
      id: 'email',
      name: 'Email (Gmail/Outlook)',
      description: 'Sync your email accounts for unified inbox management',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      connected: true,
      lastSync: '5 minutes ago',
      features: ['Read & compose emails', 'Folder organization', 'Search & filters', 'Attachment handling'],
      connectionUrl: 'https://gmail.com'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Manage professional networking and messages',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      connected: false,
      features: ['Professional messaging', 'Connection requests', 'Network updates', 'Job notifications'],
      connectionUrl: 'https://linkedin.com'
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Schedule meetings and manage events seamlessly',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      connected: true,
      lastSync: '1 minute ago',
      features: ['Create & edit events', 'Meeting scheduling', 'Reminders', 'Calendar sharing'],
      connectionUrl: 'https://calendar.google.com'
    }
  ]);

  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleConnect = async (integrationId: string) => {
    setConnectingId(integrationId);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: true, lastSync: 'Just now' }
          : integration
      )
    );
    
    setConnectingId(null);
  };

  const handleDisconnect = async (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: false, lastSync: undefined }
          : integration
      )
    );
  };

  const handleSync = async (integrationId: string) => {
    setConnectingId(integrationId);
    
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, lastSync: 'Just now' }
          : integration
      )
    );
    
    setConnectingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
          <p className="text-gray-600">
            Connect your favorite apps and services to streamline your workflow
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Apps</p>
                <p className="text-2xl font-bold text-gray-900">
                  {integrations.filter(i => i.connected).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Integrations</p>
                <p className="text-2xl font-bold text-gray-900">{integrations.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sync Status</p>
                <p className="text-2xl font-bold text-gray-900">Active</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid gap-6">
          {integrations.map((integration) => {
            const IconComponent = integration.icon;
            const isConnecting = connectingId === integration.id;
            
            return (
              <div key={integration.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${integration.bgColor}`}>
                        <IconComponent className={`w-8 h-8 ${integration.color}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {integration.name}
                          </h3>
                          {integration.connected ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              Connected
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                              Not Connected
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-4">{integration.description}</p>
                        
                        {integration.connected && integration.lastSync && (
                          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
                            <RefreshCw className="w-4 h-4" />
                            <span>Last synced: {integration.lastSync}</span>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {integration.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      {integration.connected ? (
                        <>
                          <button
                            onClick={() => handleSync(integration.id)}
                            disabled={isConnecting}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {isConnecting ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <RefreshCw className="w-4 h-4" />
                            )}
                            <span>{isConnecting ? 'Syncing...' : 'Sync Now'}</span>
                          </button>
                          
                          <button
                            onClick={() => handleDisconnect(integration.id)}
                            className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>Disconnect</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleConnect(integration.id)}
                          disabled={isConnecting}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {isConnecting ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                          <span>{isConnecting ? 'Connecting...' : 'Connect'}</span>
                        </button>
                      )}
                      
                      {integration.connectionUrl && (
                        <a
                          href={integration.connectionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open App</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-700 mb-3">
                Having trouble connecting an integration? Check out our setup guides or contact support.
              </p>
              <div className="flex space-x-3">
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  View Setup Guides
                </button>
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;