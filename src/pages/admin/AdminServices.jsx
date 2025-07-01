import React from 'react';
import { useToast } from '@/components/ui/use-toast';
const AdminServices = () => {
  const { toast } = useToast();
  toast({
    title: "🚧 هذه الميزة غير متاحة حالياً",
    description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
  });
  return <div className="text-white">صفحة إدارة الخدمات</div>;
};
export default AdminServices;