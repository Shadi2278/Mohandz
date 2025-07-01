import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FolderKanban, Users, MessageSquare, FileText, Compass, Home, HelpCircle, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const { user } = useAuth();

  const navLinks = [
    { to: '/admin', text: 'لوحة التحكم', icon: LayoutDashboard },
    { to: '/admin/requests', text: 'إدارة الطلبات', icon: MessageSquare },
    { to: '/admin/services', text: 'إدارة الخدمات', icon: Briefcase },
    { to: '/admin/projects', text: 'إدارة المشاريع', icon: FolderKanban },
    { to: '/admin/faq', text: 'إدارة الأسئلة', icon: HelpCircle },
    { to: '/admin/content', text: 'إدارة المحتوى', icon: FileText },
    { to: '/admin/users', text: 'إدارة المستخدمين', icon: Users },
    { to: '/admin/settings', text: 'إعدادات النظام', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#1a1d23]">
      <aside className="w-64 bg-[#282C34] p-4 flex flex-col border-l border-gray-700">
        <div className="flex items-center space-x-3 space-x-reverse p-4 border-b border-gray-700 mb-6">
          <Compass className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold text-white">لوحة تحكم مهندز</span>
        </div>
        <nav className="flex-grow">
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 space-x-reverse p-3 my-1 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'text-gray-300 hover:bg-purple-500/10 hover:text-white'
                    }`
                  }
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-gray-700 pt-4">
           <NavLink
            to="/"
            className="flex items-center space-x-3 space-x-reverse p-3 my-1 rounded-lg transition-colors duration-200 text-gray-300 hover:bg-purple-500/10 hover:text-white"
          >
            <Home className="w-5 h-5" />
            <span>العودة للموقع</span>
          </NavLink>
          <div className="p-3 text-center text-sm text-gray-400">
            <p>مرحباً، {user?.fullName}</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;