import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/Auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Send } from 'lucide-react';

const translations = {
    title: { ar: 'طلب خدمة هندسية', en: 'Request Engineering Service' },
    description: { ar: 'املأ النموذج أدناه وسيقوم فريقنا بالتواصل معك في أقرب وقت ممكن.', en: 'Fill out the form below and our team will contact you as soon as possible.' },
    fullName: { ar: 'الاسم الكامل *', en: 'Full Name *' },
    email: { ar: 'البريد الإلكتروني *', en: 'Email *' },
    phone: { ar: 'رقم الهاتف *', en: 'Phone Number *' },
    projectDetails: { ar: 'تفاصيل المشروع *', en: 'Project Details *' },
    submitButton: { ar: 'إرسال الطلب', en: 'Submit Request' },
    submittingButton: { ar: 'جارِ الإرسال...', en: 'Submitting...' },
    successToastTitle: { ar: '✅ تم إرسال طلبك بنجاح', en: '✅ Your request has been sent successfully' },
    successToastDesc: { ar: 'شكراً لاهتمامك، سنتواصل معك قريباً لمناقشة التفاصيل.', en: 'Thank you for your interest, we will contact you soon to discuss the details.' },
    errorToastTitle: { ar: '❌ فشل إرسال الطلب', en: '❌ Failed to send request' },
    errorToastDesc: { ar: 'حدث خطأ ما، يرجى المحاولة مرة أخرى.', en: 'Something went wrong, please try again.' },
};

const ServiceRequestModal = ({ isOpen, setIsOpen, serviceTitle }) => {
    const { toast } = useToast();
    const { user } = useAuth();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', details: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && isOpen) {
            setFormData(prev => ({
                ...prev,
                fullName: user.full_name || '',
                email: user.email || '',
                phone: user.phone || '',
            }));
        }
    }, [user, isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const requestData = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            details: formData.details,
            service_title: serviceTitle,
            user_id: user?.id,
        };

        try {
            const { error } = await supabase.from('service_requests').insert([requestData]);
            if (error) throw error;

            toast({
                title: t(translations.successToastTitle),
                description: t(translations.successToastDesc),
            });
            setIsOpen(false);
            setFormData({ fullName: '', email: '', phone: '', details: '' });
        } catch (error) {
            console.error('Error submitting service request:', error);
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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px] bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-card-foreground">{serviceTitle ? `${t(translations.title)}: ${serviceTitle}` : t(translations.title)}</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        {t(translations.description)}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
                        <label className="block text-card-foreground text-sm font-semibold mb-2">{t(translations.projectDetails)}</label>
                        <Textarea placeholder={t(translations.projectDetails)} rows={4} value={formData.details} onChange={(e) => handleInputChange('details', e.target.value)} required />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300">
                            {loading ? t(translations.submittingButton) : <><Send className="w-4 h-4 ml-2" /> {t(translations.submitButton)}</>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceRequestModal;