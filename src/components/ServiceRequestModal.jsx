
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/Auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Send, Upload, Paperclip, X, FileText, Loader2 } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

const translations = {
    title: { ar: 'طلب خدمة هندسية', en: 'Request Engineering Service' },
    serviceName: { ar: 'الخدمة المطلوبة', en: 'Requested Service' },
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
    attachFiles: { ar: 'إرفاق ملفات المشروع (اختياري)', en: 'Attach Project Files (Optional)' },
    uploadAreaText: { ar: 'اسحب وأفلت الملفات هنا، أو انقر للاختيار', en: 'Drag & drop files here, or click to select' },
    uploadingFiles: { ar: 'جارِ رفع الملفات...', en: 'Uploading files...' },
    fileUploadError: { ar: 'فشل رفع بعض الملفات', en: 'Failed to upload some files.' },
    fileTooLarge: { ar: 'حجم الملف كبير جداً (الحد الأقصى 10MB)', en: 'File is too large (Max 10MB)'},
    fileCountLimit: { ar: 'لا يمكن رفع أكثر من 5 ملفات', en: 'Cannot upload more than 5 files' }
};

const ServiceRequestModal = ({ isOpen, setIsOpen, serviceTitle }) => {
    const { toast } = useToast();
    const { user } = useAuth();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', details: '' });
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
             if (user) {
                setFormData(prev => ({
                    ...prev,
                    fullName: user.full_name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                }));
            }
        } else {
            setFormData({ fullName: '', email: '', phone: '', details: '' });
            setFiles([]);
        }
    }, [user, isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const processFiles = (selectedFiles) => {
        if (selectedFiles.length + files.length > 5) {
            toast({ title: t(translations.fileCountLimit), variant: 'destructive' });
            return;
        }
        const newFiles = Array.from(selectedFiles).filter(file => {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                toast({ title: `${file.name}: ${t(translations.fileTooLarge)}`, variant: 'destructive' });
                return false;
            }
            return true;
        });
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleFileChange = (e) => processFiles(e.target.files);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    }, [files]);

    const handleDragOver = useCallback((e) => { e.preventDefault(); e.stopPropagation(); }, []);
    const handleDragEnter = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }, []);
    const handleDragLeave = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }, []);

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let uploadedFileUrls = [];

        try {
            if (files.length > 0) {
                toast({ title: t(translations.uploadingFiles) });
                const uploadPromises = files.map(file => {
                    const filePath = `public/${user?.id || 'guest'}/${Date.now()}_${file.name.replace(/\s/g, '_')}`;
                    return supabase.storage.from('project_files').upload(filePath, file);
                });
                const uploadResults = await Promise.all(uploadPromises);
                
                const failedUploads = uploadResults.filter(result => result.error);
                if (failedUploads.length > 0) {
                    toast({ title: t(translations.fileUploadError), description: failedUploads.map(f => f.error.message).join(', '), variant: 'destructive' });
                }

                const successfulUploads = uploadResults.filter(result => !result.error);
                const getUrlPromises = successfulUploads.map(result => supabase.storage.from('project_files').getPublicUrl(result.data.path));
                const urlResults = await Promise.all(getUrlPromises);
                uploadedFileUrls = urlResults.map(result => result.data.publicUrl);
            }

            const { error } = await supabase.from('service_requests').insert([{
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                details: formData.details,
                service_title: serviceTitle,
                user_id: user?.id,
                file_urls: uploadedFileUrls.length > 0 ? uploadedFileUrls : null,
            }]);
            if (error) throw error;

            toast({ title: t(translations.successToastTitle), description: t(translations.successToastDesc) });
            setIsOpen(false);
        } catch (error) {
            console.error('Error submitting service request:', error);
            toast({ title: t(translations.errorToastTitle), description: error.message || t(translations.errorToastDesc), variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-lg bg-card border-border text-card-foreground">
                <DialogHeader>
                    <DialogTitle>{t(translations.title)}</DialogTitle>
                    <DialogDescription className="text-muted-foreground">{t(translations.description)}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[80vh] overflow-y-auto pr-2">
                    {serviceTitle && (
                        <div>
                            <label className="block text-sm font-semibold mb-2">{t(translations.serviceName)}</label>
                            <div className="w-full p-3 bg-background border border-border rounded-md font-medium">{serviceTitle}</div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">{t(translations.fullName)}</label>
                            <Input type="text" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">{t(translations.phone)}</label>
                            <Input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">{t(translations.email)}</label>
                        <Input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">{t(translations.projectDetails)}</label>
                        <Textarea rows={4} value={formData.details} onChange={(e) => handleInputChange('details', e.target.value)} required />
                    </div>
                     <div>
                        <label className="block text-sm font-semibold mb-2">{t(translations.attachFiles)}</label>
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-primary bg-primary/10' : 'border-border bg-background hover:bg-accent'}`}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                <Upload className={`w-8 h-8 mb-2 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                                <p className={`text-sm transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}>
                                    <span className="font-semibold">{t(translations.uploadAreaText)}</span>
                                </p>
                                <p className="text-xs text-muted-foreground">Max 5 files, 10MB each</p>
                            </div>
                            <Input ref={fileInputRef} type="file" className="hidden" multiple onChange={handleFileChange} accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.dwg,.zip,.rar" />
                        </div>
                        {files.length > 0 && (
                            <div className="mt-4 space-y-2 max-h-32 overflow-y-auto pr-2">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-background border border-border">
                                        <div className="flex items-center space-x-3 space-x-reverse text-sm overflow-hidden">
                                            <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="text-foreground truncate font-medium" title={file.name}>{file.name}</span>
                                                <span className="text-muted-foreground text-xs">{formatBytes(file.size)}</span>
                                            </div>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => removeFile(index)}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 text-lg py-3">
                            {loading ? <><Loader2 className="w-5 h-5 ml-2 animate-spin" /> {t(translations.submittingButton)}</> : <><Send className="w-5 h-5 ml-2" /> {t(translations.submitButton)}</>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceRequestModal;
