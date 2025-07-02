import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/Auth';
import { FolderKanban, MessageSquare, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const translations = {
    welcome: { ar: 'مرحباً بعودتك، {fullName}!', en: 'Welcome back, {fullName}!' },
    activeProjects: { ar: 'مشاريعي الحالية', en: 'My Current Projects' },
    pendingRequests: { ar: 'طلباتي المعلقة', en: 'My Pending Requests' },
    viewProjects: { ar: 'عرض كل المشاريع', en: 'View All Projects' },
    recentProjects: { ar: 'مشاريعك الأخيرة', en: 'Your Recent Projects' },
    noProjects: { ar: 'لا توجد مشاريع لعرضها حالياً.', en: 'No projects to display at the moment.' },
    startProject: { ar: 'بمجرد أن تبدأ مشروعاً، سيظهر هنا.', en: 'Once you start a project, it will appear here.' },
    newServiceRequest: { ar: 'اكتشف خدماتنا', en: 'Discover Our Services' },
};

const ClientDashboard = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const { toast } = useToast();
    const [stats, setStats] = useState({ projects: 0, requests: 0 });
    const [recentProjects, setRecentProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('client_id', user.id);
                const { count: requestsCount } = await supabase.from('service_requests').select('*', { count: 'exact', head: true }).eq('user_id', user.id).neq('status', 'completed');
                
                const { data: projectsData, error: projectsError } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('client_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (projectsError) throw projectsError;

                setStats({ projects: projectsCount || 0, requests: requestsCount || 0 });
                setRecentProjects(projectsData);

            } catch (error) {
                console.error("Error fetching client data:", error);
                toast({ title: "فشل تحميل البيانات", variant: "destructive" });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, toast]);

    if (loading) {
        return <div className="text-center text-white">جارِ تحميل لوحة التحكم...</div>;
    }

    return (
        <div className="space-y-8">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-white">
                {t(translations.welcome).replace('{fullName}', user?.full_name || 'المستخدم')}
            </motion.h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">{t(translations.activeProjects)}</CardTitle>
                        <FolderKanban className="h-5 w-5 text-purple-400" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{stats.projects}</div></CardContent>
                </Card>
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">{t(translations.pendingRequests)}</CardTitle>
                        <MessageSquare className="h-5 w-5 text-yellow-400" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{stats.requests}</div></CardContent>
                </Card>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>{t(translations.recentProjects)}</CardTitle>
                        <Link to="projects">
                            <Button variant="link" className="text-purple-300">{t(translations.viewProjects)}</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {recentProjects.length > 0 ? (
                            <ul className="space-y-4">
                                {recentProjects.map(proj => (
                                    <li key={proj.id} className="flex items-center justify-between p-3 bg-[#3C4043] rounded-lg">
                                        <p className="font-semibold">{proj.title}</p>
                                        <span className="text-xs text-gray-400">{proj.status}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center text-gray-400 py-10">
                                <p>{t(translations.noProjects)}</p>
                                <p className="mt-2 text-sm">{t(translations.startProject)}</p>
                                <Link to="/services">
                                    <Button className="mt-6 brand-gradient text-primary-foreground hover:scale-105 transition-transform">
                                        <PlusCircle className="w-5 h-5 ml-2" />
                                        {t(translations.newServiceRequest)}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default ClientDashboard;