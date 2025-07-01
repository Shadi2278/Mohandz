import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/Auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const translations = {
    title: { ar: 'منصة مهندز - تواصل معنا', en: 'Mohandz Platform - Contact Us' },
    description: { ar: 'تواصل مع فريق منصة مهندز للحصول على استشارة مجانية أو لمناقشة مشروعك القادم. نحن هنا لمساعدتك في تحقيق رؤيتك.', en: 'Contact Mohandz team for a free consultation or to discuss your next project. We are here to help you achieve your vision.' },
    pageTitle: { ar: 'تواصل معنا', en: 'Contact Us' },
    pageSubtitle: { ar: 'نحن هنا لمساعدتك في تحقيق رؤيتك. تواصل معنا للحصول على استشارة مجانية أو لمناقشة مشروعك القادم', en: 'We are here to help you achieve your vision. Contact us for a free consultation or to discuss your next project.' },
    sendMessageTitle: { ar: 'أرسل رسالة', en: 'Send a Message' },
    fullName: { ar: 'الاسم الكامل *', en: 'Full Name *' },
    email: { ar: 'البريد الإلكتروني *', en: 'Email *' },
    phone: { ar: 'رقم الهاتف *', en: 'Phone Number *' },
    serviceType: { ar: 'نوع الخدمة', en: 'Service Type' },
    message: { ar: 'الرسالة *', en: 'Message *' },
    sendButton: { ar: 'إرسال الرسالة', en: 'Send Message' },
    sendingButton: { ar: 'جارِ الإرسال...', en: 'Sending...' },
    selectServicePlaceholder: { ar: 'اختر نوع الخدمة', en: 'Select a service type' },
    successToastTitle: { ar: '✅ تم إرسال رسالتك بنجاح', en: '✅ Your message has been sent successfully' },
    successToastDesc: { ar: 'شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت ممكن.', en: 'Thank you for contacting us, we will get back to you as soon as possible.' },
    errorToastTitle: { ar: '❌ فشل إرسال الرسالة', en: '❌ Failed to send message' },
    errorToastDesc: { ar: 'حدث خطأ ما، يرجى المحاولة مرة أخرى.', en: 'Something went wrong, please try again.' },
    contactInfoTitle: { ar: 'معلومات الاتصال', en: 'Contact Information' },
    locationTitle: { ar: 'موقعنا', en: 'Our Location' },
    serviceTypes: [
        { ar: 'الخدمات المعمارية', en: 'Architectural Services' },
        { ar: 'الطرق والبنية التحتية', en: 'Roads & Infrastructure' },
        { ar: 'المساحة والتخطيط', en: 'Surveying & Planning' },
        { ar: 'الاستشارات الهندسية', en: 'Engineering Consultancy' },
        { ar: 'إدارة المشاريع', en: 'Project Management' },
        { ar: 'أخرى', en: 'Other' }
    ],
    contactInfo: [
        { icon: Phone, title: { ar: 'الهاتف', en: 'Phone' }, value: '+966 50 911 4525', link: 'https://wa.me/966509114525' },
        { icon: Mail, title: { ar: 'البريد الإلكتروني', en: 'Email' }, value: 'admin@mohandz.com', link: 'mailto:admin@mohandz.com' },
        { icon: MapPin, title: { ar: 'العنوان', en: 'Address' }, value: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' }, link: null },
        { icon: Clock, title: { ar: 'ساعات العمل', en: 'Working Hours' }, value: { ar: 'الأحد - الخميس: 8:00 - 17:00', en: 'Sun - Thu: 8:00 AM - 5:00 PM' }, link: null }
    ]
};

const ContactPage = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', serviceType: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.full_name || '',
                email: user.email || '',
                phone: user.phone || '',
            }));
        }
    }, [user]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('contact_messages').insert([{
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              serviceType: formData.serviceType,
              message: formData.message
            }]);
            if (error) throw error;

            toast({
                title: t(translations.successToastTitle),
                description: t(translations.successToastDesc),
            });
            setFormData({ fullName: '', email: '', phone: '', serviceType: '', message: '' });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            toast({
                title: t(translations.errorToastTitle),
                description: t(translations.errorToastDesc),
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{t(translations.title)}</title>
                <meta name="description" content={t(translations.description)} />
            </Helmet>
            <div className="min-h-screen py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">{t(translations.pageTitle)}</h1>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">{t(translations.pageSubtitle)}</p>
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
                            <h2 className="text-3xl font-bold text-card-foreground mb-8">{t(translations.sendMessageTitle)}</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-card-foreground text-sm font-semibold mb-2">{t(translations.fullName)}</label>
                                    <Input type="text" placeholder={t(translations.fullName)} value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-card-foreground text-sm font-semibold mb-2">{t(translations.email)}</label>
                                    <Input type="email" placeholder={t(translations.email)} value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-card-foreground text-sm font-semibold mb-2">{t(translations.phone)}</label>
                                    <Input type="tel" placeholder={t(translations.phone)} value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-card-foreground text-sm font-semibold mb-2">{t(translations.serviceType)}</label>
                                    <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                                        <SelectTrigger><SelectValue placeholder={t(translations.selectServicePlaceholder)} /></SelectTrigger>
                                        <SelectContent>
                                            {translations.serviceTypes.map((service, index) => <SelectItem key={index} value={t(service)}>{t(service)}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-card-foreground text-sm font-semibold mb-2">{t(translations.message)}</label>
                                    <Textarea placeholder={t(translations.message)} rows={5} value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} required />
                                </div>
                                <Button type="submit" disabled={loading} className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                                    {loading ? t(translations.sendingButton) : <><Send className="w-5 h-5 ml-2" /> {t(translations.sendButton)}</>}
                                </Button>
                            </form>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
                            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
                                <h2 className="text-3xl font-bold text-card-foreground mb-8">{t(translations.contactInfoTitle)}</h2>
                                <div className="space-y-6">
                                    {translations.contactInfo.map((info, index) => (
                                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex items-start space-x-4 space-x-reverse">
                                            <div className="w-12 h-12 brand-gradient rounded-lg flex items-center justify-center flex-shrink-0"><info.icon className="w-6 h-6 text-primary-foreground" /></div>
                                            <div>
                                                <h3 className="text-card-foreground font-semibold mb-1">{t(info.title)}</h3>
                                                {info.link ? <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" style={{ direction: info.title.en === 'Phone' ? 'ltr' : 'rtl', display: 'block', textAlign: 'right' }}>{typeof info.value === 'object' ? t(info.value) : info.value}</a> : <p className="text-muted-foreground">{typeof info.value === 'object' ? t(info.value) : info.value}</p>}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
                                <h3 className="text-2xl font-bold text-card-foreground mb-6">{t(translations.locationTitle)}</h3>
                                <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center overflow-hidden">
                                    <img className="w-full h-full object-cover rounded-2xl" alt="خريطة موقع منصة مهندز في الرياض" src="https://images.unsplash.com/photo-1469288205312-804b99a8d717" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;