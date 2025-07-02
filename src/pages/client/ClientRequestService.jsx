import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const ClientRequestService = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center h-full"
        >
            <Card className="w-full max-w-lg bg-[#282C34] border-gray-700 text-white text-center">
                <CardHeader>
                    <div className="mx-auto bg-purple-500/20 p-3 rounded-full w-fit">
                        <Compass className="h-10 w-10 text-purple-300" />
                    </div>
                    <CardTitle className="mt-4 text-2xl">طلب خدمة جديدة</CardTitle>
                    <CardDescription className="text-gray-400">
                        هل لديك فكرة مشروع؟ نحن هنا لتحويلها إلى واقع.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-300 mb-6">
                        تصفح قائمة خدماتنا المتكاملة واختر ما يناسب احتياجات مشروعك، أو قدم طلباً عاماً وسيقوم فريقنا بالتواصل معك لمناقشة التفاصيل.
                    </p>
                    <Link to="/services">
                        <Button className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-transform text-lg py-3">
                            تصفح الخدمات الآن
                            <ArrowLeft className="w-5 h-5 mr-2" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ClientRequestService;