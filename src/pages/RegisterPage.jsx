import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/Auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserPlus, User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
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
    shortPasswordToast: { title: { ar: "❌ كلمة مرور قصيرة", en: "❌ Short password" }, description: { ar: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.", en: "Password must be at least 8 characters long." } },
    invalidPhoneToast: { title: { ar: "❌ رقم جوال غير صالح", en: "❌ Invalid phone number" }, description: { ar: "الرجاء إدخال رقم جوال سعودي صحيح (مثال: 0512345678).", en: "Please enter a valid Saudi phone number (e.g., 0512345678)." } },
    successToast: { title: { ar: "✅ تم إنشاء الحساب بنجاح", en: "✅ Account created successfully" }, description: { ar: "مرحباً بك في منصة مهندز، {fullName}!", en: "Welcome to Mohandz Platform, {fullName}!" } },
    errorToast: { title: { ar: "❌ خطأ في التسجيل", en: "❌ Registration failed" }, description: { ar: "هذا البريد الإلكتروني أو رقم الجوال مسجل مسبقاً.", en: "This email or phone number is already registered." } },
};


const RegisterPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { register, loading: authLoading } = useAuth();
    const { t } = useLanguage();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validatePhone = (phone) => {
        const saudiPhoneRegex = /^(05|5)[0-9]{8}$/;
        return saudiPhoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            toast({ variant: "destructive", title: t(translations.shortPasswordToast.title), description: t(translations.shortPasswordToast.description) });
            return;
        }
        if (!validatePhone(phone)) {
            toast({ variant: "destructive", title: t(translations.invalidPhoneToast.title), description: t(translations.invalidPhoneToast.description) });
            return;
        }

        const { data, error } = await register(fullName, email, phone, password);

        if (data.user) {
            toast({ title: t(translations.successToast.title), description: t(translations.successToast.description).replace('{fullName}', fullName) });
            navigate('/client-dashboard');
        } else if (error) {
            toast({ variant: "destructive", title: t(translations.errorToast.title), description: error.message || t(translations.errorToast.description) });
        }
    };

    return (
        <>
            <Helmet><title>{t(translations.title)}</title></Helmet>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-pattern">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-md w-full space-y-8 bg-[#1F2937]/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-700">
                    <div>
                        <h1 className="text-center text-3xl font-bold text-white">{t(translations.pageTitle)}</h1>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            {t(translations.or)}{' '}
                            <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">{t(translations.loginToAccount)}</Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="full-name" className="sr-only">{t(translations.fullName)}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><User className="h-5 w-5 text-gray-400" /></span>
                                    <Input id="full-name" name="fullName" type="text" required className="pl-3 pr-10" placeholder={t(translations.fullName)} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </div>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="email-address" className="sr-only">{t(translations.email)}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></span>
                                    <Input id="email-address" name="email" type="email" autoComplete="email" required className="pl-3 pr-10" placeholder={t(translations.email)} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="phone" className="sr-only">{t(translations.phone)}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></span>
                                    <Input id="phone" name="phone" type="tel" required className="pl-3 pr-10" placeholder={t(translations.phone)} value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="password" className="sr-only">{t(translations.password)}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></span>
                                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required className="pl-10 pr-10" placeholder={t(translations.password)} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-white">
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <PasswordStrengthMeter password={password} />
                            </div>
                        </div>
                        <div>
                            <Button type="submit" disabled={authLoading} className="w-full purple-gradient hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                                {authLoading ? t(translations.loadingButton) : <><UserPlus className="w-5 h-5 ml-2" /> {t(translations.createButton)}</>}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default RegisterPage;