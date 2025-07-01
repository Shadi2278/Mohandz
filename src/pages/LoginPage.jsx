import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user = login(email, password);
      if (user) {
        toast({
          title: "✅ تسجيل الدخول ناجح",
          description: `مرحباً بعودتك، ${user.fullName}!`,
        });
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/client-dashboard');
        }
      } else {
        toast({
          variant: "destructive",
          title: "❌ خطأ في تسجيل الدخول",
          description: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>منصة مهندز - تسجيل الدخول</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-pattern">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8 bg-[#1F2937]/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-700"
        >
          <div>
            <h1 className="text-center text-3xl font-bold text-white">تسجيل الدخول</h1>
            <p className="mt-2 text-center text-sm text-gray-400">
              أو{' '}
              <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
                أنشئ حساباً جديداً
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
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
                <label htmlFor="password" className="sr-only">كلمة المرور</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </span>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
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
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300">
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" disabled={loading} className="w-full purple-gradient hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                {loading ? 'جارِ التحقق...' : (
                  <>
                    <LogIn className="w-5 h-5 ml-2" />
                    تسجيل الدخول
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

export default LoginPage;