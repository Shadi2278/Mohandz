import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Menu, X, User, LogIn, LogOut, LayoutDashboard, UserCog, Search } from 'lucide-react';
import { useAuth } from '@/contexts/Auth';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const translations = {
  navItems: {
    home: { ar: 'الرئيسية', en: 'Home' },
    services: { ar: 'الخدمات', en: 'Services' },
    projects: { ar: 'المشاريع', en: 'Projects' },
    about: { ar: 'من نحن', en: 'About Us' },
    faq: { ar: 'الأسئلة الشائعة', en: 'FAQ' },
  },
  contact: { ar: 'تواصل معنا', en: 'Contact Us' },
  login: { ar: 'تسجيل الدخول', en: 'Login' },
  register: { ar: 'إنشاء حساب', en: 'Register' },
  logout: { ar: 'تسجيل الخروج', en: 'Logout' },
  adminDashboard: { ar: 'لوحة تحكم الأدمن', en: 'Admin Dashboard' },
  clientDashboard: { ar: 'لوحة تحكم العميل', en: 'Client Dashboard' },
  logoutSuccessTitle: { ar: 'تم تسجيل الخروج بنجاح', en: 'Logged out successfully' },
  logoutSuccessDesc: { ar: 'نأمل رؤيتك مرة أخرى قريباً!', en: 'We hope to see you again soon!' },
  aiSearchToast: { ar: '🚧 البحث بالذكاء الاصطناعي غير مفعل بعد!', en: '🚧 AI Search is not implemented yet!' },
  aiSearchToastDesc: { ar: 'هذه الميزة تتطلب قاعدة بيانات. يمكنك طلبها في رسالتك التالية! 🚀', en: 'This feature requires a database. You can request it in your next prompt! 🚀' },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const navItems = [
    { name: t(translations.navItems.home), path: '/' },
    { name: t(translations.navItems.services), path: '/services' },
    { name: t(translations.navItems.projects), path: '/projects' },
    { name: t(translations.navItems.about), path: '/about' },
    { name: t(translations.navItems.faq), path: '/faq' },
  ];

  const handleAiSearchClick = () => {
    toast({
        title: t(translations.aiSearchToast),
        description: t(translations.aiSearchToastDesc),
    });
  };
  
  const handleLogout = async () => {
    await logout();
    toast({
      title: t(translations.logoutSuccessTitle),
      description: t(translations.logoutSuccessDesc),
    });
    navigate('/');
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <>
          {user.role === 'admin' && (
            <Link to="/admin">
              <Button variant="ghost" className="text-foreground/80 hover:text-accent">
                <LayoutDashboard className="w-4 h-4 mx-2" />
                {t(translations.adminDashboard)}
              </Button>
            </Link>
          )}
          {user.role === 'client' && (
             <Link to="/client-dashboard">
              <Button variant="ghost" className="text-foreground/80 hover:text-accent">
                <UserCog className="w-4 h-4 mx-2" />
                {t(translations.clientDashboard)}
              </Button>
            </Link>
          )}
          <Button onClick={handleLogout} className="brand-gradient text-primary-foreground hover:scale-105 transition-transform">
            <LogOut className="w-4 h-4 mx-2" />
            {t(translations.logout)}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login">
            <Button variant="ghost" className="text-foreground/80 hover:text-accent">
              <User className="w-4 h-4 mx-2" />
              {t(translations.login)}
            </Button>
          </Link>
          <Link to="/register">
            <Button className="brand-gradient text-primary-foreground hover:scale-105 transition-transform">
              <LogIn className="w-4 h-4 mx-2" />
              {t(translations.register)}
            </Button>
          </Link>
        </>
      );
    }
  };

  const renderMobileAuthButtons = () => {
    if (user) {
      return (
        <>
          {user.role === 'admin' && (
            <Link to="/admin" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-accent">
                <LayoutDashboard className="w-4 h-4 mx-2" />
                {t(translations.adminDashboard)}
              </Button>
            </Link>
          )}
           {user.role === 'client' && (
            <Link to="/client-dashboard" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-accent">
                <UserCog className="w-4 h-4 mx-2" />
                {t(translations.clientDashboard)}
              </Button>
            </Link>
          )}
          <Button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full brand-gradient text-primary-foreground">
            <LogOut className="w-4 h-4 mx-2" />
            {t(translations.logout)}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-accent">
              <User className="w-4 h-4 mx-2" />
              {t(translations.login)}
            </Button>
          </Link>
          <Link to="/register" onClick={() => setIsOpen(false)}>
            <Button className="w-full brand-gradient text-primary-foreground">
              <LogIn className="w-4 h-4 mx-2" />
              {t(translations.register)}
            </Button>
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <div className="w-48 h-16 flex items-center justify-center">
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7f2c6a19-1f72-4425-92ba-0bc3d110481e/7845ad99f7d1ee296565d734621911bf.png" alt="شعار منصة مهندز" className="w-full h-full object-contain" />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-4 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-accent bg-accent/10'
                    : 'text-foreground/80 hover:text-accent hover:bg-accent/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2 space-x-reverse">
            <Button onClick={handleAiSearchClick} variant="ghost" size="icon" className="text-foreground/80 hover:text-accent">
                <Search className="w-5 h-5"/>
            </Button>
            <LanguageSwitcher />
            <div className="w-px h-6 bg-border mx-2"></div>
            {renderAuthButtons()}
          </div>

          <div className="md:hidden flex items-center">
             <LanguageSwitcher />
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/80"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border mt-2 pt-4 pb-4"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground/80 hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    {t(translations.contact)}
                  </Button>
                </Link>
                <div className="border-t border-border my-2"></div>
                {renderMobileAuthButtons()}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;