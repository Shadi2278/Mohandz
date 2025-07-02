
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/Auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserPlus, User, Mail, Lock, Phone, Eye, EyeOff, Loader2 } from 'lucide-react';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';

const translations = {
    title: { ar: "منصة مهندز - إنشاء حساب جديد", en: "Mohandz Platform - Create New Account" },
    pageTitle: { ar: "إنشاء حساب جديد", en: "Create New Account" },
    or: { ar: "أو", en: "or" },
    loginToAccount: { ar: "سجّل الدخول إلى حسابك", en: "Login to your account" },
    fullName: { ar: "الاسم الكامل", en: "Full Name" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    phone: { ar: "رقم الجوال", en: "Phone Number" },
    password: { ar: "كلمة المرور", en: "Password" },
    createButton: { ar: "إنشاء حساب", en: "Create Account" },
    loadingButton: { ar: "جارِ التسجيل...", en: "Registering..." },
    validationError: { ar: "الرجاء تعبئة جميع الحقول بشكل صحيح.", en: "Please fill all fields correctly." },
    shortPasswordToast: { title: { ar: "❌ كلمة مرور قصيرة", en: "❌ Short password" }, description: { ar: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.", en: "Password must be at least 8 characters long." } },
    invalidPhoneToast: { title: { ar: "❌ رقم جوال غير صالح", en: "❌ Invalid phone number" }, description: { ar: "الرجاء إدخال رقم جوال سعودي صحيح (مثال: 0512345678).", en: "Please enter a valid Saudi phone number (e.g., 0512345678)." } },
    successToast: { title: { ar: "✅ تم إنشاء الحساب بنجاح", en: "✅ Account created successfully" }, description: { ar: "تم إرسال رابط تحقق إلى بريدك الإلكتروني. الرجاء تأكيد حسابك.", en: "A verification link has been sent to your email. Please confirm your account." } },
    errorToast: { title: { ar: "❌ خطأ في التسجيل", en: "❌ Registration failed" }, description: { ar: "هذا البريد الإلكتروني أو رقم الجوال مسجل مسبقاً.", en: "This email or phone number is already registered." } },
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { register } = useAuth();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'fullName':
                if (!value.trim()) error = 'الاسم الكامل مطلوب.';
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) error = 'البريد الإلكتروني غير صالح.';
                break;
            case 'phone':
                const saudiPhoneRegex = /^(05|5)[0-9]{8}$/;
                if (!saudiPhoneRegex.test(value)) error = 'رقم الجوال السعودي غير صالح.';
                break;
            case 'password':
                if (value.length < 8) error = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.';
                break;
            default:
                break;
        }
        return error;
    };

    useEffect(() => {
        const validationErrors = Object.keys(formData).reduce((acc, key) => {
            const error = validateField(key, formData[key]);
            if (error) acc[key] = error;
            return acc;
        }, {});
        setErrors(validationErrors);
        setIsFormValid(Object.keys(validationErrors).length === 0 && Object.values(formData).every(v => v));
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            toast({ variant: "destructive", title: t(translations.errorToast.title), description: t(translations.validationError) });
            return;
        }

        setLoading(true);
        const { data, error } = await register(formData.fullName, formData.email, formData.phone, formData.password);
        setLoading(false);

        if (data.user) {
            toast({ title: t(translations.successToast.title), description: t(translations.successToast.description) });
            navigate('/login');
        } else if (error) {
            toast({ variant: "destructive", title: t(translations.errorToast.title), description: error.message || t(translations.errorToast.description) });
        }
    };

    return (
        <>
            <Helmet><title>{t(translations.title)}</title></Helmet>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-pattern">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-md w-full space-y-8 bg-card/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-border">
                    <div>
                        <h1 className="text-center text-3xl font-bold text-card-foreground">{t(translations.pageTitle)}</h1>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            {t(translations.or)}{' '}
                            <Link to="/login" className="font-medium text-primary hover:text-primary/80">{t(translations.loginToAccount)}</Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><User className="h-5 w-5 text-muted-foreground" /></span>
                                    <Input id="full-name" name="fullName" type="text" required className="pl-3 pr-10" placeholder={t(translations.fullName)} value={formData.fullName} onChange={handleInputChange} />
                                </div>
                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                            </div>
                            <div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Mail className="h-5 w-5 text-muted-foreground" /></span>
                                    <Input id="email-address" name="email" type="email" autoComplete="email" required className="pl-3 pr-10" placeholder={t(translations.email)} value={formData.email} onChange={handleInputChange} />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Phone className="h-5 w-5 text-muted-foreground" /></span>
                                    <Input id="phone" name="phone" type="tel" required className="pl-3 pr-10" placeholder={t(translations.phone)} value={formData.phone} onChange={handleInputChange} />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Lock className="h-5 w-5 text-muted-foreground" /></span>
                                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required className="pl-10 pr-10" placeholder={t(translations.password)} value={formData.password} onChange={handleInputChange} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground hover:text-foreground">
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <PasswordStrengthMeter password={formData.password} />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                        </div>
                        <div>
                            <Button type="submit" disabled={loading || !isFormValid} className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                                {loading ? <><Loader2 className="w-5 h-5 ml-2 animate-spin" /> {t(translations.loadingButton)}</> : <><UserPlus className="w-5 h-5 ml-2" /> {t(translations.createButton)}</>}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default RegisterPage;
