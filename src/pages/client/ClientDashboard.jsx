import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/Auth';
import { FolderKanban, MessageSquare, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
    welcome: { ar: 'مرحباً بعودتك، {fullName}!', en: 'Welcome back, {fullName}!' },
    activeProjects: { ar: 'المشاريع النشطة', en: 'Active Projects' },
    pendingRequests: { ar: 'الطلبات المعلقة', en: 'Pending Requests' },
    unreadMessages: { ar: 'الرسائل غير المقروءة', en: 'Unread Messages' },
    recentProjects: { ar: 'مشاريعك الأخيرة', en: 'Your Recent Projects' },
    noProjects: { ar: 'لا توجد مشاريع لعرضها حالياً.', en: 'No projects to display at the moment.' },
    startProject: { ar: 'بمجرد أن تبدأ مشروعاً، سيظهر هنا.', en: 'Once you start a project, it will appear here.' },
    newServiceRequest: { ar: 'طلب خدمة جديدة', en: 'Request a New Service' },
    featureNotAvailable: { ar: '🚧 هذه الميزة غير متاحة حالياً', en: '🚧 This feature is not available yet' },
    featureRequest: { ar: 'لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀', en: 'Don\'t worry! You can request it in your next prompt! 🚀' },
};

const ClientDashboard = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const { t } = useLanguage();

    React.useEffect(() => {
        toast({
            title: t(translations.featureNotAvailable),
            description: t(translations.featureRequest),
        });
    }, [toast, t]);

    const stats = {
        activeProjects: 0,
        pendingRequests: 0,
        unreadMessages: 0,
    };

    return (
        <div className="space-y-8">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-white">
                {t(translations.welcome).replace('{fullName}', user?.full_name || 'المستخدم')}
            </motion.h1>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">{t(translations.activeProjects)}</CardTitle>
                        <FolderKanban className="h-5 w-5 text-purple-400" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{stats.activeProjects}</div></CardContent>
                </Card>
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">{t(translations.pendingRequests)}</CardTitle>
                        <FolderKanban className="h-5 w-5 text-yellow-400" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{stats.pendingRequests}</div></CardContent>
                </Card>
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">{t(translations.unreadMessages)}</CardTitle>
                        <MessageSquare className="h-5 w-5 text-blue-400" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{stats.unreadMessages}</div></CardContent>
                </Card>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader><CardTitle>{t(translations.recentProjects)}</CardTitle></CardHeader>
                    <CardContent className="text-center text-gray-400 py-10">
                        <p>{t(translations.noProjects)}</p>
                        <p className="mt-2 text-sm">{t(translations.startProject)}</p>
                         <Link to="/services">
                            <Button className="mt-6 purple-gradient hover:scale-105 transition-transform">
                               <PlusCircle className="w-5 h-5 ml-2" />
                                {t(translations.newServiceRequest)}
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default ClientDashboard;