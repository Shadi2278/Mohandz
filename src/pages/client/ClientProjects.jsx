import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/Auth';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FolderKanban, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ClientProjects = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('client_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setProjects(data);
            } catch (error) {
                toast({
                    title: '❌ فشل تحميل المشاريع',
                    description: error.message,
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [user, toast]);

    const statusColors = {
        'not_started': 'bg-gray-500',
        'in_progress': 'bg-yellow-500',
        'completed': 'bg-green-500',
        'on_hold': 'bg-orange-500',
        'cancelled': 'bg-red-500',
    };

    const statusTranslations = {
        'not_started': 'لم يبدأ',
        'in_progress': 'قيد التنفيذ',
        'completed': 'مكتمل',
        'on_hold': 'معلق',
        'cancelled': 'ملغى',
    };

    if (loading) {
        return <div className="text-center text-white">جارِ تحميل مشاريعك...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="bg-[#282C34] border-gray-700 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">مشاريعي</CardTitle>
                    <CardDescription className="text-gray-400">
                        هنا يمكنك متابعة جميع مشاريعك وحالتها.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {projects.length > 0 ? (
                        <div className="space-y-4">
                            {projects.map(project => (
                                <div key={project.id} className="p-4 rounded-lg bg-[#3C4043] border border-gray-600 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-lg text-white">{project.title}</h3>
                                        <p className="text-sm text-gray-400">{project.description || 'لا يوجد وصف'}</p>
                                    </div>
                                    <Badge className={`${statusColors[project.status] || 'bg-gray-500'} text-white`}>
                                        {statusTranslations[project.status] || project.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <FolderKanban className="mx-auto h-16 w-16 text-gray-500" />
                            <h3 className="mt-4 text-xl font-semibold text-white">لا توجد مشاريع بعد</h3>
                            <p className="mt-2 text-gray-400">يبدو أنك لم تبدأ أي مشروع معنا حتى الآن.</p>
                            <Link to="/services">
                                <Button className="mt-6 brand-gradient text-primary-foreground hover:scale-105 transition-transform">
                                    <PlusCircle className="w-5 h-5 ml-2" />
                                    اطلب خدمتك الأولى
                                </Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ClientProjects;