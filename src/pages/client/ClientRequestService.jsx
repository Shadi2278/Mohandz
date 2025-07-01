import React from 'react';
import { useToast } from '@/components/ui/use-toast';

const ClientRequestService = () => {
    const { toast } = useToast();
    React.useEffect(() => {
        toast({
            title: "🚧 هذه الميزة غير متاحة حالياً",
            description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
        });
    }, [toast]);
    return <div className="text-white"><h1>طلب خدمة جديد</h1><p>هنا يمكنك طلب خدمة جديدة بسهولة.</p></div>;
};

export default ClientRequestService;