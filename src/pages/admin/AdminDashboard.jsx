import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase, FolderKanban, Users, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    requests: 0,
    projects: 0,
    services: 7 
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: usersCount, error: usersError } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { count: contactMessagesCount, error: contactError } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true });
        const { count: serviceRequestsCount, error: serviceReqError } = await supabase.from('service_requests').select('*', { count: 'exact', head: true });

        if (usersError) console.error('Users Error:', usersError);
        if (contactError) console.error('Contact Error:', contactError);
        if (serviceReqError) console.error('Service Request Error:', serviceReqError);
        
        setStats(prev => ({
          ...prev,
          users: usersCount || 0,
          requests: (contactMessagesCount || 0) + (serviceRequestsCount || 0),
        }));
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    const fetchRecentRequests = async () => {
        try {
            const { data, error } = await supabase
                .from('service_requests')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;
            setRecentRequests(data);
        } catch (error) {
            console.error('Error fetching recent requests:', error);
        }
    };

    const loadData = async () => {
        setLoading(true);
        await Promise.all([fetchStats(), fetchRecentRequests()]);
        setLoading(false);
    }
    
    loadData();
  }, []);

  const statCards = [
    { title: 'إجمالي المستخدمين', value: stats.users, icon: Users, color: 'text-purple-400' },
    { title: 'إجمالي الطلبات', value: stats.requests, icon: MessageSquare, color: 'text-blue-400' },
    { title: 'إجمالي المشاريع', value: stats.projects, icon: FolderKanban, color: 'text-green-400' },
    { title: 'إجمالي أقسام الخدمات', value: stats.services, icon: Briefcase, color: 'text-yellow-400' },
  ];

  if (loading) {
    return <div className="text-center text-white">جارِ تحميل البيانات...</div>
  }

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
            <CardTitle>أحدث طلبات الخدمات</CardTitle>
          </CardHeader>
          <CardContent>
            {recentRequests.length > 0 ? (
              <ul className="space-y-4">
                {recentRequests.map(req => (
                  <li key={req.id} className="flex items-center justify-between p-3 bg-[#3C4043] rounded-lg">
                    <div>
                      <p className="font-semibold">{req.service_title || "طلب خدمة عام"}</p>
                      <p className="text-sm text-gray-400">{req.fullName} - {req.email}</p>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(req.created_at).toLocaleDateString('ar-SA')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-center py-4">لا توجد طلبات خدمات حديثة.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;