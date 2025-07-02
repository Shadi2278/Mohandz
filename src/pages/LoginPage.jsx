
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/Auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

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
    validationError: { ar: "الرجاء إدخال بريد إلكتروني وكلمة مرور صالحين.", en: "Please enter a valid email and password."}
};

const LoginPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user, login } = useAuth();
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

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

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsFormValid(emailRegex.test(email) && password.length >= 8);
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            toast({
                variant: "destructive",
                title: t(translations.errorToastTitle),
                description: t(translations.validationError),
            });
            return;
        }

        setLoading(true);
        const { error } = await login(email, password);
        setLoading(false);
        
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
                    className="max-w-md w-full space-y-8 bg-card/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-border"
                >
                    <div>
                        <h1 className="text-center text-3xl font-bold text-card-foreground">{t(translations.pageTitle)}</h1>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            {t(translations.or)}{' '}
                            <Link to="/register" className="font-medium text-primary hover:text-primary/80">
                                {t(translations.createAccount)}
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">{t(translations.email)}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Mail className="h-5 w-5 text-muted-foreground" /></span>
                                    <Input id="email-address" name="email" type="email" autoComplete="email" required className="pl-3 pr-10" placeholder={t(translations.email)} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="pt-4">
                                <label htmlFor="password" className="sr-only">{t(translations.password)}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Lock className="h-5 w-5 text-muted-foreground" /></span>
                                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required className="pl-10 pr-10" placeholder={t(translations.password)} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground hover:text-foreground">
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-primary hover:text-primary/80">{t(translations.forgotPassword)}</Link>
                            </div>
                        </div>
                        <div>
                            <Button type="submit" disabled={loading || !isFormValid} className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                                {loading ? <><Loader2 className="w-5 h-5 ml-2 animate-spin" /> {t(translations.loadingButton)}</> : <><LogIn className="w-5 h-5 ml-2" /> {t(translations.loginButton)}</>}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default LoginPage;
