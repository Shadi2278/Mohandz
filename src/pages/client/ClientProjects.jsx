
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
    title: { ar: 'مشاريعي', en: 'My Projects' },
    description: { ar: 'هنا ستجد قائمة بجميع مشاريعك وحالتها.', en: 'Here you will find a list of all your projects and their status.' },
    featureNotAvailable: { ar: '🚧 هذه الميزة غير متاحة حالياً', en: '🚧 This feature is not available yet' },
    featureRequest: { ar: 'لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀', en: 'Don\'t worry! You can request it in your next prompt! 🚀' },
};

const ClientProjects = () => {
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

export default ClientProjects;
