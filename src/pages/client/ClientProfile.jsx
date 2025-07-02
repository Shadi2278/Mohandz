import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/Auth';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { User, Save } from 'lucide-react';

const ClientProfile = () => {
    const { user, fetchUserProfile } = useAuth();
    const { toast } = useToast();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFullName(user.full_name || '');
            setPhone(user.phone || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ full_name: fullName, phone: phone })
                .eq('id', user.id);

            if (error) throw error;

            await fetchUserProfile(user);

            toast({
                title: '✅ تم تحديث الملف الشخصي',
                description: 'تم حفظ معلوماتك الجديدة بنجاح.',
            });
        } catch (error) {
            toast({
                title: '❌ فشل التحديث',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="max-w-2xl mx-auto bg-[#282C34] border-gray-700 text-white">
                <CardHeader>
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center">
                            <User className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">ملفي الشخصي</CardTitle>
                            <CardDescription className="text-gray-400">
                                قم بتحديث معلوماتك الشخصية هنا.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
                            <Input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="bg-[#3C4043] border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">رقم الهاتف</label>
                            <Input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="bg-[#3C4043] border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                            <Input
                                type="email"
                                value={email}
                                disabled
                                className="bg-[#3C4043] border-gray-600 text-white disabled:opacity-70"
                            />
                        </div>
                        <div className="pt-4">
                            <Button type="submit" disabled={loading} className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-transform">
                                {loading ? 'جارِ الحفظ...' : <><Save className="w-4 h-4 ml-2" /> حفظ التغييرات</>}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ClientProfile;