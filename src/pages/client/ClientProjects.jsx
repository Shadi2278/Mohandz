import React from 'react';
import { useToast } from '@/components/ui/use-toast';

const ClientProjects = () => {
    const { toast } = useToast();
    React.useEffect(() => {
        toast({
            title: "🚧 هذه الميزة غير متاحة حالياً",
            description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
        });
    }, [toast]);
    return <div className="text-white"><h1>مشاريعي</h1><p>هنا ستجد قائمة بجميع مشاريعك وحالتها.</p></div>;
};

export default ClientProjects;