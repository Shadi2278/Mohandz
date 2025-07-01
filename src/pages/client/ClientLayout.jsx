import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, User, PlusCircle, Compass, Home, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/Auth';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
    title: { ar: 'منطقة العميل', en: 'Client Area' },
    dashboard: { ar: 'لوحة التحكم', en: 'Dashboard' },
    myProjects: { ar: 'مشاريعي', en: 'My Projects' },
    myProfile: { ar: 'ملفي الشخصي', en: 'My Profile' },
    newRequest: { ar: 'طلب خدمة جديد', en: 'New Service Request' },
    backToSite: { ar: 'العودة للموقع', en: 'Back to Site' },
    logout: { ar: 'تسجيل الخروج', en: 'Logout' },
    welcome: { ar: 'مرحباً، {fullName}', en: 'Welcome, {fullName}' },
    logoutSuccess: { ar: '✅ تم تسجيل الخروج بنجاح', en: '✅ Logged out successfully' },
    logoutDesc: { ar: 'نأمل رؤيتك مرة أخرى قريباً!', en: 'We hope to see you again soon!' },
};


const ClientLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { t } = useLanguage();

    const handleLogout = async () => {
        const { error } = await logout();
        if (!error) {
            toast({
                title: t(translations.logoutSuccess),
                description: t(translations.logoutDesc),
            });
            navigate('/');
        }
    };

    const navLinks = [
        { to: '/client-dashboard', text: t(translations.dashboard), icon: LayoutDashboard },
        { to: '/client-dashboard/projects', text: t(translations.myProjects), icon: FolderKanban },
        { to: '/client-dashboard/profile', text: t(translations.myProfile), icon: User },
        { to: '/client-dashboard/new-request', text: t(translations.newRequest), icon: PlusCircle },
    ];

    return (
        <div className="min-h-screen flex bg-[#1a1d23]">
            <aside className="w-64 bg-[#282C34] p-4 flex flex-col border-l border-gray-700">
                <div className="flex items-center space-x-3 space-x-reverse p-4 border-b border-gray-700 mb-6">
                    <Compass className="w-8 h-8 text-purple-400" />
                    <span className="text-xl font-bold text-white">{t(translations.title)}</span>
                </div>
                <nav className="flex-grow">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    end={link.to === '/client-dashboard'}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 space-x-reverse p-3 my-1 rounded-lg transition-colors duration-200 ${isActive ? 'bg-purple-500/20 text-purple-300' : 'text-gray-300 hover:bg-purple-500/10 hover:text-white'}`
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
                        <span>{t(translations.backToSite)}</span>
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 space-x-reverse p-3 my-1 rounded-lg transition-colors duration-200 text-gray-300 hover:bg-purple-500/10 hover:text-white w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>{t(translations.logout)}</span>
                    </button>
                    <div className="p-3 text-center text-sm text-gray-400">
                        <p>{t(translations.welcome).replace('{fullName}', user?.full_name || 'المستخدم')}</p>
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