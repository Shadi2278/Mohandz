import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
    description: {
        ar: 'منصتك المتكاملة للخدمات الهندسية المتخصصة في المملكة العربية السعودية. نصمم لك المستقبل بدقة وإبداع.',
        en: 'Your integrated platform for specialized engineering services in Saudi Arabia. We design the future with precision and creativity.'
    },
    quickLinks: { ar: 'روابط سريعة', en: 'Quick Links' },
    home: { ar: 'الرئيسية', en: 'Home' },
    services: { ar: 'الخدمات', en: 'Services' },
    projects: { ar: 'المشاريع', en: 'Projects' },
    about: { ar: 'من نحن', en: 'About Us' },
    faq: { ar: 'الأسئلة الشائعة', en: 'FAQ' },
    ourServices: { ar: 'خدماتنا', en: 'Our Services' },
    contactUs: { ar: 'تواصل معنا', en: 'Contact Us' },
    location: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
    workingHours: { ar: 'الأحد - الخميس: 8:00 - 17:00', en: 'Sun - Thu: 8:00 AM - 5:00 PM' },
    copyright: { ar: '© 2025 منصة مهندز. جميع الحقوق محفوظة.', en: '© 2025 Mohandz Platform. All rights reserved.' }
};

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    navigate('/services', { state: { scrollTo: serviceId } });
  };

  const servicesLinks = [
    { id: 'الخدمات المعمارية والإنشائية', name: { ar: 'معماري وإنشائي', en: 'Architectural' } },
    { id: 'خدمات الطرق والبنية التحتية', name: { ar: 'طرق وبنية تحتية', en: 'Roads & Infra' } },
    { id: 'خدمات الموقع المساحية', name: { ar: 'خدمات مساحية', en: 'Surveying' } },
    { id: 'خدمات الهندسة الكهربائية والميكانيكية', name: { ar: 'خدمات MEP', en: 'MEP Services' } },
    { id: 'خدمات التصميم الداخلي والديكور', name: { ar: 'تصميم داخلي', en: 'Interior Design' } },
    { id: 'خدمات الاستشارات الهندسية والتقييم', name: { ar: 'استشارات وتقييم', en: 'Consultancy' } },
    { id: 'خدمات إدارة المشاريع الهندسية', name: { ar: 'إدارة مشاريع', en: 'Project Mgmt' } },
  ];

  const phoneNumber = '+966509114525';
  const emailAddress = 'admin@mohandz.com';
  const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`;
  const emailLink = `mailto:${emailAddress}`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-40 h-12 flex items-center justify-start">
                <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7f2c6a19-1f72-4425-92ba-0bc3d110481e/7845ad99f7d1ee296565d734621911bf.png" alt="شعار منصة مهندز" className="w-full h-full object-contain" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(translations.description)}
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold text-foreground mb-4 block">{t(translations.quickLinks)}</span>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-accent transition-colors text-sm">{t(translations.home)}</Link>
              <Link to="/services" className="block text-muted-foreground hover:text-accent transition-colors text-sm">{t(translations.services)}</Link>
              <Link to="/projects" className="block text-muted-foreground hover:text-accent transition-colors text-sm">{t(translations.projects)}</Link>
              <Link to="/about" className="block text-muted-foreground hover:text-accent transition-colors text-sm">{t(translations.about)}</Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-accent transition-colors text-sm">{t(translations.faq)}</Link>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold text-foreground mb-4 block">{t(translations.ourServices)}</span>
            <div className="space-y-2">
              {servicesLinks.map((service, index) => (
                <button 
                  key={index} 
                  onClick={() => handleServiceClick(service.id)}
                  className="block text-muted-foreground hover:text-accent transition-colors text-sm text-right w-full"
                >
                  {t(service.name)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold text-foreground mb-4 block">{t(translations.contactUs)}</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-4 h-4 text-accent" />
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors text-sm" style={{direction: 'ltr', textAlign: 'right'}}>{phoneNumber}</a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-4 h-4 text-accent" />
                <a href={emailLink} className="text-muted-foreground hover:text-accent transition-colors text-sm">{emailAddress}</a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground text-sm">{t(translations.location)}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground text-sm">{t(translations.workingHours)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            {t(translations.copyright)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;