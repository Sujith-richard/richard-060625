import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Settings, Zap, Users, Calendar, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './layout/Navbar';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const integrations = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'green', connected: true, messages: 12 },
    { name: 'Email', icon: Mail, color: 'blue', connected: true, messages: 8 },
    { name: 'LinkedIn', icon: Users, color: 'indigo', connected: false, messages: 0 },
    { name: 'Calendar', icon: Calendar, color: 'purple', connected: true, messages: 3 },
  ];

  const quickActions = [
    { name: 'Start Chat', icon: MessageCircle, link: '/chat', color: 'blue' },
    { name: 'Integrations', icon: Zap, link: '/integrations', color: 'purple' },
    { name: 'Profile', icon: Settings, link: '/profile', color: 'gray' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your unified communication hub.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Apps</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Conversations</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    to={action.link}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg mr-3 ${
                      action.color === 'blue' ? 'bg-blue-100' :
                      action.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
                    }`}>
                      <action.icon className={`w-5 h-5 ${
                        action.color === 'blue' ? 'text-blue-600' :
                        action.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className="font-medium text-gray-900">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Integrations Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Connected Platforms</h2>
                <Link
                  to="/integrations"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Manage all
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${
                          integration.color === 'green' ? 'bg-green-100' :
                          integration.color === 'blue' ? 'bg-blue-100' :
                          integration.color === 'indigo' ? 'bg-indigo-100' :
                          'bg-purple-100'
                        }`}>
                          <integration.icon className={`w-5 h-5 ${
                            integration.color === 'green' ? 'text-green-600' :
                            integration.color === 'blue' ? 'text-blue-600' :
                            integration.color === 'indigo' ? 'text-indigo-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                        <h3 className="font-medium text-gray-900">{integration.name}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        integration.connected
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {integration.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {integration.messages} unread messages
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;