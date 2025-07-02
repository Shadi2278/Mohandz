import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const AdminProjects = () => {
    const { toast } = useToast();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    client:profiles(full_name)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast({
                title: "فشل تحميل المشاريع",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) return <div className="text-white text-center">جارِ تحميل المشاريع...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold text-white">إدارة المشاريع</h1>

            <Card className="bg-[#282C34] border-gray-700 text-white">
                <CardHeader>
                    <CardTitle>جميع المشاريع</CardTitle>
                </CardHeader>
                <CardContent>
                    {projects.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-600 hover:bg-gray-700/20">
                                    <TableHead className="text-white">عنوان المشروع</TableHead>
                                    <TableHead className="text-white">العميل</TableHead>
                                    <TableHead className="text-white">تاريخ الإنشاء</TableHead>
                                    <TableHead className="text-white">الحالة</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.map(project => (
                                    <TableRow key={project.id} className="border-gray-700 hover:bg-gray-700/20">
                                        <TableCell className="font-medium">{project.title}</TableCell>
                                        <TableCell>{project.client?.full_name || 'غير محدد'}</TableCell>
                                        <TableCell>{new Date(project.created_at).toLocaleDateString('ar-SA')}</TableCell>
                                        <TableCell>
                                            <Badge className={`${statusColors[project.status] || 'bg-gray-500'} text-white`}>
                                                {statusTranslations[project.status] || project.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-center text-gray-400 py-8">
                            لا توجد مشاريع لعرضها حالياً.
                        </p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AdminProjects;