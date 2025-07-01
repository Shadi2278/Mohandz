
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
    title: { ar: 'ملفي الشخصي', en: 'My Profile' },
    description: { ar: 'هنا يمكنك تحديث معلوماتك الشخصية وتفضيلات الإشعارات.', en: 'Here you can update your personal information and notification preferences.' },
    featureNotAvailable: { ar: '🚧 هذه الميزة غير متاحة حالياً', en: '🚧 This feature is not available yet' },
    featureRequest: { ar: 'لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀', en: 'Don\'t worry! You can request it in your next prompt! 🚀' },
};

const ClientProfile = () => {
    const { toast } = useToast();
    const { t } = useLanguage();
    React.useEffect(() => {
        toast({
            title: t(translations.featureNotAvailable),
            description: t(translations.featureRequest),
        });
    }, [toast, t]);
    return <div className="text-white"><h1>{t(translations.title)}</h1><p>{t(translations.description)}</p></div>;
};

export default ClientProfile;
