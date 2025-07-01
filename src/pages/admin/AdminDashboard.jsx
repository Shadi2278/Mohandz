import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase, FolderKanban, Users, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    requests: 0,
    projects: 0,
    services: 0
  });

  useEffect(() => {
    // In a real app, you'd fetch this data. Here we use localStorage.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const requests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const services = JSON.parse(localStorage.getItem('services')) || [];

    setStats({
      users: users.length,
      requests: requests.length,
      projects: projects.length,
      services: services.length,
    });
  }, []);

  const statCards = [
    { title: 'إجمالي المستخدمين', value: stats.users, icon: Users, color: 'text-purple-400' },
    { title: 'إجمالي الطلبات', value: stats.requests, icon: MessageSquare, color: 'text-blue-400' },
    { title: 'إجمالي المشاريع', value: stats.projects, icon: FolderKanban, color: 'text-green-400' },
    { title: 'إجمالي الخدمات', value: stats.services, icon: Briefcase, color: 'text-yellow-400' },
  ];

  const recentRequests = (JSON.parse(localStorage.getItem('serviceRequests')) || []).slice(-5).reverse();

  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white"
      >
        لوحة التحكم الرئيسية
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-[#282C34] border-gray-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{card.title}</CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-[#282C34] border-gray-700 text-white">
          <CardHeader>
            <CardTitle>أحدث الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            {recentRequests.length > 0 ? (
              <ul className="space-y-4">
                {recentRequests.map(req => (
                  <li key={req.id} className="flex items-center justify-between p-3 bg-[#3C4043] rounded-lg">
                    <div>
                      <p className="font-semibold">{req.serviceTitle}</p>
                      <p className="text-sm text-gray-400">{req.fullName} - {req.email}</p>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleDateString('ar-SA')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-center py-4">لا توجد طلبات حديثة.</p>
            )}
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

export default AdminDashboard;