import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, User, PlusCircle, Compass, Home, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ClientLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "✅ تم تسجيل الخروج بنجاح",
      description: "نأمل رؤيتك مرة أخرى قريباً!",
    });
    navigate('/');
  };

  const navLinks = [
    { to: '/client-dashboard', text: 'لوحة التحكم', icon: LayoutDashboard },
    { to: '/client-dashboard/projects', text: 'مشاريعي', icon: FolderKanban },
    { to: '/client-dashboard/profile', text: 'ملفي الشخصي', icon: User },
    { to: '/client-dashboard/new-request', text: 'طلب خدمة جديد', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen flex bg-[#1a1d23]">
      <aside className="w-64 bg-[#282C34] p-4 flex flex-col border-l border-gray-700">
        <div className="flex items-center space-x-3 space-x-reverse p-4 border-b border-gray-700 mb-6">
          <Compass className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold text-white">منطقة العميل</span>
        </div>
        <nav className="flex-grow">
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/client-dashboard'}
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
           <button
            onClick={handleLogout}
            className="flex items-center space-x-3 space-x-reverse p-3 my-1 rounded-lg transition-colors duration-200 text-gray-300 hover:bg-purple-500/10 hover:text-white w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
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

export default ClientLayout;