import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { FolderKanban, MessageSquare, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const ClientDashboard = () => {
    const { user } = useAuth();
    const { toast } = useToast();

    React.useEffect(() => {
        toast({
            title: "🚧 هذه الميزة غير متاحة حالياً",
            description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
        });
    }, [toast]);

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
                مرحباً بعودتك، {user?.fullName}!
            </motion.h1>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">المشاريع النشطة</CardTitle>
                        <FolderKanban className="h-5 w-5 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeProjects}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">الطلبات المعلقة</CardTitle>
                        <FolderKanban className="h-5 w-5 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">الرسائل غير المقروءة</CardTitle>
                        <MessageSquare className="h-5 w-5 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.unreadMessages}</div>
                    </CardContent>
                </Card>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="bg-[#282C34] border-gray-700 text-white">
                    <CardHeader>
                        <CardTitle>مشاريعك الأخيرة</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-gray-400 py-10">
                        <p>لا توجد مشاريع لعرضها حالياً.</p>
                        <p className="mt-2 text-sm">بمجرد أن تبدأ مشروعاً، سيظهر هنا.</p>
                         <Link to="/client-dashboard/new-request">
                            <Button className="mt-6 purple-gradient hover:scale-105 transition-transform">
                               <PlusCircle className="w-5 h-5 ml-2" />
                                طلب خدمة جديدة
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">تنبيه هام</h2>
                <div className="bg-yellow-900/30 border border-yellow-500 text-yellow-300 p-4 rounded-lg">
                    <p>
                        أنت تستخدم حاليًا <strong>`localStorage`</strong> لتخزين البيانات. هذا مناسب للتجربة الأولية، لكنه غير آمن وغير دائم للاستخدام الفعلي.
                    </p>
                    <p className="mt-2">
                        للحصول على تجربة متكاملة وآمنة، <strong>أوصي بشدة بالانتقال إلى Supabase</strong>. سيمكنك ذلك من تخزين البيانات بشكل آمن، وإدارة الملفات، وتأمين المصادقة بشكل احترافي.
                    </p>
                    <p className="mt-2">
                        هل أنت جاهز لنقل منصتك إلى المستوى التالي باستخدام Supabase؟ 🚀
                    </p>
                </div>
            </div>

        </div>
    );
};

export default ClientDashboard;