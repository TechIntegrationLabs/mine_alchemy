import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { useUser } from '@clerk/clerk-react';
import { 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  HelpCircle,
  ChevronRight,
  Moon,
  LogOut
} from 'lucide-react';

const SettingSection: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
  onClick?: () => void;
}> = ({ icon: Icon, title, description, action, onClick }) => (
  <div 
    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    {action || <ChevronRight className="w-5 h-5 text-gray-400" />}
  </div>
);

export const Settings: React.FC = () => {
  const { user, signOut } = useUser();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and application settings"
      />

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <img
                src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}`}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">{user?.fullName}</h2>
                <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            <SettingSection
              icon={Lock}
              title="Privacy & Security"
              description="Manage your password and security preferences"
              onClick={() => user?.openSecuritySettings()}
            />

            <SettingSection
              icon={Bell}
              title="Notifications"
              description="Choose what updates you want to receive"
              action={
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              }
            />

            <SettingSection
              icon={Moon}
              title="Dark Mode"
              description="Toggle dark mode appearance"
              action={
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              }
            />

            <SettingSection
              icon={Globe}
              title="Language"
              description="Change your preferred language"
            />

            <SettingSection
              icon={HelpCircle}
              title="Help & Support"
              description="Get help or contact support"
            />
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={handleSignOut}
            className="inline-flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};