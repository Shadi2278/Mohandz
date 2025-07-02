import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select(`
                    id,
                    full_name,
                    phone,
                    role,
                    user:users(email, created_at)
                `);

            if (error) throw error;
            const formattedUsers = data.map(profile => ({
                id: profile.id,
                full_name: profile.full_name,
                phone: profile.phone,
                role: profile.role,
                email: profile.user?.email,
                created_at: profile.user?.created_at
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast({ title: 'فشل تحميل المستخدمين', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };
    
    const handleRoleChange = async (userId, newRole) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', userId);

            if (error) throw error;
            
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
            toast({ title: 'تم تحديث الدور بنجاح' });
        } catch (error) {
            console.error('Error updating role:', error);
            toast({ title: 'فشل تحديث الدور', description: error.message, variant: 'destructive' });
        }
    };
    
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('تحذير: سيتم حذف هذا المستخدم نهائياً ولا يمكن التراجع عن هذا الإجراء. هل أنت متأكد؟')) return;

        try {
            const { error } = await supabase.rpc('delete_user_by_id', { user_id_to_delete: userId });

            if (error) throw error;
            
            setUsers(prev => prev.filter(u => u.id !== userId));
            toast({ title: 'تم حذف المستخدم بنجاح' });
        } catch (error) {
            console.error('Error deleting user:', error);
            toast({ title: 'فشل حذف المستخدم', description: error.message, variant: 'destructive' });
        }
    };


    if (loading) return <div className="text-white text-center">جارِ تحميل المستخدمين...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold text-white">إدارة المستخدمين</h1>

            <Card className="bg-[#282C34] border-gray-700 text-white">
                <CardHeader>
                    <CardTitle>جميع المستخدمين</CardTitle>
                </CardHeader>
                <CardContent>
                    {users.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-600">
                                    <TableHead className="text-white">الاسم الكامل</TableHead>
                                    <TableHead className="text-white">البريد الإلكتروني</TableHead>
                                    <TableHead className="text-white">رقم الجوال</TableHead>
                                    <TableHead className="text-white">تاريخ التسجيل</TableHead>
                                    <TableHead className="text-white">الدور</TableHead>
                                    <TableHead className="text-white text-center">إجراءات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id} className="border-gray-700">
                                        <TableCell>{user.full_name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{new Date(user.created_at).toLocaleDateString('ar-SA')}</TableCell>
                                        <TableCell>
                                            <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                                                <SelectTrigger className={`w-[110px] ${user.role === 'admin' ? 'bg-purple-600' : 'bg-gray-600'}`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="client">عميل</SelectItem>
                                                    <SelectItem value="admin">أدمن</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-400">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-center text-gray-400 py-8">لا يوجد مستخدمون حالياً.</p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AdminUsers;