import React from 'react';
import { useToast } from '@/components/ui/use-toast';

const ClientProfile = () => {
    const { toast } = useToast();
    React.useEffect(() => {
        toast({
            title: "🚧 هذه الميزة غير متاحة حالياً",
            description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
        });
    }, [toast]);
    return <div className="text-white"><h1>ملفي الشخصي</h1><p>هنا يمكنك تحديث معلوماتك الشخصية وتفضيلات الإشعارات.</p></div>;
};

export default ClientProfile;