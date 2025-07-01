import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Mail, KeyRound } from 'lucide-react';

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: "🚧 هذه الميزة غير متاحة حالياً",
        description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>منصة مهندز - استعادة كلمة المرور</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-pattern">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8 bg-[#282C34]/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-700"
        >
          <div>
            <h1 className="text-center text-3xl font-bold text-white">استعادة كلمة المرور</h1>
            <p className="mt-2 text-center text-sm text-gray-400">
              أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
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
            </div>

            <div>
              <Button type="submit" disabled={loading} className="w-full purple-gradient hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                {loading ? 'جارِ الإرسال...' : (
                  <>
                    <KeyRound className="w-5 h-5 ml-2" />
                    إرسال رابط الاستعادة
                  </>
                )}
              </Button>
            </div>
          </form>
          <div className="text-sm text-center">
            <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
              العودة إلى صفحة تسجيل الدخول
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;