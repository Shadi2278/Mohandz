import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus, User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePhone = (phone) => {
    const saudiPhoneRegex = /^(05|5)[0-9]{8}$/;
    return saudiPhoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "❌ كلمة مرور قصيرة",
        description: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
      });
      return;
    }
    if (!validatePhone(phone)) {
      toast({
        variant: "destructive",
        title: "❌ رقم جوال غير صالح",
        description: "الرجاء إدخال رقم جوال سعودي صحيح (مثال: 0512345678).",
      });
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const result = register(fullName, email, phone, password);
      if (result.success) {
        toast({
          title: "✅ تم إنشاء الحساب بنجاح",
          description: `مرحباً بك في منصة مهندز، ${result.user.fullName}!`,
        });
        navigate('/client-dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "❌ خطأ في التسجيل",
          description: result.message,
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>منصة مهندز - إنشاء حساب جديد</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-pattern">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8 bg-[#1F2937]/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-700"
        >
          <div>
            <h1 className="text-center text-3xl font-bold text-white">إنشاء حساب جديد</h1>
            <p className="mt-2 text-center text-sm text-gray-400">
              أو{' '}
              <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
                سجّل الدخول إلى حسابك
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="full-name" className="sr-only">الاسم الكامل</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </span>
                  <Input
                    id="full-name"
                    name="fullName"
                    type="text"
                    required
                    className="pl-3 pr-10"
                    placeholder="الاسم الكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4">
                <label htmlFor="email-address" className="sr-only">البريد الإلكتروني</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </span>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-3 pr-10"
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4">
                <label htmlFor="phone" className="sr-only">رقم الجوال</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </span>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="pl-3 pr-10"
                    placeholder="رقم الجوال"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4">
                <label htmlFor="password" className="sr-only">كلمة المرور</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </span>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className="pl-10 pr-10"
                    placeholder="كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                   <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <PasswordStrengthMeter password={password} />
              </div>
            </div>

            <div>
              <Button type="submit" disabled={loading} className="w-full purple-gradient hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                {loading ? 'جارِ التسجيل...' : (
                  <>
                    <UserPlus className="w-5 h-5 ml-2" />
                    إنشاء حساب
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;