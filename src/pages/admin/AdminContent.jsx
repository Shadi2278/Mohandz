import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';

const AdminContent = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-lg bg-[#282C34] border-gray-700 text-white text-center">
        <CardHeader>
          <div className="mx-auto bg-purple-500/20 p-3 rounded-full w-fit">
            <Palette className="h-10 w-10 text-purple-300" />
          </div>
          <CardTitle className="mt-4 text-2xl">إدارة المحتوى</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            هذه الصفحة قيد التطوير حالياً.
            <br />
            سيتم هنا تمكينك من إدارة محتوى الصفحات الرئيسية مثل "من نحن" و "الخدمات".
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContent;