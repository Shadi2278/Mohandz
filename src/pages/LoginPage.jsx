import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/Auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const translations = {
    title: { ar: "منصة مهندز - تسجيل الدخول", en: "Mohandz Platform - Login" },
    pageTitle: { ar: "تسجيل الدخول", en: "Login" },
    or: { ar: "أو", en: "or" },
    createAccount: { ar: "أنشئ حساباً جديداً", en: "Create a new account" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    password: { ar: "كلمة المرور", en: "Password" },
    forgotPassword: { ar: "هل نسيت كلمة المرور؟", en: "Forgot password?" },
    loginButton: { ar: "تسجيل الدخول", en: "Login" },
    loadingButton: { ar: "جارِ التحقق...", en: "Verifying..." },
    successToastTitle: { ar: "✅ تسجيل الدخول ناجح", en: "✅ Login successful" },
    successToastDesc: { ar: "مرحباً بعودتك، {fullName}!", en: "Welcome back, {fullName}!" },
    errorToastTitle: { ar: "❌ خطأ في تسجيل الدخول", en: "❌ Login failed" },
    errorToastDesc: { ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة.", en: "Incorrect email or password." },
};

const LoginPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user, login, loading: authLoading } = useAuth();
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            toast({
                title: t(translations.successToastTitle),
                description: t(translations.successToastDesc).replace('{fullName}', user.full_name || 'المستخدم'),
            });
            if (user.role === 'admin') {
                navigate('/admin', { replace: true });
            } else {
                navigate('/client-dashboard', { replace: true });
            }
        }
    }, [user, navigate, t, toast]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await login(email, password);
        
        if (error) {
            toast({
                variant: "destructive",
                title: t(translations.errorToastTitle),
                description: t(translations.errorToastDesc),
            });
        }
    };

    return (
        <>
            <Helmet><title>{t(translations.title)}</title></Helmet>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-pattern">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md w-full space-y-8 bg-[#1F2937]/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-700"
                >
                    <div>
                        <h1 className="text-center text-3xl font-bold text-white">{t(translations.pageTitle)}</h1>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            {t(translations.or)}{' '}
                            <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
                                {t(translations.createAccount)}
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">{t(translations.email)}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></span>
                                    <Input id="email-address" name="email" type="email" autoComplete="email" required className="pl-3 pr-10" placeholder={t(translations.email)} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="password" className="sr-only">{t(translations.password)}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></span>
                                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required className="pl-10 pr-10" placeholder={t(translations.password)} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-white">
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300">{t(translations.forgotPassword)}</Link>
                            </div>
                        </div>
                        <div>
                            <Button type="submit" disabled={authLoading} className="w-full purple-gradient hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                                {authLoading ? t(translations.loadingButton) : <><LogIn className="w-5 h-5 ml-2" /> {t(translations.loginButton)}</>}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default LoginPage;