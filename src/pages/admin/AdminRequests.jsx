import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('service_requests')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            toast({ title: 'فشل تحميل الطلبات', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            const { error } = await supabase
                .from('service_requests')
                .update({ status: newStatus })
                .eq('id', requestId);
            if (error) throw error;
            
            setRequests(prev => prev.map(req => req.id === requestId ? { ...req, status: newStatus } : req));
            toast({ title: 'تم تحديث الحالة بنجاح' });
        } catch (error) {
            console.error('Error updating status:', error);
            toast({ title: 'فشل تحديث الحالة', description: error.message, variant: 'destructive' });
        }
    };
    
    const handleDeleteRequest = async (requestId) => {
        if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.')) return;

        try {
            const { error } = await supabase
                .from('service_requests')
                .delete()
                .eq('id', requestId);
            if (error) throw error;
            
            setRequests(prev => prev.filter(req => req.id !== requestId));
            toast({ title: 'تم حذف الطلب بنجاح' });
        } catch (error) {
            console.error('Error deleting request:', error);
            toast({ title: 'فشل حذف الطلب', description: error.message, variant: 'destructive' });
        }
    }

    const statusColors = {
        'new': 'bg-blue-500',
        'in_progress': 'bg-yellow-500',
        'completed': 'bg-green-500',
        'cancelled': 'bg-red-500',
    };

    const statusTranslations = {
        'new': 'جديد',
        'in_progress': 'قيد التنفيذ',
        'completed': 'مكتمل',
        'cancelled': 'ملغى',
    };

    if (loading) return <div className="text-white text-center">جارِ تحميل الطلبات...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold text-white">إدارة طلبات الخدمات</h1>

            <Card className="bg-[#282C34] border-gray-700 text-white">
                <CardHeader>
                    <CardTitle>جميع الطلبات</CardTitle>
                </CardHeader>
                <CardContent>
                    {requests.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-600">
                                    <TableHead className="text-white">الاسم الكامل</TableHead>
                                    <TableHead className="text-white">البريد الإلكتروني</TableHead>
                                    <TableHead className="text-white">الخدمة المطلوبة</TableHead>
                                    <TableHead className="text-white">التاريخ</TableHead>
                                    <TableHead className="text-white">الحالة</TableHead>
                                    <TableHead className="text-white text-center">إجراءات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.map(req => (
                                    <TableRow key={req.id} className="border-gray-700">
                                        <TableCell>{req.fullName}</TableCell>
                                        <TableCell>{req.email}</TableCell>
                                        <TableCell>{req.service_title || 'طلب عام'}</TableCell>
                                        <TableCell>{new Date(req.created_at).toLocaleDateString('ar-SA')}</TableCell>
                                        <TableCell>
                                            <Select value={req.status} onValueChange={(value) => handleStatusChange(req.id, value)}>
                                                <SelectTrigger className={`w-[130px] ${statusColors[req.status]}`}>
                                                    <SelectValue placeholder="تغيير الحالة" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.keys(statusTranslations).map(statusKey => (
                                                        <SelectItem key={statusKey} value={statusKey}>{statusTranslations[statusKey]}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteRequest(req.id)} className="text-red-500 hover:text-red-400">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-center text-gray-400 py-8">لا توجد طلبات حالياً.</p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AdminRequests;